---
title: "Motor Control and Actuators"
title_ko: "모터 제어와 액추에이터"
track: "track-05-arduino"
unit_number: 6
description: "Drive DC motors with an L298N H-bridge driver, control servo angle, and step a stepper motor."
description_ko: "L298N H-브리지 드라이버로 DC 모터 제어, 서보 각도 제어, 스테퍼 모터 제어."
duration: "2 hours"
objectives:
  - "Wire and drive a DC motor bi-directionally using an L298N driver"
  - "Control servo angle (0°–180°) using the built-in Servo library"
  - "Step a 28BYJ-48 stepper motor using the AccelStepper library"
order: 6
---

## Why a Motor Driver?

Arduino GPIO pins can only source/sink ~40 mA — not enough to drive a motor directly.
Motor drivers (H-bridges) use transistors to switch higher currents from an external power supply
while keeping the Arduino safely isolated.

## DC Motor with L298N

The L298N drives two DC motors. For one motor:

```
Arduino pin 6 (PWM) → L298N ENA   (speed)
Arduino pin 7       → L298N IN1   (direction)
Arduino pin 8       → L298N IN2   (direction)
External 6–12V      → L298N VIN
GND shared between Arduino and L298N
```

```cpp
const int ENA = 6, IN1 = 7, IN2 = 8;

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
}

void forward(int speed) {
  analogWrite(ENA, speed); // 0–255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}

void backward(int speed) {
  analogWrite(ENA, speed);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
}

void stopMotor() { analogWrite(ENA, 0); }
```

## Servo Control

Servos receive a PWM signal (50 Hz, 1–2 ms pulse width) to hold a specific angle.
Arduino's `Servo` library handles the timing:

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9); // any digital pin
}

void loop() {
  for (int angle = 0; angle <= 180; angle += 5) {
    myServo.write(angle);
    delay(20);
  }
  for (int angle = 180; angle >= 0; angle -= 5) {
    myServo.write(angle);
    delay(20);
  }
}
```

## Stepper Motor (28BYJ-48 + ULN2003)

The 28BYJ-48 is an inexpensive 5V geared stepper (2048 steps/rev) driven by a ULN2003 board.

```cpp
#include <AccelStepper.h> // install: "AccelStepper" by Mike McCauley

// ULN2003 driver pins: IN1 IN2 IN3 IN4
AccelStepper stepper(AccelStepper::HALF4WIRE, 8, 10, 9, 11);

void setup() {
  stepper.setMaxSpeed(500);    // steps/sec
  stepper.setAcceleration(200);
  stepper.moveTo(2048);        // one full revolution
}

void loop() {
  if (stepper.distanceToGo() == 0) {
    stepper.moveTo(-stepper.currentPosition()); // reverse
  }
  stepper.run(); // call as often as possible — non-blocking
}
```

## Exercises

1. Control DC motor speed with a potentiometer; reverse direction with a button
2. Use a servo as a "gauge needle" that maps to ADC reading (0 → 0°, 1023 → 180°)
3. Combine stepper + button: press to advance exactly 512 steps (quarter turn)
