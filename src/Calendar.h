#ifndef Calendar_h
#define Calendar_h

#include <Arduino.h>

struct CalendarEvent {
    struct tm startTime;
    struct tm endTime;
    String status;
    String summary;
    int startLedIndex;
    int endLedIndex;
    uint32_t color;

    bool operator==(const CalendarEvent& other) const {
        time_t rawStartTime = mktime((struct tm*)&startTime);
        time_t rawEndTime = mktime((struct tm*)&endTime);
        time_t rawOtherStartTime = mktime((struct tm*)&other.startTime);
        time_t rawOtherEndTime = mktime((struct tm*)&other.endTime);

        return rawStartTime == rawOtherStartTime && rawEndTime == rawOtherEndTime;
    }
};

struct NextCalendarEvent {
    int startLedIndex;
};

class Calendar {
   public:
    Calendar();

    ~Calendar();

    static void init(uint16_t brightness);

    static void retrieveEvents();

    static void showEvents(uint16_t brightness);

    static void checkIfEventIsApproaching();

   private:
    static uint32_t getEventColor(int eventIndex, int currentSecond, float brightness);

    static void showLoading();

    static void clearLoading();

    static float getCalendarBrightness(uint16_t brightness);
};

#endif /* Calendar_h */