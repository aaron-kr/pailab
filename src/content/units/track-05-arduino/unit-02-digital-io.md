---
title: "Digital I/O: LEDs, Buttons, and Switches"
title_ko: "디지털 입출력: LED, 버튼, 스위치"
track: "track-05-arduino"
unit_number: 2
description: "Control output devices and read digital input signals using GPIO pins."
description_ko: "GPIO 핀으로 출력 장치를 제어하고 디지털 입력 신호를 읽는 방법."
duration: "1.5 hours"
objectives:
  - "Wire and control LEDs with digital output pins"
  - "Read button state with digitalRead() and respond in code"
  - "Implement software debouncing for reliable button input"
order: 2
---

## Digital Signals

Digital signals have only two states: **HIGH** (5V on Uno/Nano) or **LOW** (0V).
Every GPIO pin on an Arduino can be configured as either:

- **Output** — the Arduino drives the pin (e.g., controlling an LED)
- **Input** — the Arduino reads the pin (e.g., reading a button)

## Wiring an LED

Always use a current-limiting resistor in series with an LED (typically 220Ω–1kΩ for standard 5mm LEDs):

```
Arduino pin 9 ──[220Ω]──┤► LED ├── GND
```

```cpp
const int LED_PIN = 9;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
```

## Reading a Button

Buttons need a **pull-down** or **pull-up** resistor to give a defined logic level when not pressed.
Arduino has internal pull-up resistors you can enable with `INPUT_PULLUP` — this inverts the logic
(pressed = LOW, released = HIGH):

```cpp
const int BTN_PIN = 2;
const int LED_PIN = 9;

void setup() {
  pinMode(BTN_PIN, INPUT_PULLUP); // internal pull-up
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if (digitalRead(BTN_PIN) == LOW) { // pressed
    digitalWrite(LED_PIN, HIGH);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
}
```

## Debouncing

Mechanical buttons bounce (rapidly open/close) for a few milliseconds when pressed.
Software debouncing ignores transitions that happen too quickly:

```cpp
const int BTN_PIN   = 2;
const int DEBOUNCE  = 50; // ms

bool lastState      = HIGH;
unsigned long lastChange = 0;

void loop() {
  bool state = digitalRead(BTN_PIN);
  if (state != lastState && millis() - lastChange > DEBOUNCE) {
    lastState  = state;
    lastChange = millis();
    if (state == LOW) Serial.println("Button pressed!");
  }
}
```

## Exercises

1. Wire two LEDs and make them alternate every 300 ms
2. Add a second button to control the blink speed (fast / slow toggle)
3. Implement a 3-flash "morse SOS" pattern triggered by a button press
