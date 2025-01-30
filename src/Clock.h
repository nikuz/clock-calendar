#ifndef Clock_h
#define Clock_h

#include <Adafruit_NeoPixel.h>
#include <Arduino.h>

class Clock {
   public:
    Clock();

    ~Clock();

    static void init(uint16_t brightness);

    static void showTime(uint16_t brightness);

    static float getHoursBrightness(uint16_t brightness);
   private:
    static void showHours();

    static void showMinutes();

    static float getMinutesBrightness(uint16_t brightness);
};

#endif /* Clock_h */