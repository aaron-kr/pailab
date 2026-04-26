---
title: "Bluetooth and BLE Communication"
title_ko: "블루투스와 BLE 통신"
track: "track-06-esp32"
unit_number: 4
description: "Send and receive data over Classic Bluetooth Serial and Bluetooth Low Energy (BLE) GATT."
description_ko: "클래식 블루투스 시리얼과 BLE GATT 프로파일로 데이터 송수신."
duration: "2 hours"
objectives:
  - "Send sensor data over Classic Bluetooth Serial (SPP) from a smartphone terminal"
  - "Create a BLE GATT server with a custom readable/writable characteristic"
  - "Connect from a smartphone app (Serial Bluetooth Terminal / nRF Connect)"
order: 4
---

## Classic Bluetooth Serial (SPP)

The simplest approach — the ESP32 appears as a Bluetooth serial device, just like a USB-to-serial dongle.

```cpp
#include <BluetoothSerial.h>

BluetoothSerial BT;

void setup() {
  Serial.begin(115200);
  BT.begin("ESP32-Lab"); // device name visible when pairing
  Serial.println("Bluetooth started");
}

void loop() {
  // Send sensor data every second
  float temp = 26.5; // replace with DHT reading
  BT.printf("T:%.1f\n", temp);

  // Echo back anything received
  if (BT.available()) {
    char c = BT.read();
    Serial.print(c);
  }
  delay(1000);
}
```

Pair your phone to "ESP32-Lab" and open the **Serial Bluetooth Terminal** app.
You should see temperature readings arriving every second.

## Bluetooth Low Energy (BLE)

BLE uses a GATT (Generic Attribute Profile) model: a **server** (ESP32) exposes **services**
containing **characteristics** that a **client** (phone) can read or write.

```cpp
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

// Custom UUIDs — generate your own at uuidgenerator.net
#define SERVICE_UUID    "12345678-1234-1234-1234-1234567890ab"
#define CHAR_TEMP_UUID  "12345678-1234-1234-1234-1234567890cd"
#define CHAR_LED_UUID   "12345678-1234-1234-1234-1234567890ef"

BLECharacteristic* tempChar;
const int LED_PIN = 13;

class LEDCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic* c) override {
    std::string val = c->getValue();
    if (val.length() > 0) {
      digitalWrite(LED_PIN, val[0] == '1' ? HIGH : LOW);
    }
  }
};

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);

  BLEDevice::init("ESP32-BLE-Lab");
  BLEServer* server = BLEDevice::createServer();
  BLEService* service = server->createService(SERVICE_UUID);

  // Read-only temperature characteristic with notify
  tempChar = service->createCharacteristic(
    CHAR_TEMP_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  tempChar->addDescriptor(new BLE2902());

  // Write-only LED control characteristic
  BLECharacteristic* ledChar = service->createCharacteristic(
    CHAR_LED_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  ledChar->setCallbacks(new LEDCallbacks());

  service->start();
  BLEAdvertising* adv = BLEDevice::getAdvertising();
  adv->addServiceUUID(SERVICE_UUID);
  adv->start();
  Serial.println("BLE advertising started");
}

void loop() {
  float temp = 26.5; // replace with DHT reading
  char buf[8];
  snprintf(buf, sizeof(buf), "%.1f", temp);
  tempChar->setValue(buf);
  tempChar->notify(); // push to connected clients
  delay(2000);
}
```

Use **nRF Connect** (Android/iOS) to scan, connect, and read/write characteristics.

## Choosing Classic vs. BLE

| Feature | Classic BT (SPP) | BLE |
|---------|-----------------|-----|
| Power draw | ~30 mA active | ~10–15 mA active |
| Range | ~10 m | ~10–100 m (version 5) |
| Data rate | High | Low (but enough for sensors) |
| Phone support | Older apps | All modern devices |
| Best for | Streaming (audio, logs) | Sensors, IoT, wearables |

## Exercises

1. Send both temperature and humidity over BT Serial as CSV (`T:25.4,H:62.1`)
2. Use BLE notify to push pot position (0–4095) to nRF Connect every 500 ms
3. Control three LEDs by writing "R", "G", "B" or "0" to the LED characteristic
