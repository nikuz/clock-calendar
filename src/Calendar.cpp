#include "Calendar.h"

#include <Adafruit_NeoPixel.h>
#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <WiFiMulti.h>

#include <vector>

#include "AppWiFi.h"
#include "CalendarDef.h"
#include "Clock.h"
#include "Utils.h"
#include "Brightness.h"
#include "def.h"

Adafruit_NeoPixel calendarLeds = Adafruit_NeoPixel(LED_STRIP_LENGTH, CALENDAR_LED_PIN, NEO_GRB + NEO_KHZ800);
const uint32_t calendarEventColor = Adafruit_NeoPixel::Color(128, 0, 128);
uint16_t currentCalendarBrightness = 0;

// events
std::vector<CalendarEvent> todaysEvents;
bool eventsRetrieved = false;
bool eventsRendered = false;
const unsigned long eventsRetrievalInterval = 60UL * 1000UL;  // every minute
unsigned long lastEventsRetrievalTime = millis() - eventsRetrievalInterval - 1UL;
int approachingEventIndex = -1;
bool approachingEventBlinkCycleHigh = false;
unsigned long approachingEventBlinkCycleChangeTime = millis();
unsigned long approachingEventBlinkInterval = 1000UL;
int lastEventIsApproachingCheckTime = -1;

// loading
const int loadingLength = 10;
int loadingCurrentPosition = 0;
const unsigned long loadingUpdateInterval = 30UL;
unsigned long lastLoadingUpdateTime = millis() - loadingUpdateInterval - 1UL;
const uint32_t loadingColor = Adafruit_NeoPixel::Color(128, 128, 0);

const int calendarEventColorsAmount = 20;
uint32_t calendarEventColors[calendarEventColorsAmount] = {
    calendarLeds.Color(0, 255, 255),    // Cyan
    calendarLeds.Color(255, 0, 255),    // Magenta
    calendarLeds.Color(255, 165, 0),    // Orange
    calendarLeds.Color(128, 0, 0),      // Maroon
    calendarLeds.Color(135, 206, 235),  // Sky Blue
    calendarLeds.Color(139, 69, 19),    // Brown
    calendarLeds.Color(50, 205, 50),    // Lime
    calendarLeds.Color(255, 215, 0),    // Gold
    calendarLeds.Color(64, 224, 208),   // Turquoise
    calendarLeds.Color(255, 192, 203),  // Pink
    calendarLeds.Color(220, 20, 60),    // Crimson
    calendarLeds.Color(230, 230, 250),  // Lavender
    calendarLeds.Color(128, 128, 0),    // Olive
    calendarLeds.Color(255, 0, 0),      // Red
    calendarLeds.Color(0, 255, 0),      // Green
    calendarLeds.Color(0, 0, 255),      // Blue
    calendarLeds.Color(255, 255, 0),    // Yellow
    calendarLeds.Color(128, 0, 128),    // Purple
    calendarLeds.Color(0, 128, 128),    // Teal
    calendarLeds.Color(0, 0, 128),      // Navy
};

Calendar::Calendar() {}

Calendar::~Calendar() {}

void Calendar::init(uint16_t brightness) {
    currentCalendarBrightness = brightness;

    calendarLeds.begin();

    Utils::clearLeds(&calendarLeds, LED_STRIP_LENGTH);
}

