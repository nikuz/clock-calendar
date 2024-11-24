#include <Arduino.h>

#include "def.h"
#include "AppWiFi.h"
#include "AppTime.h"
#include "Calendar.h"
#include "Clock.h"

TaskHandle_t loadCalendarEventsTask;

void loadCalendarEventsTaskLoop(void *pvParameters)
{
    for (;;)
    {
        Calendar::retrieveEvents();
        // Serial.println(uxTaskGetStackHighWaterMark(loadCalendarEventsTask)); // check task memory usage
        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(SERIAL_BAUD);

    xTaskCreatePinnedToCore(
        loadCalendarEventsTaskLoop, /* Task function. */
        "LoadCalendarEventsTask",   /* name of task. */
        10000,                      /* Stack size of task */
        NULL,                       /* parameter of the task */
        1,                          /* priority of the task */
        &loadCalendarEventsTask,    /* Task handle to keep track of created task */
        0
    );                         /* pin task to core 0 */

    Clock::init();
    Calendar::init();
    Calendar::showLoading();
}

void loop() {
    if (!AppWiFi::isConnected()) {
        AppWiFi::connect();
        AppTime::config();
    }

    Clock::showHours();
    Calendar::showEvents(); // minutes are rendered inside the events
}