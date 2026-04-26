---
title: "Final Project: IoT Environmental Dashboard"
title_ko: "최종 프로젝트: IoT 환경 대시보드"
track: "track-06-esp32"
unit_number: 8
description: "Build a battery-powered sensor node that streams temperature and humidity to an MQTT broker and displays live data on a web dashboard."
description_ko: "배터리 구동 센서 노드가 MQTT 브로커에 온습도를 스트리밍하고 웹 대시보드에 라이브 데이터 표시."
duration: "3 hours"
objectives:
  - "Integrate Wi-Fi, MQTT, DHT22, and deep sleep into a single firmware"
  - "Display live sensor data on a Node-RED or Grafana dashboard"
  - "Estimate and demonstrate extended battery life using sleep cycles"
order: 8
---

## Project Overview

Bring together Units 3 (Wi-Fi), 5 (MQTT), 6 (DHT22), and 7 (Deep Sleep) into a complete
battery-powered environmental monitoring node.

The node:
1. Wakes from deep sleep every **N minutes**
2. Connects to Wi-Fi and MQTT broker
3. Reads temperature + humidity from DHT22
4. Publishes to `pailab/env/temperature` and `pailab/env/humidity`
5. Returns to deep sleep

A Node-RED (or similar) dashboard subscribes to these topics and plots historical graphs.

## Bill of Materials

| Component | Qty | Notes |
|-----------|-----|-------|
| ESP32 DevKit v1 | 1 | |
| DHT22 sensor | 1 | 3.3V version |
| 10kΩ pull-up resistor | 1 | For DHT data line |
| Li-Po 3.7V 1000 mAh | 1 | |
| TP4056 charger module | 1 | With protection circuit (2-port variant) |
| OLED 128×64 (optional) | 1 | Show last reading before sleeping |
| Breadboard or custom PCB | 1 | |

## Firmware

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// — Configuration ——————————————————————————————————————
const char* SSID       = "YourSSID";
const char* PASSWORD   = "YourPass";
const char* BROKER     = "broker.hivemq.com";
const char* CLIENT_ID  = "esp32-env-01";
const long  SLEEP_SEC  = 300; // 5 minutes

#define DHT_PIN 4
// ———————————————————————————————————————————————————————

DHT dht(DHT_PIN, DHT22);
WiFiClient   wifiClient;
PubSubClient mqtt(wifiClient);

RTC_DATA_ATTR int wakeCount = 0;

bool connectWiFi() {
  WiFi.begin(SSID, PASSWORD);
  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 20) {
    delay(500); tries++;
  }
  return WiFi.status() == WL_CONNECTED;
}

bool connectMQTT() {
  mqtt.setServer(BROKER, 1883);
  return mqtt.connect(CLIENT_ID);
}

void publish(const char* topic, float value) {
  char buf[16];
  snprintf(buf, sizeof(buf), "%.1f", value);
  mqtt.publish(topic, buf);
}

void setup() {
  Serial.begin(115200);
  wakeCount++;
  dht.begin();
  delay(2000); // DHT22 stabilise

  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (!isnan(t) && connectWiFi() && connectMQTT()) {
    publish("pailab/env/temperature", t);
    publish("pailab/env/humidity",    h);
    publish("pailab/env/wakes",       wakeCount);
    mqtt.loop();
    Serial.printf("Published T:%.1f H:%.0f wake:%d\n", t, h, wakeCount);
  } else {
    Serial.println("Sensor read or connection failed");
  }

  WiFi.disconnect(true);
  esp_sleep_enable_timer_wakeup((uint64_t)SLEEP_SEC * 1000000ULL);
  esp_deep_sleep_start();
}

void loop() {}
```

## Dashboard with Node-RED

1. Install Node-RED: `npm install -g --unsafe-perm node-red`
2. Run: `node-red`
3. Open `http://localhost:1880`
4. Add: **mqtt in** → **chart** (node-red-dashboard) for each topic
5. Deploy and open `http://localhost:1880/ui`

Or use **Grafana + InfluxDB** for a production-grade dashboard with persistence.

## Battery Life Analysis

With `SLEEP_SEC = 300` (5 min), the duty cycle:

| Phase | Duration | Current |
|-------|----------|---------|
| DHT stabilise | 2 s | 50 mA |
| Wi-Fi connect | 3 s | 200 mA |
| MQTT publish | 0.5 s | 200 mA |
| Deep sleep | ~294.5 s | 0.05 mA |
| **Average** | 300 s | **~9.3 mA** |

**Estimated battery life (1000 mAh):** ~107 hours ≈ **4.5 days**

Increase sleep interval to 30 min → ~2.4 mA average → **~17 days**.

## Deliverables

1. Working node publishing readings every 5 minutes (or chosen interval)
2. Dashboard screenshot showing at least 1 hour of data
3. Sketch (.ino) with comments
4. Battery life estimate with your actual sleep interval
