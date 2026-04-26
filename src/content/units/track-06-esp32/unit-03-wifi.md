---
title: "Wi-Fi Connectivity and Web Server"
title_ko: "Wi-Fi 연결과 웹 서버"
track: "track-06-esp32"
unit_number: 3
description: "Connect the ESP32 to a Wi-Fi network and serve a simple web page to monitor and control GPIO."
description_ko: "ESP32를 Wi-Fi 네트워크에 연결하고 GPIO 모니터링·제어용 웹 페이지 서빙."
duration: "2 hours"
objectives:
  - "Connect to a network using WiFi.begin() and confirm with an IP address"
  - "Host an HTTP server with the WebServer library"
  - "Toggle an LED from a browser button without installing any app"
order: 3
---

## Connecting to Wi-Fi

```cpp
#include <WiFi.h>

const char* SSID     = "YourNetworkName";
const char* PASSWORD = "YourPassword";

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, PASSWORD);
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
}
```

Store credentials in a separate `secrets.h` file (add it to `.gitignore`) rather than in the main sketch.

## Hosting a Web Server

The `WebServer` library handles HTTP routing:

```cpp
#include <WiFi.h>
#include <WebServer.h>

WebServer server(80); // port 80
const int LED_PIN = 13;
bool ledState = false;

void handleRoot() {
  String html = R"rawliteral(
<!DOCTYPE html><html><body>
<h2>ESP32 LED Control</h2>
<p>LED is: <strong id="state">)rawliteral";
  html += ledState ? "ON" : "OFF";
  html += R"rawliteral(</strong></p>
<a href="/toggle"><button>Toggle</button></a>
</body></html>)rawliteral";
  server.send(200, "text/html", html);
}

void handleToggle() {
  ledState = !ledState;
  digitalWrite(LED_PIN, ledState ? HIGH : LOW);
  server.sendHeader("Location", "/");
  server.send(302, "text/plain", "");
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  WiFi.begin("SSID", "PASSWORD");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println("IP: " + WiFi.localIP().toString());

  server.on("/", handleRoot);
  server.on("/toggle", handleToggle);
  server.begin();
}

void loop() {
  server.handleClient(); // process incoming requests
}
```

Open a browser and navigate to the IP printed in Serial Monitor.

## Serving Sensor Data as JSON

```cpp
void handleSensor() {
  float temp = 25.4; // replace with DHT reading
  String json = "{\"temperature\":" + String(temp, 1) + "}";
  server.send(200, "application/json", json);
}

// In setup():
server.on("/sensor", handleSensor);
```

Visit `/sensor` in the browser — useful for integrating with dashboards or mobile apps.

## Using mDNS (human-readable hostname)

```cpp
#include <ESPmDNS.h>

// In setup() after WiFi connects:
if (MDNS.begin("esp32lab")) {
  Serial.println("mDNS started: http://esp32lab.local");
}
```

Now you can access the server at `http://esp32lab.local` instead of an IP address.

## Exercises

1. Add a `/data` endpoint that returns temperature + humidity JSON from a DHT22
2. Build an auto-refreshing page (use `<meta http-equiv="refresh" content="5">`) that shows sensor readings
3. Add a slider input (`<input type="range">`) that sets LED brightness via the URL parameter
