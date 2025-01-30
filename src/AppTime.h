#ifndef AppTime_h
#define AppTime_h

#include <Arduino.h>

class AppTime {
   public:
    AppTime();

    ~AppTime();

    static void config();

    static bool hasLocalTime();

    static void obtainTime();

    static void printLocalTime();

    static void debugSetLocalTime(int year, int month, int day, int hour, int minute, int second);
};

#endif /* AppTime_h */