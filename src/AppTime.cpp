#include <Arduino.h>

#include "def.h"
#include "AppTime.h"

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
    if(!getLocalTime(&timeinfo)){
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
    if(!getLocalTime(&timeinfo)){
        Serial.println("Failed to obtain time");
        return;
    }
    Serial.print(timeinfo.tm_hour);
    Serial.print(":");
    Serial.print(timeinfo.tm_min);
    Serial.print(":");
    Serial.println(timeinfo.tm_sec);
}