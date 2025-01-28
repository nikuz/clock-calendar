#include "Clock.h"

#include <Adafruit_NeoPixel.h>
#include <Arduino.h>

#include "AppTime.h"
#include "Utils.h"
#include "Brightness.h"
#include "def.h"

const int hoursStripsAmount = 4;
Adafruit_NeoPixel hoursLeds[hoursStripsAmount] = {
    Adafruit_NeoPixel(LED_STRIP_LENGTH, HOURS_LED_PIN_1, NEO_GRB + NEO_KHZ800),
    Adafruit_NeoPixel(LED_STRIP_LENGTH, HOURS_LED_PIN_2, NEO_GRB + NEO_KHZ800),
    Adafruit_NeoPixel(LED_STRIP_LENGTH, HOURS_LED_PIN_3, NEO_GRB + NEO_KHZ800),
    Adafruit_NeoPixel(LED_STRIP_LENGTH, HOURS_LED_PIN_4, NEO_GRB + NEO_KHZ800),
};
Adafruit_NeoPixel minutesLeds = Adafruit_NeoPixel(LED_STRIP_LENGTH, MINUTES_LED_PIN, NEO_GRB + NEO_KHZ800);
const uint32_t hourColor = Adafruit_NeoPixel::Color(246, 231, 210);
const uint32_t nightHourColor = Adafruit_NeoPixel::Color(255, 0, 0);
const uint32_t hourBorderColor = Adafruit_NeoPixel::Color(255, 255, 255);
const uint32_t nightHourBorderColor = Adafruit_NeoPixel::Color(255, 0, 0);
const uint32_t currentMinuteColor = Adafruit_NeoPixel::Color(0, 255, 0);
const uint32_t nightCurrentMinuteColor = Adafruit_NeoPixel::Color(255, 255, 0);
int currentHour = -1;
uint16_t currentHourRawBrightness = 0;
float currentHourBrightness = 0;
int currentMinute = -1;
uint16_t currentMinuteRawBrightness = 0;
float currentMinuteBrightness = 0;

const bool hoursMapping[24][hoursStripsAmount][LEDS_PER_HOUR] = {
    // 0
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 1
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
    },
    // 2
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 3
    {
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 1, 1, 0, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 4
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 0, 0, 1, 1, 0},
    },
    // 5
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 6
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 7
    {
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 1, 1, 1, 0, 0},
        {0, 1, 1, 1, 0, 0},
    },
    // 8
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 9
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 0, 0},
    },
    // 10
    {
        {0, 1, 1, 0, 0, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
    },
    // 11
    {
        {0, 1, 1, 0, 0, 0},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
    },
    // 12
    {
        {0, 1, 1, 0, 0, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
    },
    // 13
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
    },
    // 14
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 15
    {
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 1, 1, 0, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 16
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 0, 0, 1, 1, 0},
    },
    // 17
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 18
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 19
    {
        {0, 1, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 1, 1, 1, 0, 0},
        {0, 1, 1, 1, 0, 0},
    },
    // 20
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
    },
    // 21
    {
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 1, 0},
        {0, 1, 1, 1, 0, 0},
    },
    // 22
    {
        {0, 1, 1, 0, 0, 0},
        {0, 0, 1, 1, 1, 0},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
    },
    // 23
    {
        {0, 1, 1, 0, 0, 0},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
        {0, 0, 1, 1, 1, 1},
    },
};

Clock::Clock() {}

Clock::~Clock() {}

void Clock::init(uint16_t brightness) {
    currentHourRawBrightness = brightness;
    currentHourBrightness = getHoursBrightness(brightness);

    currentMinuteRawBrightness = brightness;
    currentMinuteBrightness = getMinutesBrightness(brightness);

    for (int i = 0; i < hoursStripsAmount; i++) {
        hoursLeds[i].begin();
        Utils::clearLeds(&hoursLeds[i], LED_STRIP_LENGTH);
    }

    minutesLeds.begin();
    Utils::clearLeds(&minutesLeds, LED_STRIP_LENGTH);
}

void Clock::reset() {
    for (int i = 0; i < hoursStripsAmount; i++) {
        Utils::clearLeds(&hoursLeds[i], LED_STRIP_LENGTH);
    }

    Utils::clearLeds(&minutesLeds, LED_STRIP_LENGTH);
}

void Clock::showHours(uint16_t brightness) {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }

    if (currentHour != -1 && currentHour == timeinfo.tm_hour && abs(brightness - currentHourRawBrightness) < CHANGE_BRIGHTNESS_THRESHOLD) {
        return;
    }

    currentHour = timeinfo.tm_hour;
    currentHourRawBrightness = brightness;
    currentHourBrightness = getHoursBrightness(brightness);
    bool isNight = Brightness::isNight(brightness);
    uint32_t nightColor = Utils::rgbToRgba(nightHourColor, currentHourBrightness);
    uint32_t regularColor = Utils::rgbToRgba(hourColor, currentHourBrightness);
    
    for (int i = 0; i < hoursStripsAmount; i++) {
        for (int j = 0; j < LED_STRIP_LENGTH; j++) {
            if (j >= currentHour * LEDS_PER_HOUR && j < currentHour * LEDS_PER_HOUR + LEDS_PER_HOUR) {
                if (hoursMapping[currentHour][i][j % LEDS_PER_HOUR] == 1) {
                    if (isNight) {
                        hoursLeds[i].setPixelColor(j, nightColor);
                    } else {
                        hoursLeds[i].setPixelColor(j, regularColor);
                    }
                } else {
                    hoursLeds[i].setPixelColor(j, OFF_COLOR);
                }
            } else {
                hoursLeds[i].setPixelColor(j, OFF_COLOR);
            }
        }
        hoursLeds[i].show();
    }
}

void Clock::showMinutes(uint16_t brightness) {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }

    if (currentMinute != -1 && currentMinute == timeinfo.tm_min && abs(brightness - currentMinuteRawBrightness) < CHANGE_BRIGHTNESS_THRESHOLD) {
        return;
    }

    currentMinute = timeinfo.tm_min;
    currentMinuteRawBrightness = brightness;
    currentMinuteBrightness = getMinutesBrightness(brightness);
    bool isNight = Brightness::isNight(brightness);
    uint32_t nightBorderColor = Utils::rgbToRgba(nightHourBorderColor, currentMinuteBrightness);
    uint32_t regularBorderColor = Utils::rgbToRgba(hourBorderColor, currentMinuteBrightness);

    for (int i = 0; i < LED_STRIP_LENGTH; i++) {
        if (i >= currentHour * LEDS_PER_HOUR && i < currentHour * LEDS_PER_HOUR + LEDS_PER_HOUR) {
            if (isNight) {
                minutesLeds.setPixelColor(i, nightBorderColor);
            } else {
                minutesLeds.setPixelColor(i, regularBorderColor);
            }
        } else {
            minutesLeds.setPixelColor(i, OFF_COLOR);
        }
    }

    uint32_t minuteColor = currentMinuteColor;
    if (isNight) {
        minuteColor = nightCurrentMinuteColor;
    }
    minutesLeds.setPixelColor(currentHour * LEDS_PER_HOUR + currentMinute / 10, Utils::rgbToRgba(minuteColor, currentMinuteBrightness));

    minutesLeds.show();
}

float Clock::getHoursBrightness(uint16_t brightness) { return max(brightness / 100.0F / 2.0F, 0.02F); }

float Clock::getMinutesBrightness(uint16_t brightness) { return max(brightness / 100.0F / 5.0F, 0.02F); }