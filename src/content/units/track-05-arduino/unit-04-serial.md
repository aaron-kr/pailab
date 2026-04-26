---
title: "Serial Communication and Debugging"
title_ko: "시리얼 통신과 디버깅"
track: "track-05-arduino"
unit_number: 4
description: "Use the Serial Monitor for real-time debugging and communicate with a host PC over UART."
description_ko: "시리얼 모니터로 실시간 디버깅을 하고 UART로 PC와 통신하는 방법."
duration: "1 hour"
objectives:
  - "Use Serial.begin(), Serial.print(), and Serial.println() for output"
  - "Read strings and numbers from the Serial Monitor with Serial.read() and parseInt()"
  - "Debug programs using print-based tracing and timing checks"
order: 4
---

## Why Serial Communication?

Arduino has no screen. The **Serial Monitor** (built into the IDE) is your primary debug window
and the easiest way to inspect variable values while the sketch is running.

Under the hood, this uses **UART** — a two-wire asynchronous protocol on pins **0 (RX)** and
**1 (TX)**. Avoid using those pins for other purposes while Serial is active.

## Basic Output

```cpp
void setup() {
  Serial.begin(9600); // set baud rate — must match Serial Monitor setting
}

void loop() {
  int val = analogRead(A0);
  Serial.print("Raw ADC: ");
  Serial.println(val); // println adds newline
  delay(200);
}
```

Baud rate `9600` is safe for most purposes. Use `115200` when you need faster throughput.

## Formatted Output

```cpp
Serial.print("Temp: ");
Serial.print(temperature, 1); // 1 decimal place
Serial.println(" °C");
```

For multi-value debug lines, separate with commas (useful for the Serial Plotter):
```cpp
Serial.print(sensor1); Serial.print(","); Serial.println(sensor2);
```

## Reading from Serial

```cpp
void loop() {
  if (Serial.available() > 0) {
    int brightness = Serial.parseInt(); // read next integer
    analogWrite(9, constrain(brightness, 0, 255));
    Serial.print("Set brightness: ");
    Serial.println(brightness);
  }
}
```

`Serial.available()` returns the number of bytes waiting in the buffer.
`Serial.parseInt()` waits until a number is found (blocks briefly).

## Debugging Tips

- Print **before and after** suspect lines to isolate where code stalls
- Include `millis()` to check timing: `Serial.println(millis());`
- Use `constrain()` to catch out-of-range values
- Comment out `delay()` calls and replace with `millis()`-based timing for non-blocking sketches

## Exercises

1. Log pot + light sensor values to Serial Plotter; observe them live as graphs
2. Build a simple LED controller: type a brightness (0–255) in Serial Monitor to set it
3. Print "Loop time: Xms" every iteration to measure how long your loop takes
