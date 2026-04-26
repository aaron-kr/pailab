---
title: "ESP32 at PAI Lab"
title_ko: "PAI Lab의 ESP32"
description: "How the ESP32 is used for IoT, edge AI, and wireless sensing at the Physical AI Laboratory."
description_ko: "PAI Lab에서 ESP32를 IoT, 엣지 AI, 무선 센싱에 활용하는 방법."
eyebrow: "RESOURCES · ESP32"
parent_page: "arduino-overview"
show_in_nav: false
nav_label: "ESP32"
order: 2
---

## ESP32 at PAI Lab

The ESP32 is the lab's primary platform for connected physical AI projects — anything that needs
Wi-Fi, Bluetooth, or more computational power than a classic Arduino can provide.

## Why ESP32?

- **Wireless built-in** — Wi-Fi 802.11 b/g/n and Bluetooth 4.2/BLE 5 on-chip
- **Dual-core 240 MHz** — run sensor collection on one core, networking on the other
- **Deep sleep** — 10 µA sleep current extends battery-powered deployments to weeks
- **Arduino-compatible** — familiar API, same IDE, large library ecosystem
- **Edge AI ready** — enough RAM and CPU for TFLite micro models

## Related Curriculum

- **[ESP32: IoT and Wireless Physical AI](/curriculum/track-06-esp32)** — 8-unit track covering GPIO through IoT dashboards
- Prerequisite: [Arduino Foundations](/curriculum/track-05-arduino)

## Lab Projects Using ESP32

- Wireless sensor arrays for classroom environment monitoring
- BLE-connected gesture detection prototypes
- MQTT-based physical AI demo boards for KSPAI events

## Recommended Development Setup

| Tool | Purpose |
|------|---------|
| Arduino IDE 2.x | Primary development environment |
| Mosquitto (local) | MQTT broker for testing |
| Node-RED | Dashboard and automation |
| nRF Connect (iOS/Android) | BLE debugging |
| ESP Flash Download Tool | Firmware flashing without IDE |