void Calendar::showEvents(uint16_t brightness) {
    struct tm timeinfo;
    if (!eventsRetrieved || !getLocalTime(&timeinfo)) {
        showLoading();
        return;
    }

    bool noBrightnessChanged = (brightness == MIN_BRIGHTNESS && currentCalendarBrightness == brightness) ||
                               (brightness > MIN_BRIGHTNESS && abs(brightness - currentCalendarBrightness) < CHANGE_BRIGHTNESS_THRESHOLD);
    bool noEventApproaching = approachingEventIndex == -1;
    bool eventApproachingBlinkDelay = approachingEventIndex != -1 && millis() - approachingEventBlinkCycleChangeTime < approachingEventBlinkInterval;
    bool noEventApproachingBlinkStale = approachingEventIndex == -1 && !approachingEventBlinkCycleHigh;

    if (eventApproachingBlinkDelay || (eventsRendered && noBrightnessChanged && noEventApproaching && noEventApproachingBlinkStale)) {
        return;
    }

    eventsRendered = true;
    currentCalendarBrightness = brightness;
    float currentBrightness = getCalendarBrightness(brightness);

    if (approachingEventIndex != -1) {
        approachingEventBlinkCycleChangeTime = millis();
    } else if (approachingEventBlinkCycleHigh) {
        approachingEventBlinkCycleHigh = false;
    }

    bool isNight = Brightness::isNight(brightness);
    int eventIndex = 0;
    CalendarEvent event;
    uint32_t eventColor;

    if (eventIndex < todaysEvents.size()) {
        event = todaysEvents[eventIndex];
        eventColor = getEventColor(eventIndex, timeinfo.tm_sec, currentBrightness);
    }

    for (int i = 0; i < LED_STRIP_LENGTH; i++) {
        if (isNight) {
            calendarLeds.setPixelColor(i, OFF_COLOR);
        } else {
            if (i >= event.startLedIndex && i < event.endLedIndex) {
                calendarLeds.setPixelColor(i, eventColor);
            } else {
                calendarLeds.setPixelColor(i, OFF_COLOR);
            }

            if (i == event.endLedIndex - 1) {
                eventIndex++;
                if (eventIndex < todaysEvents.size()) {
                    event = todaysEvents[eventIndex];
                    eventColor = getEventColor(eventIndex, timeinfo.tm_sec, currentBrightness);
                }
            }
        }
    }

    calendarLeds.show();
}

uint32_t Calendar::getEventColor(int eventIndex, int currentSecond, float brightness) {
    CalendarEvent event = todaysEvents[eventIndex];
    uint32_t color = event.color;

    if (approachingEventIndex == eventIndex && currentSecond < 59) {
        approachingEventBlinkCycleHigh = !approachingEventBlinkCycleHigh;
        return Utils::rgbToRgba(color, approachingEventBlinkCycleHigh ? 1 : min(brightness, 0.5F));
    }

    return Utils::rgbToRgba(color, brightness);
}

void Calendar::checkIfEventIsApproaching() {
    struct tm timeinfo;
    if (!eventsRetrieved || !getLocalTime(&timeinfo) || timeinfo.tm_min == lastEventIsApproachingCheckTime || todaysEvents.size() == 0) {
        return;
    }

    lastEventIsApproachingCheckTime = timeinfo.tm_min;

    time_t rawTime = mktime((struct tm *)&timeinfo);

    for (int i = 0, l = todaysEvents.size(); i < l; i++) {
        CalendarEvent event = todaysEvents[i];
        time_t startRawTime = mktime((struct tm *)&event.startTime);
        if (startRawTime > rawTime && startRawTime - rawTime <= 60L) {
            approachingEventIndex = i;
            return;
        }
    }

    if (approachingEventIndex != -1) {
        approachingEventIndex = -1;
    }
}

void Calendar::showLoading() {
    if (millis() - lastLoadingUpdateTime < loadingUpdateInterval) {
        return;
    }

    lastLoadingUpdateTime = millis();
    uint32_t color = Utils::rgbToRgba(loadingColor, 0.3F);

    for (int i = 0; i < LED_STRIP_LENGTH; i++) {
        if (i >= loadingCurrentPosition - loadingLength && i < loadingCurrentPosition) {
            calendarLeds.setPixelColor(i, color);
        } else {
            calendarLeds.setPixelColor(i, OFF_COLOR);
        }
    }

    calendarLeds.show();

    loadingCurrentPosition++;

    if (loadingCurrentPosition - loadingLength > LED_STRIP_LENGTH) {
        loadingCurrentPosition = 0;
    }
}

void Calendar::clearLoading() {
    if (loadingCurrentPosition != 0) {
        loadingCurrentPosition = 0;
        Utils::clearLeds(&calendarLeds, LED_STRIP_LENGTH);
    }
}

float Calendar::getCalendarBrightness(uint16_t brightness) { return max(brightness / 100.0F / 5.0F, 0.01F); }

bool eventsSortComparator(CalendarEvent a, CalendarEvent b) {
    time_t timeA = mktime(&a.startTime);
    time_t timeB = mktime(&b.startTime);

    return timeA < timeB;
}

