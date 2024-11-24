#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

#include "def.h"
#include "Clock.h"
#include "AppTime.h"
#include "Utils.h"

Adafruit_NeoPixel clockLeds = Adafruit_NeoPixel(CLOCK_LED_AMOUNT, CLOCK_LED_PIN, NEO_GRB + NEO_KHZ800);
const int hoursMapping[24][2] = {
    {0, -1},
    {1, -1},
    {2, -1},
    {3, -1},
    {4, -1},
    {5, -1},
    {6, -1},
    {7, -1},
    {8, -1},
    {9, -1},
    {10, 11},
    {12, 13},
    {14, 15},
    {16, -1},
    {17, -1},
    {18, -1},
    {19, -1},
    {20, -1},
    {21, -1},
    {22, -1},
    {23, -1},
    {24, -1},
    {25, 26},
    {27, 28}}
;
const uint32_t hourColor = Adafruit_NeoPixel::Color(255, 255, 0);
int currentHour = -1;

Clock::Clock() {}

Clock::~Clock() {}

void Clock::init()
{
    clockLeds.begin();
    clockLeds.setBrightness(50);

    Utils::clearLeds(&clockLeds, CLOCK_LED_AMOUNT);
}

void Clock::showHours()
{
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo))
    {
        Serial.println("Failed to obtain time");
        return;
    }

    if (currentHour != -1 && currentHour == timeinfo.tm_hour)
    {
        return;
    }

    currentHour = timeinfo.tm_hour;

    Utils::resetLeds(&clockLeds, CLOCK_LED_AMOUNT);

    const int *leds = hoursMapping[currentHour];
    clockLeds.setPixelColor(leds[0], hourColor);

    if (leds[1] > 0) {
        clockLeds.setPixelColor(leds[1], hourColor);
    }

    clockLeds.setBrightness(CLOCK_LED_MAX_BRIGHTNESS);
    clockLeds.show();
}