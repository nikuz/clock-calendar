#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#include "def.h"
#include "WiFiClient.h"
#include "AppWiFi.h"
#include "AppWiFiDef.h"

AppWiFi::AppWiFi() {}

AppWiFi::~AppWiFi() {}

WiFiMulti wifiMulti;

void AppWiFi::connect() {
    Serial.printf("Connecting to %s ", WIFI_SSID);

    WiFi.mode(WIFI_STA);
    wifiMulti.addAP(WIFI_SSID, WIFI_PASSWORD);

    wifiMulti.run();

    Serial.println("WiFi Connected");
}

bool AppWiFi::isConnected() {
    return WiFi.status() == WL_CONNECTED;
}

void AppWiFi::disconnect() {
    WiFi.disconnect(true);
    WiFi.mode(WIFI_OFF);
    Serial.println("WiFi Disconnected");
}
