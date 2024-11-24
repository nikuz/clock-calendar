#ifndef Calendar_h
#define Calendar_h

#include <Arduino.h>

struct CalendarEvent
{
    struct tm startTime;
    struct tm endTime;
    String status;
    String summary;
};

class Calendar {
public:
    Calendar();

    ~Calendar();

    static void init();

    static void retrieveEvents();

    static void showEvents();

    static void showLoading();

private:

    static bool isTimeInsideEvent(const struct tm time);

    static bool eventIsApproaching();

};

#endif /* Calendar_h */