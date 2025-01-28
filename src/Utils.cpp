#include "Utils.h"

#include <Adafruit_NeoPixel.h>
#include <Arduino.h>

Utils::Utils() {}

Utils::~Utils() {}

void Utils::clearLeds(Adafruit_NeoPixel *leds, int amount) {
    for (int i = 0; i < amount; i++) {
        leds->setPixelColor(i, Adafruit_NeoPixel::Color(0, 0, 0));
    }
    leds->show();
}

void Utils::resetLeds(Adafruit_NeoPixel *leds, int amount) {
    for (int i = 0, l = amount; i < l; i++) {
        leds->setPixelColor(i, Adafruit_NeoPixel::Color(0, 0, 0));
    }
}

uint32_t Utils::rgbToRgba(uint32_t color, float brightness) {
    uint8_t r = (uint8_t)((color >> 16) & 0xFF);  // Extract red
    uint8_t g = (uint8_t)((color >> 8) & 0xFF);   // Extract green
    uint8_t b = (uint8_t)(color & 0xFF);          // Extract blue

    r = (uint8_t)(r * brightness);  // Scale red
    g = (uint8_t)(g * brightness);  // Scale green
    b = (uint8_t)(b * brightness);  // Scale blue

    return Adafruit_NeoPixel::Color(r, g, b);
}

struct tm Utils::parseDateTime(const String &dateTime) {
    struct tm timeinfo = {0};  // Initialize all fields to zero

    if (dateTime.length() == 16 && dateTime[8] == 'T' && dateTime[15] == 'Z') {
        timeinfo.tm_year = dateTime.substring(0, 4).toInt() - 1900;  // Years since 1900
        timeinfo.tm_mon = dateTime.substring(4, 6).toInt() - 1;      // 0-based month
        timeinfo.tm_mday = dateTime.substring(6, 8).toInt();         // Day of the month
        timeinfo.tm_hour = dateTime.substring(9, 11).toInt();        // Hours
        timeinfo.tm_min = dateTime.substring(11, 13).toInt();        // Minutes
        timeinfo.tm_sec = dateTime.substring(13, 15).toInt();        // Seconds
        timeinfo.tm_isdst = -1;                                      // Let the system determine DST
    }

    return timeinfo;
}

struct tm Utils::convertToLocalTime(const struct tm &dateTime) {
    time_t rawTime = mktime((struct tm *)&dateTime);  // Convert to time_t (UTC)

    // Get the current time
    time_t now = time(NULL);

    // Get local time
    struct tm *localTime = localtime(&now);

    // Get UTC time
    struct tm *utcTime = gmtime(&now);

    // Calculate the offset in hours
    int offset = difftime(mktime(localTime), now) / 3600;

    rawTime -= offset * 3600;

    struct tm timeinfo;
    localtime_r(&rawTime, &timeinfo);

    return timeinfo;
}