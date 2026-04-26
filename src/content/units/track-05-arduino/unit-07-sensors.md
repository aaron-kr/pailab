---
title: "Sensors: IR, Ultrasonic, and Temperature"
title_ko: "센서: 적외선, 초음파, 온도"
track: "track-05-arduino"
unit_number: 7
description: "Interface common sensors: HC-SR04 ultrasonic distance, DHT temperature/humidity, and IR proximity."
description_ko: "HC-SR04 초음파 거리 센서, DHT 온습도 센서, 적외선 근접 센서 인터페이스."
duration: "2 hours"
objectives:
  - "Measure distance with HC-SR04 using pulseIn()"
  - "Read temperature and humidity from a DHT11 or DHT22"
  - "Detect presence with a digital IR sensor module"
order: 7
---

## HC-SR04 Ultrasonic Distance Sensor

The HC-SR04 emits a 40 kHz pulse and measures the echo return time.

```
Sensor TRIG → Arduino pin 10
Sensor ECHO → Arduino pin 9
Sensor VCC  → 5V
Sensor GND  → GND
```

```cpp
const int TRIG = 10, ECHO = 9;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

long readDistance() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long duration = pulseIn(ECHO, HIGH, 30000); // timeout 30 ms
  return duration * 0.034 / 2; // cm
}

void loop() {
  Serial.print("Distance: ");
  Serial.print(readDistance());
  Serial.println(" cm");
  delay(200);
}
```

Returns 0 if no echo (object too far or sensor mis-wired).

## DHT11 / DHT22 Temperature & Humidity

Install the **DHT sensor library** by Adafruit (Sketch → Manage Libraries).

```cpp
#include <DHT.h>

#define DHT_PIN  4
#define DHT_TYPE DHT22  // or DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature(); // Celsius; add true for Fahrenheit

  if (isnan(h) || isnan(t)) {
    Serial.println("Read failed — check wiring");
    return;
  }
  Serial.print("T: "); Serial.print(t); Serial.print("°C  H: ");
  Serial.print(h); Serial.println("%");
  delay(2000); // DHT22 minimum sample interval: 2 s
}
```

DHT11 has ±2°C / ±5% RH accuracy. DHT22 is more precise: ±0.5°C / ±2–5% RH.

## IR Proximity Sensor

Digital IR modules (e.g., FC-51) output LOW when an object is detected within ~2–30 cm.
Adjust the on-board potentiometer to set sensitivity.

```cpp
const int IR_PIN = 2;
const int LED    = 13;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED, OUTPUT);
}

void loop() {
  if (digitalRead(IR_PIN) == LOW) { // object detected
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}
```

## Combined Project: Smart Alert

```cpp
void loop() {
  long dist = readDistance();
  float temp = dht.readTemperature();

  if (dist < 15) Serial.println("NEAR");
  if (temp > 30) Serial.println("HOT");

  delay(500);
}
```

## Exercises

1. Display distance and temperature on the LCD from Unit 5
2. Sound a piezo buzzer (tone()) when distance < 10 cm; increase beep rate as object gets closer
3. Log temp + humidity every 5 minutes to Serial; calculate average over 10 readings
