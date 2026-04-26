---
title: "Introduction to ESP32 and its Ecosystem"
title_ko: "ESP32 소개와 에코시스템"
track: "track-06-esp32"
unit_number: 1
description: "Overview of the ESP32 chip, development boards, and how it differs from classic Arduino."
description_ko: "ESP32 칩, 개발 보드 개요, 클래식 아두이노와의 차이점."
duration: "1 hour"
objectives:
  - "Compare common ESP32 variants (DevKit, WROOM, WROVER, S3, C3)"
  - "Install ESP32 board support in the Arduino IDE"
  - "Run a Wi-Fi scan sketch to confirm the setup"
order: 1
---

## What is the ESP32?

The ESP32 is a low-cost, low-power SoC (System on Chip) from Espressif Systems.
Unlike the ATmega-based Arduino boards, the ESP32 features:

- **Dual-core Xtensa LX6** @ 240 MHz (single-core on C3/C6 variants)
- **520 KB SRAM**, 4–16 MB Flash (on the module)
- Integrated **Wi-Fi 802.11 b/g/n** and **Bluetooth 4.2 / BLE 5**
- **12-bit ADC** on up to 18 channels (vs. 10-bit on Uno)
- Hardware **I2C, SPI, I2S, UART, CAN** buses
- Deep sleep current as low as **10 µA**

These features make it the ideal platform for IoT and edge-AI projects.

## Common Variants

| Module | Core | Key Addition |
|--------|------|--------------|
| **WROOM-32** | Dual LX6 | Standard workhorse |
| **WROVER** | Dual LX6 | +8 MB PSRAM for camera/ML |
| **ESP32-S3** | Dual LX7 | USB OTG + AI acceleration |
| **ESP32-C3** | Single RISC-V | Ultra-low cost |
| **ESP32-S2** | Single LX7 | USB native, no BT |

The **38-pin DevKit v1** (WROOM module) is recommended for this track.

## Installing Board Support

1. Open Arduino IDE → **File → Preferences**
2. In "Additional boards manager URLs", add:  
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
3. **Tools → Board → Boards Manager**, search "esp32" and install **esp32 by Espressif Systems**
4. Select: **Tools → Board → ESP32 Arduino → ESP32 Dev Module**
5. Set: **Tools → Upload Speed → 921600**, **Flash Size → 4MB**, **Partition Scheme → Default**

## Your First Sketch: Wi-Fi Scan

```cpp
#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.println("Scanning Wi-Fi networks...");
  int n = WiFi.scanNetworks();
  for (int i = 0; i < n; ++i) {
    Serial.printf("%2d: %-32s (%d dBm) %s\n",
      i + 1, WiFi.SSID(i).c_str(), WiFi.RSSI(i),
      WiFi.encryptionType(i) == WIFI_AUTH_OPEN ? "OPEN" : "SECURE");
  }
}

void loop() {}
```

Open Serial Monitor at **115200 baud** — you should see nearby networks listed.

## Key Differences from Classic Arduino

| Feature | Arduino Uno | ESP32 DevKit |
|---------|-------------|--------------|
| CPU | 16 MHz 8-bit | 240 MHz 32-bit dual-core |
| Wi-Fi | ✗ | ✓ built-in |
| Bluetooth | ✗ | ✓ Classic + BLE |
| Logic level | 5V | **3.3V** (GPIO not 5V-tolerant!) |
| ADC resolution | 10-bit | 12-bit |
| Price (clone) | ~$3 USD | ~$4–6 USD |

> **Important:** ESP32 GPIO is **3.3V logic**. Connecting 5V signals directly will damage the chip.
> Use level shifters when interfacing with 5V Arduino shields or sensors.
