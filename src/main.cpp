#include <Arduino.h>

#include "AppTime.h"
#include "AppWiFi.h"
#include "Brightness.h"
#include "Calendar.h"
#include "Clock.h"
#include "def.h"

TaskHandle_t secondCoreLoopTask;

void secondCoreLoop(void *pvParameters) {
    for (;;) {
        Calendar::retrieveEvents();
        // Serial.println(uxTaskGetStackHighWaterMark(loadCalendarEventsTask)); //
        // check task memory usage
        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

void setup() {
    Serial.begin(SERIAL_BAUD);

    xTaskCreatePinnedToCore(secondCoreLoop,      /* Task function. */
                            "secondCoreLoop",    /* name of task. */
                            10000,               /* Stack size of task */
                            NULL,                /* parameter of the task */
                            1,                   /* priority of the task */
                            &secondCoreLoopTask, /* Task handle to keep track of created task */
                            0);                  /* pin task to core 0 */

    Brightness::init();
    uint16_t brightness = Brightness::get();

    Clock::init(brightness);
    Calendar::init(brightness);
}

void loop() {
    if (!AppWiFi::isConnected()) {
        AppWiFi::connect();
        AppTime::config();
        // AppTime::debugSetLocalTime(2025, 1, 29, 9, 29, 45);
    }

    uint16_t brightness = Brightness::get();

    Clock::showTime(brightness);
    
    Calendar::checkIfEventIsApproaching();
    Calendar::showEvents(brightness);

    delay(1);
}