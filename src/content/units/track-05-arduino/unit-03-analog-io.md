---
title: "Analog I/O: Sensors and PWM Output"
title_ko: "아날로그 입출력: 센서와 PWM"
track: "track-05-arduino"
unit_number: 3
description: "Read analog sensor values with the 10-bit ADC and generate analog-equivalent output using PWM."
description_ko: "10비트 ADC로 아날로그 센서값을 읽고 PWM으로 아날로그 출력을 생성하는 방법."
duration: "1.5 hours"
objectives:
  - "Read a potentiometer and light sensor via analogRead() (0–1023 range)"
  - "Generate PWM signals with analogWrite() (0–255 range)"
  - "Control LED brightness using a light sensor as feedback"
order: 3
---

## Analog Input (ADC)

The Uno/Nano has a 10-bit ADC on pins A0–A5. `analogRead(pin)` returns a value from
**0** (0V) to **1023** (5V reference voltage).

```cpp
int val = analogRead(A0); // 0–1023
float voltage = val * (5.0 / 1023.0); // convert to volts
```

Common analog sensors: potentiometers, LDRs (light-dependent resistors), thermistors, flex sensors.

## Reading a Potentiometer

Wire a 10kΩ pot: outer pins to 5V and GND, wiper to A0.

```cpp
void setup() { Serial.begin(9600); }

void loop() {
  int raw = analogRead(A0);         // 0–1023
  Serial.println(raw);
  delay(100);
}
```

Open the Serial Monitor and turn the knob — you should see the number change.

## PWM Output

PWM (Pulse Width Modulation) simulates analog voltage by switching a pin ON/OFF very fast.
Duty cycle (0–255 → 0%–100%) determines the effective average voltage.

PWM pins on Uno/Nano: **3, 5, 6, 9, 10, 11** (marked with `~` on the board).

```cpp
analogWrite(9, 128); // 50% duty cycle ≈ 2.5V effective
```

## Controlling LED Brightness with a Sensor

```cpp
const int LDR_PIN = A0;
const int LED_PIN = 9;  // must be PWM pin

void setup() { /* nothing needed */ }

void loop() {
  int light = analogRead(LDR_PIN);          // bright = high value
  int brightness = map(light, 0, 1023, 255, 0); // invert: dark → bright LED
  analogWrite(LED_PIN, brightness);
  delay(20);
}
```

`map(value, fromLow, fromHigh, toLow, toHigh)` linearly scales a value between ranges.

## Exercises

1. Print pot value as a bar of `#` characters to Serial Monitor
2. Build a "dimmer" that maps a pot to LED brightness smoothly
3. Add a threshold: if light < 300, turn LED fully on; otherwise dim proportionally
