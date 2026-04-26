---
title: "Libraries and Shields"
title_ko: "라이브러리와 쉴드"
track: "track-05-arduino"
unit_number: 5
description: "Install and use Arduino libraries; interface with common shields like LCD displays and relay boards."
description_ko: "아두이노 라이브러리 설치 및 사용법, LCD 디스플레이·릴레이 쉴드 인터페이스."
duration: "1.5 hours"
objectives:
  - "Install libraries via the IDE Library Manager and from ZIP files"
  - "Display text on a 16×2 LCD using the LiquidCrystal library"
  - "Understand shield pinout stacking and avoid pin conflicts"
order: 5
---

## What are Libraries?

Libraries bundle pre-written code for specific hardware or protocols — saving you from
implementing low-level communication yourself. Arduino ships with standard libraries
(Serial, Wire, SPI, Servo); the Library Manager gives access to thousands more.

## Installing a Library

**From the IDE (recommended):**
1. Sketch → Include Library → Manage Libraries…
2. Search for the library name (e.g., `DHT sensor library` by Adafruit)
3. Click **Install** — dependencies are installed automatically

**From a ZIP:**
1. Download the `.zip` from GitHub
2. Sketch → Include Library → Add .ZIP Library…
3. Select the file — it installs to `~/Documents/Arduino/libraries/`

## 16×2 LCD with LiquidCrystal

The classic 4-bit parallel LCD needs 6 GPIO lines:

```
LCD RS → pin 12 | EN → pin 11 | D4 → pin 5 | D5 → pin 4 | D6 → pin 3 | D7 → pin 2
LCD VSS → GND | VCC → 5V | V0 (contrast) → 10kΩ pot wiper | A (backlight+) → 5V via 220Ω | K → GND
```

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);       // 16 columns, 2 rows
  lcd.print("Hello!");
}

void loop() {
  lcd.setCursor(0, 1);    // column 0, row 1
  lcd.print(millis() / 1000);
  lcd.print("s   ");
  delay(200);
}
```

## I2C LCD (simpler wiring)

Most modern LCD modules include an I2C backpack (PCF8574). Only 2 wires needed:

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h> // install: "LiquidCrystal I2C" by Frank de Brabander

LiquidCrystal_I2C lcd(0x27, 16, 2); // address 0x27 is most common; try 0x3F if not working

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.print("PAI Lab!");
}
```

## Relay Shield

A relay is an electrically controlled switch — it lets Arduino control mains-voltage devices safely.

```cpp
const int RELAY = 7;

void setup() {
  pinMode(RELAY, OUTPUT);
  digitalWrite(RELAY, LOW); // relays are often active-LOW; LOW = relay energised
}

void loop() {
  digitalWrite(RELAY, LOW);  // ON
  delay(2000);
  digitalWrite(RELAY, HIGH); // OFF
  delay(2000);
}
```

Always check your relay module's active level (some are active-HIGH, some active-LOW).

## Exercises

1. Display the pot value (0–1023) and its voltage equivalent on the LCD
2. Add a button: press once to show temp (use DHT11), press again to show light level
3. Use a relay to blink a desk lamp (or a fan) at a rate controlled by the pot
