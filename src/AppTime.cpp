#include "AppTime.h"

#include <Arduino.h>

#include "def.h"

AppTime::AppTime() {}

AppTime::~AppTime() {}

void AppTime::config() {
    configTime(0, 0, NTP_SERVER);
    setenv("TZ", TIMEZONE, 1);
    tzset();

    struct tm timeinfo;
    getLocalTime(&timeinfo);
}

bool AppTime::hasLocalTime() {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        return false;
    }
    return true;
}

void AppTime::obtainTime() {
    struct tm timeinfo;
    getLocalTime(&timeinfo);
}

void AppTime::printLocalTime() {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.print(timeinfo.tm_hour);
    Serial.print(":");
    Serial.print(timeinfo.tm_min);
    Serial.print(":");
    Serial.println(timeinfo.tm_sec);
}

// Manually set time: YYYY, MM, DD, HH, MM, SS
// Example: AppTime::debugSetLocalTime(2025, 1, 29, 12, 30, 45); -> January 29, 2025, 12:30:45
void AppTime::debugSetLocalTime(int year, int month, int day, int hour, int minute, int second) {
    setenv("TZ", TIMEZONE, 1);
    tzset();

    struct tm timeinfo;
    timeinfo.tm_year = year - 1900;  // Years since 1900
    timeinfo.tm_mon = month - 1;     // Months since January (0-11)
    timeinfo.tm_mday = day;
    timeinfo.tm_hour = hour;
    timeinfo.tm_min = minute;
    timeinfo.tm_sec = second;
    timeinfo.tm_isdst = -1;  // Auto-detect Daylight Saving Time

    // Convert struct to time_t and set system time
    time_t t = mktime(&timeinfo);
    struct timeval now = {.tv_sec = t};
    settimeofday(&now, NULL);
}