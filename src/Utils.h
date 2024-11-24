#ifndef Utils_h
#define Utils_h

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

class Utils
{
public:
    Utils();

    ~Utils();

    static void clearLeds(Adafruit_NeoPixel *leds, int amount);

    static void resetLeds(Adafruit_NeoPixel *leds, int amount);

    static uint32_t rgbToRgba(uint32_t color, float brightness);

    static struct tm parseDateTime(const String &dateTime);

    static struct tm convertToLocalTime(const struct tm &utcTime);
};

#endif /* Utils_h */