---
title: "MQTT and IoT Protocols"
title_ko: "MQTT와 IoT 프로토콜"
track: "track-06-esp32"
unit_number: 5
description: "Publish sensor readings to an MQTT broker and subscribe to command topics for remote control."
description_ko: "MQTT 브로커에 센서 데이터를 발행하고 명령 토픽을 구독하여 원격 제어."
duration: "2 hours"
objectives:
  - "Connect to a local Mosquitto or public HiveMQ broker"
  - "Publish sensor data to a topic on a fixed schedule"
  - "Subscribe to a command topic and act on received messages"
order: 5
---

## What is MQTT?

MQTT (Message Queuing Telemetry Transport) is a lightweight publish–subscribe protocol
designed for constrained IoT devices. A **broker** (server) routes messages between clients.
Clients **publish** messages to **topics** (like channels) and **subscribe** to receive them.

```
ESP32 (publisher) ──→ Broker ──→ Dashboard (subscriber)
                              ←── Mobile app (publisher)
```

Topics are hierarchical strings: `pailab/sensor/temperature`, `pailab/control/led`.

## Setting Up a Broker

**Local (Mosquitto on PC):**
```bash
# Install: https://mosquitto.org
mosquitto -v           # start broker on port 1883
mosquitto_sub -t "#"   # subscribe to ALL topics (debug)
mosquitto_pub -t "test" -m "hello"
```

**Cloud (HiveMQ public):**  
Host: `broker.hivemq.com`, Port: `1883`, no credentials needed (public, unencrypted).

## Installing PubSubClient

In the Arduino IDE Library Manager, install **PubSubClient** by Nick O'Leary.

## Publishing Sensor Data

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* SSID     = "YourSSID";
const char* PASSWORD = "YourPass";
const char* BROKER   = "broker.hivemq.com"; // or your local IP
const int   PORT     = 1883;
const char* CLIENT_ID = "esp32-pailab-001"; // must be unique per device

WiFiClient   wifi;
PubSubClient mqtt(wifi);

void reconnect() {
  while (!mqtt.connected()) {
    Serial.print("Connecting to MQTT...");
    if (mqtt.connect(CLIENT_ID)) {
      Serial.println("connected");
      mqtt.subscribe("pailab/control/led"); // subscribe after connect
    } else {
      Serial.print("failed, rc="); Serial.print(mqtt.state());
      delay(2000);
    }
  }
}

void onMessage(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) msg += (char)payload[i];
  Serial.printf("Topic: %s  Message: %s\n", topic, msg.c_str());

  if (String(topic) == "pailab/control/led") {
    digitalWrite(13, msg == "1" ? HIGH : LOW);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(13, OUTPUT);
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.setServer(BROKER, PORT);
  mqtt.setCallback(onMessage);
}

unsigned long lastPublish = 0;

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop(); // process incoming messages

  if (millis() - lastPublish > 5000) {
    lastPublish = millis();
    float temp = 25.4; // replace with DHT reading
    char payload[16];
    snprintf(payload, sizeof(payload), "%.1f", temp);
    mqtt.publish("pailab/sensor/temperature", payload);
    Serial.printf("Published: %s\n", payload);
  }
}
```

## Monitoring in Node-RED (optional)

1. Install Node-RED: `npm install -g node-red`
2. Add MQTT-in node → Chart node → Wire → Deploy
3. Set broker to match your Mosquitto host, topic to `pailab/sensor/#`

## QoS Levels

| QoS | Guarantee | Use when… |
|-----|-----------|-----------|
| 0 | Fire-and-forget (fastest) | High-frequency telemetry |
| 1 | At-least-once delivery | Commands |
| 2 | Exactly-once (slowest) | Critical events |

```cpp
mqtt.publish("pailab/sensor/temp", payload, false, 1); // QoS 1
```

## Exercises

1. Publish temperature AND humidity as separate topics every 10 seconds
2. Subscribe to `pailab/control/brightness` (value 0–255) and set LED PWM accordingly
3. Implement a "last will" message: if the device disconnects, publish "offline" to `pailab/status`
