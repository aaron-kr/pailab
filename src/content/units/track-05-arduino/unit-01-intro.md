---
title: "Introduction to Arduino and the IDE"
title_ko: "아두이노 소개와 IDE"
track: "track-05-arduino"
unit_number: 1
description: "Overview of the Arduino ecosystem, hardware variants, and the Arduino IDE setup."
description_ko: "아두이노 에코시스템, 하드웨어 종류, Arduino IDE 설치 개요."
duration: "1 hour"
objectives:
  - "Identify common Arduino boards (Uno, Nano, Mega) and their key specs"
  - "Install and configure the Arduino IDE (2.x)"
  - "Upload and run the Blink sketch to confirm a working setup"
order: 1
---

## What is Arduino?

Arduino is an open-source electronics platform pairing simple microcontroller hardware with
an approachable software environment. An Arduino board reads inputs — a light sensor, a button,
a temperature reading — and turns them into outputs: activating a motor, turning on an LED,
publishing data online.

The ecosystem includes dozens of official boards, thousands of third-party clones, and an
enormous library of community code — making it the most accessible entry point to physical
computing.

## Common Boards

| Board | MCU | Clock | Flash | RAM | I/O pins |
|-------|-----|-------|-------|-----|----------|
| **Uno R3** | ATmega328P | 16 MHz | 32 KB | 2 KB | 20 (6 analog) |
| **Nano** | ATmega328P | 16 MHz | 32 KB | 2 KB | 22 (8 analog) |
| **Mega 2560** | ATmega2560 | 16 MHz | 256 KB | 8 KB | 70 (16 analog) |
| **Leonardo** | ATmega32U4 | 16 MHz | 32 KB | 2.5 KB | 20 (12 analog) |

For this track, the **Uno** or **Nano** is recommended — both are low-cost, well-documented,
and have nearly identical pinouts.

## Installing the IDE

1. Download **Arduino IDE 2.x** from [arduino.cc/en/software](https://www.arduino.cc/en/software)
2. Run the installer (Windows: `.exe`, macOS: `.dmg`, Linux: AppImage)
3. On first launch, accept the prompt to install the USB driver (CH340 / CP2102 for clone boards)
4. Connect your board via USB — the IDE should detect it under **Tools → Port**

## Your First Sketch: Blink

The Blink sketch is the "Hello World" of Arduino:

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT); // built-in LED is pin 13 on Uno/Nano
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // turn LED on
  delay(1000);                     // wait 1 second
  digitalWrite(LED_BUILTIN, LOW);  // turn LED off
  delay(1000);                     // wait 1 second
}
```

Open it from **File → Examples → 01.Basics → Blink**, upload with the ▶ button,
and watch the amber LED on the board blink once per second.

## Key Concepts

- **`setup()`** runs once when the board powers on — use it for pin configuration
- **`loop()`** runs forever in a tight loop — all main program logic goes here
- **`delay(ms)`** pauses execution; use sparingly in complex programs (blocks everything)
- **`pinMode(pin, mode)`** sets a pin as `INPUT`, `OUTPUT`, or `INPUT_PULLUP`
