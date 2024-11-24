#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <Adafruit_NeoPixel.h>
#include <vector>

#include "def.h"
#include "AppWiFi.h"
#include "Calendar.h"
#include "Clock.h"
#include "CalendarDef.h"
#include "Utils.h"

Adafruit_NeoPixel calendarLeds = Adafruit_NeoPixel(CALENDAR_LED_AMOUNT, CALENDAR_LED_PIN, NEO_GRB + NEO_KHZ800);
std::vector<CalendarEvent> todaysEvents;
bool eventsRetrieved = false;
const unsigned long eventsRetrievalInterval = 60UL * 1000UL; // every minute
unsigned long lastEventsRetrievalTime = millis() - eventsRetrievalInterval - 1UL;
const int ledsPerHour = 6;
const uint32_t hourBorderColor = Utils::rgbToRgba(Adafruit_NeoPixel::Color(255, 255, 255), 0.2);
const uint32_t minuteColor = Adafruit_NeoPixel::Color(0, 255, 0);
// const uint32_t minuteColor = Utils::rgbToRgba(Adafruit_NeoPixel::Color(255, 0, 0), 0.5);
const uint32_t minuteInEventColor = Adafruit_NeoPixel::Color(255, 0, 0);
uint32_t nextNotificationColor = minuteInEventColor;
const uint32_t calendarEventColor = Adafruit_NeoPixel::Color(128, 0, 128);
const uint32_t calendarPastEventColor = Utils::rgbToRgba(calendarEventColor, 0.2);
int currentMinute = -1;

//
const unsigned long renderEventsInterval = 1000UL; // every second
unsigned long lastRenderEventsTime = millis() - renderEventsInterval - 1UL;

// loading
const int loadingLength = 10;
int loadingCurrentPosition = loadingLength;
const unsigned long loadingUpdateInterval = 30UL; // every 30 ms
unsigned long lastLoadingUpdateTime = millis() - loadingUpdateInterval - 1UL;
const uint32_t loadingColor = Adafruit_NeoPixel::Color(59, 66, 247);

Calendar::Calendar() {}

Calendar::~Calendar() {}

void Calendar::init()
{
    calendarLeds.begin();
    calendarLeds.setBrightness(CALENDAR_LED_MAX_BRIGHTNESS);

    Utils::clearLeds(&calendarLeds, CALENDAR_LED_AMOUNT);
}

void Calendar::showEvents()
{
    if (!eventsRetrieved) {
        Calendar::showLoading();
        return;
    }

    if (millis() - lastRenderEventsTime < renderEventsInterval)
    {
        return;
    }

    lastRenderEventsTime = millis();

    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        Utils::clearLeds(&calendarLeds, CALENDAR_LED_AMOUNT);
        return;
    }

    Utils::resetLeds(&calendarLeds, CALENDAR_LED_AMOUNT);

    int currentHour = timeinfo.tm_hour;
    int currentMinute = timeinfo.tm_min;
    int currentMinuteLedIndex = currentHour * ledsPerHour + currentMinute / 10;

    for (const auto &event : todaysEvents)
    {
        struct tm startTime = event.startTime;
        int startLedIndex = startTime.tm_hour * ledsPerHour + startTime.tm_min / 10;
        
        struct tm endTime = event.endTime;
        int endLedIndex = endTime.tm_hour * ledsPerHour + endTime.tm_min / 10;
        
        for (int i = startLedIndex; i < endLedIndex; i++)
        {
            calendarLeds.setPixelColor(i, i < currentMinuteLedIndex ? calendarPastEventColor : calendarEventColor);
        }
    }

    for (int i = 0; i < ledsPerHour; i++)
    {
        int ledIndex = currentHour * ledsPerHour + i;
        struct tm ledTime = {timeinfo};
        ledTime.tm_hour = currentHour;
        ledTime.tm_min = i * 10;

        if (Calendar::isTimeInsideEvent(ledTime))
        {
            continue;
        }

        calendarLeds.setPixelColor(ledIndex, hourBorderColor);
    }

    bool eventIsApproaching = Calendar::eventIsApproaching();
    // bool eventIsApproaching = true;
    uint32_t currentMinuteColor = minuteColor;

    if (Calendar::isTimeInsideEvent(timeinfo))
    {
        currentMinuteColor = minuteInEventColor;
    }
    else if (eventIsApproaching) {
        currentMinuteColor = nextNotificationColor;
        nextNotificationColor = nextNotificationColor == minuteInEventColor ? minuteColor : minuteInEventColor;
    }

    calendarLeds.setPixelColor(currentMinuteLedIndex, currentMinuteColor);

    calendarLeds.show();
}

