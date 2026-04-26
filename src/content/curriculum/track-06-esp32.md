---
title: "ESP32: IoT and Wireless Physical AI"
title_ko: "ESP32: IoT와 무선 피지컬 AI"
track: "06"
level: "intermediate"
units: 8
bilingual: true
description: "Build Wi-Fi-enabled sensors, MQTT pipelines, and edge AI applications using the ESP32 microcontroller."
description_ko: "ESP32 마이크로컨트롤러로 Wi-Fi 센서, MQTT 파이프라인, 엣지 AI 애플리케이션 구축."
order: 6
---

**Status: `Active`**

## Overview

This track takes students from zero to a fully-featured IoT node using the ESP32 microcontroller.
Topics include Wi-Fi and Bluetooth connectivity, MQTT-based telemetry, power management, and
camera integration — culminating in a battery-powered environmental dashboard streamed over MQTT.

The ESP32's dual-core Xtensa LX6 processor, integrated Wi-Fi/BT, and 12-bit ADC make it a
versatile bridge between traditional embedded programming and cloud-connected Physical AI.

## Prerequisites

- Track 05 (Arduino Foundations) or equivalent Arduino experience
- Basic understanding of networking concepts (IP address, ports) is helpful but not required

## Units

1. Introduction to ESP32 and its Ecosystem
2. GPIO, Digital, and Analog I/O on ESP32
3. Wi-Fi Connectivity and Web Server
4. Bluetooth and BLE Communication
5. MQTT and IoT Protocols
6. Sensors: DHT, IMU, and Camera
7. Deep Sleep and Power Management
8. Final Project: IoT Environmental Dashboard

## Materials

| Item | Notes |
|------|-------|
| ESP32 DevKit v1 (WROOM) | 38-pin variant recommended |
| Breadboard + jumpers | Half-size or full |
| DHT22 sensor | Temperature + humidity |
| MPU-6050 | 6-axis IMU (I2C) |
| ESP32-CAM (optional) | AI-Thinker module for camera unit |
| OLED display 128×64 (optional) | SSD1306, I2C |
| Li-Po battery + TP4056 charger | For power management unit |
| MQTT broker | Local Mosquitto or cloud HiveMQ |
