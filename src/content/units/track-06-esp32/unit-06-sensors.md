---
title: "Sensors: DHT, IMU, and Camera"
title_ko: "센서: DHT, IMU, 카메라"
track: "track-06-esp32"
unit_number: 6
description: "Interface a DHT22 environmental sensor, MPU-6050 IMU via I2C, and the ESP32-CAM module."
description_ko: "DHT22 환경 센서, I2C MPU-6050 IMU, ESP32-CAM 모듈 인터페이스."
duration: "2.5 hours"
objectives:
  - "Log temperature and humidity from a DHT22 sensor"
  - "Read 6-axis accelerometer + gyroscope data from an MPU-6050 via I2C"
  - "Capture and stream JPEG frames from an ESP32-CAM module"
order: 6
---

## DHT22 Environmental Sensor

Already covered in Arduino Track 07 — same library and wiring on ESP32, but remember **3.3V** logic.

```cpp
#include <DHT.h>

#define DHT_PIN  4     // any available GPIO
DHT dht(DHT_PIN, DHT22);

void setup() { Serial.begin(115200); dht.begin(); }

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  if (!isnan(t)) Serial.printf("T: %.1f°C  H: %.0f%%\n", t, h);
  delay(2000);
}
```

## MPU-6050 IMU (I2C)

The MPU-6050 is a 6-axis IMU (3-axis accel + 3-axis gyro) using the I2C bus.

**Wiring:**
```
MPU-6050 VCC → 3.3V    SDA → GPIO21    SCL → GPIO22    GND → GND    AD0 → GND (address 0x68)
```

Install library: **MPU6050 by Electronic Cats** or **Adafruit MPU6050**.

```cpp
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

Adafruit_MPU6050 mpu;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // SDA, SCL
  if (!mpu.begin()) { Serial.println("MPU6050 not found"); while (1); }
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
}

void loop() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  Serial.printf("Accel X:%.2f Y:%.2f Z:%.2f m/s²\n",
    a.acceleration.x, a.acceleration.y, a.acceleration.z);
  Serial.printf("Gyro  X:%.2f Y:%.2f Z:%.2f rad/s\n",
    g.gyro.x, g.gyro.y, g.gyro.z);
  delay(100);
}
```

When the board is flat on a table: Z accel ≈ 9.8 m/s² (gravity), X/Y ≈ 0.

## Tilt Detection

```cpp
float tilt = atan2(a.acceleration.y, a.acceleration.z) * 180.0 / PI;
Serial.printf("Tilt: %.1f°\n", tilt);
```

## ESP32-CAM (AI-Thinker Module)

The ESP32-CAM is a separate board with an OV2640 camera module. It requires a separate
USB-UART adapter to program (no built-in USB).

**Board selection:** Tools → Board → AI-Thinker ESP32-CAM

**Basic JPEG capture and Serial output:**

```cpp
#include <esp_camera.h>

camera_config_t config;
// (Full pin config for AI-Thinker — see CameraWebServer example)

void setup() {
  Serial.begin(115200);
  // Initialize with config (see example sketch)
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) { Serial.printf("Camera init failed: 0x%x\n", err); return; }
}

void loop() {
  camera_fb_t* fb = esp_camera_fb_get();
  if (fb) {
    Serial.printf("Captured %zu bytes at %dx%d\n", fb->len, fb->width, fb->height);
    esp_camera_fb_return(fb);
  }
  delay(2000);
}
```

For a full streaming web server, open: **File → Examples → ESP32 → Camera → CameraWebServer**
and follow the README. It streams MJPEG over HTTP — viewable in any browser.

## Exercises

1. Publish DHT22 + MPU-6050 data together as JSON over MQTT
2. Trigger a camera capture when acceleration exceeds a threshold (impact detection)
3. Log gyro data to the Serial Plotter and observe the 3 axes during rotation
