---
title: "GPIO, Digital, and Analog I/O on ESP32"
title_ko: "ESP32의 GPIO와 디지털/아날로그 I/O"
track: "track-06-esp32"
unit_number: 2
description: "Work with ESP32 GPIO pins, understand voltage limits, and use the 12-bit ADC and ledc PWM."
description_ko: "ESP32 GPIO 핀 작업, 전압 제한 이해, 12비트 ADC와 ledc PWM 사용."
duration: "1.5 hours"
objectives:
  - "Map ESP32 GPIO pin functions, restrictions, and 3.3V limits"
  - "Read 12-bit analog values (0–4095) and convert to physical units"
  - "Generate PWM using ledcWrite() for smooth LED brightness control"
order: 2
---

## GPIO Pin Map (38-pin DevKit)

Not all ESP32 pins are equal. Key restrictions:

| Pin group | Notes |
|-----------|-------|
| **GPIO 0, 2, 5, 12, 15** | Strapping pins — affect boot mode; avoid as outputs |
| **GPIO 34–39** | **Input only** — no internal pull-up/pull-down |
| **GPIO 6–11** | Connected to internal Flash — do not use |
| **GPIO 21 (SDA), 22 (SCL)** | Default I2C |
| **GPIO 23 (MOSI), 18 (SCK), 19 (MISO), 5 (CS)** | Default SPI |

Safe general-purpose I/O: 13, 14, 16, 17, 25, 26, 27, 32, 33.

## Digital I/O

Identical API to Arduino:

```cpp
pinMode(13, OUTPUT);
digitalWrite(13, HIGH);   // 3.3V

pinMode(32, INPUT_PULLUP);
bool state = digitalRead(32); // LOW when pressed
```

All digital pins are **3.3V logic**. Driving them HIGH outputs ~3.3V, not 5V.

## 12-bit ADC

ESP32 ADC returns 0–4095 (12-bit). Note: the ADC has non-linearity near 0V and 3.3V — avoid
the bottom and top 10% for accurate measurements.

```cpp
int raw = analogRead(34);            // GPIO34 (input-only pin — safe for ADC)
float voltage = raw * (3.3 / 4095.0);
Serial.printf("ADC: %d  Voltage: %.2f V\n", raw, voltage);
```

Set ADC resolution (default is 12-bit on ESP32 Arduino):
```cpp
analogReadResolution(12); // 12-bit: 0–4095
```

## PWM with ledcWrite()

Unlike Arduino's `analogWrite()`, ESP32 uses the LEDC peripheral explicitly:

```cpp
const int LED_PIN   = 13;
const int LEDC_CH   = 0;   // channel 0–15
const int LEDC_FREQ = 5000; // Hz
const int LEDC_RES  = 8;    // bits (0–255 duty range)

void setup() {
  ledcSetup(LEDC_CH, LEDC_FREQ, LEDC_RES);
  ledcAttachPin(LED_PIN, LEDC_CH);
}

void loop() {
  for (int duty = 0; duty <= 255; duty++) {
    ledcWrite(LEDC_CH, duty);
    delay(8);
  }
  for (int duty = 255; duty >= 0; duty--) {
    ledcWrite(LEDC_CH, duty);
    delay(8);
  }
}
```

> **Arduino ESP32 v3.x change:** newer versions use `analogWrite(pin, value)` which wraps ledc
> automatically. Check your board package version — if v3+, `analogWrite` works as on classic Arduino.

## ADC to PWM Feedback

```cpp
void loop() {
  int raw = analogRead(34);
  int duty = map(raw, 0, 4095, 0, 255);
  ledcWrite(0, duty);
  delay(20);
}
```

## Exercises

1. Read a 10kΩ pot wired to 3.3V/GND/GPIO34 and display voltage in Serial Monitor
2. Fade an LED from off → full bright → off using a 10 ms step interval
3. Map ADC value to three LEDs: low third → red, middle → yellow, top → green
