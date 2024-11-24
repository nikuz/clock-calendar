#ifndef Clock_h
#define Clock_h

#include <Arduino.h>
#include <Adafruit_NeoPixel.h>

class Clock
{
public:
    Clock();

    ~Clock();

    static void init();

    static void showHours();
};

#endif /* Clock_h */