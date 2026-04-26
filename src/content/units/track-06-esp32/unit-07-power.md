---
title: "Deep Sleep and Power Management"
title_ko: "딥 슬립과 전력 관리"
track: "track-06-esp32"
unit_number: 7
description: "Reduce power consumption using deep sleep, timer and GPIO wake-up, and battery-aware firmware design."
description_ko: "딥 슬립과 타이머/GPIO 웨이크업, 배터리 절약 펌웨어 설계로 소비 전력 절감."
duration: "1.5 hours"
objectives:
  - "Enable deep sleep with esp_deep_sleep_start() and a timer wake-up"
  - "Configure external GPIO and touch wake-up sources"
  - "Measure current draw with and without deep sleep to quantify battery life improvement"
order: 7
---

## Why Power Management Matters

Running an ESP32 continuously at full Wi-Fi power draws ~240 mA.
A 1000 mAh battery would last ~4 hours. With periodic deep sleep, the same battery can last
**weeks** for a sensor that wakes, takes a reading, publishes over MQTT, then sleeps again.

| Mode | Typical current |
|------|----------------|
| Active (Wi-Fi TX) | 160–240 mA |
| Active (no Wi-Fi) | 20–80 mA |
| Light sleep | 0.8 mA |
| Deep sleep | **10–150 µA** |

## Deep Sleep Basics

In deep sleep, only the RTC (Real-Time Clock) subsystem remains active.
All other peripherals — CPU, Wi-Fi, Bluetooth, ADC — are powered off.

```cpp
#define uS_TO_S 1000000ULL // microseconds → seconds

void setup() {
  Serial.begin(115200);
  Serial.println("Waking up...");

  // --- do your work here (read sensor, send MQTT, etc.) ---
  float temp = 25.4;
  Serial.printf("Temp: %.1f°C\n", temp);

  Serial.println("Going to sleep for 30 seconds...");
  delay(100); // let Serial flush

  esp_sleep_enable_timer_wakeup(30 * uS_TO_S);
  esp_deep_sleep_start(); // does not return
}

void loop() { /* never reached */ }
```

Every wake-up runs `setup()` from the beginning.

## RTC Memory — Persisting Data

Normal variables reset on each wake. Store persistent data in RTC-retained SRAM:

```cpp
RTC_DATA_ATTR int wakeCount = 0; // survives deep sleep

void setup() {
  wakeCount++;
  Serial.printf("Wake #%d\n", wakeCount);
  // ...
  esp_deep_sleep_start();
}
```

## External GPIO Wake-up

Wake when a GPIO goes LOW (e.g., a button press or motion sensor trigger):

```cpp
#define WAKE_PIN GPIO_NUM_33

esp_sleep_enable_ext0_wakeup(WAKE_PIN, 0); // 0 = wake on LOW
```

For multiple pins (any one triggers wake):
```cpp
esp_sleep_enable_ext1_wakeup((1ULL << GPIO_NUM_33) | (1ULL << GPIO_NUM_34),
  ESP_EXT1_WAKEUP_ANY_LOW);
```

## Touch Wake-up

The ESP32 has capacitive touch inputs on GPIO 2, 4, 12, 13, 14, 15, 27, 32, 33:

```cpp
esp_sleep_enable_touchpad_wakeup();
touchSleepWakeUpEnable(T0, 40); // T0 = GPIO4, threshold 40
```

## Duty Cycle Calculation

```
Active time: 2 seconds (connect Wi-Fi + publish + disconnect)
Sleep time:  58 seconds
Average current ≈ (2/60 × 200 mA) + (58/60 × 0.05 mA) ≈ 6.7 mA
Battery life (1000 mAh) ≈ 1000 / 6.7 ≈ 149 hours ≈ 6 days
```

## Exercises

1. Build a sensor node: wake every 60 s, read DHT22, publish to MQTT, deep sleep
2. Add an RTC counter that increments each wake; publish it as `wakeCount` to MQTT
3. Measure average current with a USB power meter before and after adding sleep