void Calendar::retrieveEvents()
{
    if (!AppWiFi::isConnected()) {
        Calendar::showLoading();
        return;
    }

    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return;
    }

    if (millis() - lastEventsRetrievalTime < eventsRetrievalInterval)
    {
        return;
    }

    lastEventsRetrievalTime = millis();

    WiFiClientSecure *client = new WiFiClientSecure;
    if (client)
    {
        client->setCACert(CALENDAR_ROOT_CERT);

        {
            // Add a scoping block for HTTPClient https to make sure it is destroyed before WiFiClientSecure *client is
            HTTPClient https;

            Serial.print("[HTTPS] begin...\n");
            if (https.begin(*client, CALENDAR_URL))
            { // HTTPS
                Serial.print("[HTTPS] GET...\n");
                // start connection and send HTTP header
                int httpCode = https.GET();

                // httpCode will be negative on error
                if (httpCode > 0)
                {
                    // HTTP header has been send and Server response header has been handled
                    Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

                    // file found at server
                    if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY)
                    {
                        String payload = https.getString();
                        std::vector<CalendarEvent> events;
                        char today[9]; // YYYYMMDD + null terminator
                        sprintf(today, "%04d%02d%02d", timeinfo.tm_year + 1900, timeinfo.tm_mon + 1, timeinfo.tm_mday);

                        int pos = 0;
                        while ((pos = payload.indexOf("BEGIN:VEVENT", pos)) != -1)
                        {
                            int veventEnd = payload.indexOf("END:VEVENT", pos);
                            if (veventEnd == -1)
                                break; // Malformed payload

                            String vevent = payload.substring(pos, veventEnd);
                            pos = veventEnd + 10; // Move past "END:VEVENT"

                            // Extract fields
                            int startIdx = vevent.indexOf("DTSTART:");
                            int endIdx = vevent.indexOf("DTEND:");
                            int statusIdx = vevent.indexOf("STATUS:");
                            int summaryIdx = vevent.indexOf("SUMMARY:");

                            if (startIdx == -1 || endIdx == -1 || statusIdx == -1 || summaryIdx == -1)
                                continue;

                            String dtstart = vevent.substring(startIdx + 8, vevent.indexOf("\n", startIdx));
                            dtstart.trim();
                            struct tm startTime = Utils::convertToLocalTime(Utils::parseDateTime(dtstart));

                            String dtend = vevent.substring(endIdx + 6, vevent.indexOf("\n", endIdx));
                            dtend.trim();
                            struct tm endTime = Utils::convertToLocalTime(Utils::parseDateTime(dtend));

                            String status = vevent.substring(statusIdx + 7, vevent.indexOf("\n", statusIdx));
                            status.trim();

                            String summary = vevent.substring(summaryIdx + 8, vevent.indexOf("\n", summaryIdx));
                            summary.trim();

                            // Check if the event is for today
                            if (dtstart.startsWith(today))
                            {
                                events.push_back({startTime, endTime, status, summary});
                            }
                        }

                        todaysEvents = events;
                        eventsRetrieved = true;
                    }
                }
                else
                {
                    Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
                }

                https.end();
            }
            else
            {
                Serial.printf("[HTTPS] Unable to connect\n");
            }

            // End extra scoping block
        }

        delete client;
    }
    else
    {
        Serial.println("Unable to create client");
    }
}

bool Calendar::isTimeInsideEvent(const struct tm time) {
    time_t rawTime = mktime((struct tm *)&time);
    
    for (const auto &event : todaysEvents)
    {
        time_t startRawTime = mktime((struct tm *)&event.startTime);
        time_t endRawTime = mktime((struct tm *)&event.endTime);
        if (startRawTime <= rawTime && endRawTime >= rawTime)
        {
            return true;
        }
    }

    return false;
}

bool Calendar::eventIsApproaching()
{
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return false;
    }

    time_t rawTime = mktime((struct tm *)&timeinfo);

    for (const auto &event : todaysEvents)
    {
        time_t startRawTime = mktime((struct tm *)&event.startTime);
        if (startRawTime > rawTime && startRawTime - rawTime <= 60L)
        {
            return true;
        }
    }

    return false;
}

void Calendar::showLoading() {
    if (millis() - lastLoadingUpdateTime < loadingUpdateInterval)
    {
        return;
    }

    lastLoadingUpdateTime = millis();

    Utils::resetLeds(&calendarLeds, CALENDAR_LED_AMOUNT);

    for (int i = loadingCurrentPosition - loadingLength; i < loadingCurrentPosition; i++)
    {
        if (i < 0) {
            continue;
        }
        calendarLeds.setPixelColor(i, loadingColor);
    }

    calendarLeds.show();

    loadingCurrentPosition++;

    if (loadingCurrentPosition - loadingLength > CALENDAR_LED_AMOUNT) {
        loadingCurrentPosition = 0;
    }
}