---
title: "Final Project: Autonomous Obstacle Avoidance Bot"
title_ko: "최종 프로젝트: 자율 장애물 회피 로봇"
track: "track-05-arduino"
unit_number: 8
description: "Integrate motors, ultrasonic sensing, and control logic to build a two-wheel robot that avoids obstacles."
description_ko: "모터, 초음파 센서, 제어 로직을 통합하여 장애물을 피하는 두 바퀴 로봇 제작."
duration: "3 hours"
objectives:
  - "Assemble a two-wheel chassis with L298N motor driver and HC-SR04"
  - "Write a state-machine sketch: FORWARD, STOP, REVERSE, TURN"
  - "Tune distance thresholds and turn duration for reliable avoidance"
order: 8
---

## Project Overview

Bring together everything from the track to build a self-driving robot that navigates a room
without hitting obstacles. The robot uses an HC-SR04 sensor to detect objects ahead, then
executes a stop–reverse–turn–forward manoeuvre to navigate around them.

## Bill of Materials

| Component | Qty | Notes |
|-----------|-----|-------|
| Arduino Uno or Nano | 1 | |
| L298N motor driver | 1 | |
| DC gearmotor | 2 | 3–6V, included in most chassis kits |
| 2-wheel chassis kit | 1 | Including battery holder |
| HC-SR04 | 1 | Mount on front of chassis |
| 9V battery or 4×AA pack | 1 | For motors; USB for Arduino |
| Jumper wires | — | |

## Wiring

```
Arduino → L298N                    Arduino → HC-SR04
  D6 (PWM) → ENA                    D10 → TRIG
  D7       → IN1   (left motor)     D9  → ECHO
  D8       → IN2
  D5 (PWM) → ENB
  D3       → IN3   (right motor)
  D4       → IN4
```

Share ground between Arduino, L298N, and battery pack.

## State Machine Sketch

```cpp
#include <NewPing.h> // install: "NewPing" by Tim Eckel — cleaner than pulseIn

#define TRIG 10
#define ECHO  9
#define MAX_DIST 200

NewPing sonar(TRIG, ECHO, MAX_DIST);

// Motor pins
const int ENA=6, IN1=7, IN2=8;
const int ENB=5, IN3=3, IN4=4;
const int SPEED = 180; // 0–255

enum State { FORWARD, STOP, REVERSE, TURN };
State state = FORWARD;
unsigned long stateStart = 0;

void setMotors(int l, int r) {
  // l, r: -255 (back) to 255 (forward)
  analogWrite(ENA, abs(l)); analogWrite(ENB, abs(r));
  digitalWrite(IN1, l > 0); digitalWrite(IN2, l < 0);
  digitalWrite(IN3, r > 0); digitalWrite(IN4, r < 0);
}

void setup() {
  int pins[] = {ENA,IN1,IN2,ENB,IN3,IN4};
  for (int p : pins) pinMode(p, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int dist = sonar.ping_cm();
  unsigned long now = millis();

  switch (state) {
    case FORWARD:
      setMotors(SPEED, SPEED);
      if (dist > 0 && dist < 20) {
        state = STOP; stateStart = now;
      }
      break;

    case STOP:
      setMotors(0, 0);
      if (now - stateStart > 300) { state = REVERSE; stateStart = now; }
      break;

    case REVERSE:
      setMotors(-SPEED, -SPEED);
      if (now - stateStart > 500) { state = TURN; stateStart = now; }
      break;

    case TURN:
      setMotors(-SPEED, SPEED); // spin right
      if (now - stateStart > 600) { state = FORWARD; }
      break;
  }

  Serial.print("State: "); Serial.print(state);
  Serial.print("  Dist: "); Serial.println(dist);
  delay(50);
}
```

## Tuning Guide

| Parameter | Effect | Adjust if… |
|-----------|--------|------------|
| `dist < 20` | Trigger distance | Robot hits objects before stopping |
| STOP 300 ms | Pause before reversing | Robot jerks without stopping |
| REVERSE 500 ms | Reverse distance | Not enough clearance from obstacle |
| TURN 600 ms | Turn angle | Not turning far enough to clear |
| `SPEED` | Motor speed | Chassis moves too fast/slow on floor surface |

## Deliverables

1. Working bot demo recorded on video
2. Sketch (.ino file) with clear comments
3. Short write-up (1 page): challenges faced, one improvement idea
