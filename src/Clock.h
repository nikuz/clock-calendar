#ifndef Clock_h
#define Clock_h

#include <Adafruit_NeoPixel.h>
#include <Arduino.h>

class Clock {
   public:
    Clock();

    ~Clock();

    static void init(uint16_t brightness);

    static void showHours(uint16_t brightness);

    static void showMinutes(uint16_t brightness);

    static float getHoursBrightness(uint16_t brightness);
   private:
    static void reset();


    static float getMinutesBrightness(uint16_t brightness);
};

#endif /* Clock_h */