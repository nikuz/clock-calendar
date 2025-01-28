#ifndef Brightness_h
#define Brightness_h

#include <Arduino.h>

class Brightness {
   public:
    Brightness();

    ~Brightness();

    static void init();

    static uint16_t get();

    static bool isNight(uint16_t brightness);
};

#endif /* Brightness_h */