void Calendar::retrieveEvents() {
    if (!AppWiFi::isConnected()) {
        showLoading();
        return;
    }

    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }

    if (millis() - lastEventsRetrievalTime < eventsRetrievalInterval) {
        return;
    }

    lastEventsRetrievalTime = millis();

    WiFiClientSecure *client = new WiFiClientSecure;
    if (client) {
        client->setCACert(CALENDAR_ROOT_CERT);

        {
            // Add a scoping block for HTTPClient https to make sure it is destroyed before WiFiClientSecure *client is
            HTTPClient https;

            Serial.print("[HTTPS] begin...\n");
            if (https.begin(*client, CALENDAR_URL)) {  // HTTPS
                Serial.print("[HTTPS] GET...\n");
                // start connection and send HTTP header
                int httpCode = https.GET();

                // httpCode will be negative on error
                if (httpCode > 0) {
                    // HTTP header has been send and Server response header has been handled
                    Serial.printf("[HTTPS] GET... code: %d\n", httpCode);

                    // file found at server
                    if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
                        String payload = https.getString();
                        std::vector<CalendarEvent> events;
                        
                        int pos = 0;
                        int colorIndex = 0;

                        while ((pos = payload.indexOf("BEGIN:VEVENT", pos)) != -1) {
                            int veventEnd = payload.indexOf("END:VEVENT", pos);
                            if (veventEnd == -1) {  // Malformed payload
                                break;
                            }

                            String vevent = payload.substring(pos, veventEnd);
                            pos = veventEnd + 10;  // Move past "END:VEVENT"

                            // Extract fields
                            int startIdx = vevent.indexOf("DTSTART:");
                            int endIdx = vevent.indexOf("DTEND:");
                            int statusIdx = vevent.indexOf("STATUS:");
                            int summaryIdx = vevent.indexOf("SUMMARY:");

                            if (startIdx == -1 || endIdx == -1 || statusIdx == -1 || summaryIdx == -1) {
                                continue;
                            }

                            String dtStart = vevent.substring(startIdx + 8, vevent.indexOf("\n", startIdx));
                            dtStart.trim();
                            struct tm startTime = Utils::convertToLocalTime(Utils::parseDateTime(dtStart));

                            // Check if the event is for today
                            if (startTime.tm_year == timeinfo.tm_year && startTime.tm_mon == timeinfo.tm_mon &&
                                startTime.tm_mday == timeinfo.tm_mday) {
                                uint32_t color = calendarEventColors[colorIndex];
                                String summary = vevent.substring(summaryIdx + 8, vevent.indexOf("\n", summaryIdx));
                                summary.trim();
                                summary.toLowerCase();

                                if (summary == "busy") {
                                    color = Adafruit_NeoPixel::Color(128, 128, 128);
                                } else {
                                    colorIndex++;
                                    if (colorIndex == calendarEventColorsAmount - 1) {
                                        colorIndex = 0;
                                    }
                                }

                                int startLedIndex = startTime.tm_hour * LEDS_PER_HOUR + startTime.tm_min / 10;

                                String dtEnd = vevent.substring(endIdx + 6, vevent.indexOf("\n", endIdx));
                                dtEnd.trim();
                                struct tm endTime = Utils::convertToLocalTime(Utils::parseDateTime(dtEnd));
                                int endLedIndex = endTime.tm_hour * LEDS_PER_HOUR + endTime.tm_min / 10;

                                String status = vevent.substring(statusIdx + 7, vevent.indexOf("\n", statusIdx));
                                status.trim();

                                CalendarEvent newEvent = {startTime, endTime, status, summary, startLedIndex, endLedIndex, color};

                                if (std::find(events.begin(), events.end(), newEvent) == events.end()) {
                                    events.push_back(newEvent);
                                }
                            }
                        }

                        sort(events.begin(), events.end(), eventsSortComparator);

                        clearLoading();

                        todaysEvents = events;
                        eventsRetrieved = true;
                        eventsRendered = false;
                    }
                } else {
                    Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
                }

                https.end();
            } else {
                Serial.printf("[HTTPS] Unable to connect\n");
            }

            // End extra scoping block
        }

        delete client;
    } else {
        Serial.println("Unable to create client");
    }
}