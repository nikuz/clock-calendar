#include "Brightness.h"

#include <Arduino.h>

#include "def.h"

const int numReadings = 10;

int readings[numReadings];  // the readings from the analog input
int readIndex = 0;          // the index of the current reading
int total = 0;              // the running total
int average = 0;            // the average

Brightness::Brightness() {}

Brightness::~Brightness() {}

void Brightness::init() {
    pinMode(LIGHT_SENSOR_PIN, INPUT);
    // initialize all the readings to 0:
    for (int thisReading = 0; thisReading < numReadings; thisReading++) {
        readings[thisReading] = 0;
    }
}

uint16_t Brightness::get() {
    total = total - readings[readIndex];
    readings[readIndex] = analogRead(LIGHT_SENSOR_PIN);
    total = total + readings[readIndex];
    readIndex = readIndex + 1;

    if (readIndex >= numReadings) {
        readIndex = 0;
    }

    average = total / numReadings;
    return map(average, 0, 4095, MIN_BRIGHTNESS, MAX_BRIGHTNESS);
}

bool Brightness::isNight(uint16_t brightness) { return brightness < 5; }