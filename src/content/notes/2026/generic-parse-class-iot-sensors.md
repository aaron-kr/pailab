---
title: "The Importance of a Generic `Parse` Class for IoT Sensors"
title_ko: ""
category: "edge-ai"
pubDate: 2026-05-11
updated:
lang: "en"
tags: ["IoT", "Sensors", "Standardization", "ESP32", "Parsing data"]
summary: "JSON objects that track IoT sensor data are most useful when standardized."
naver_url: "https://blog.naver.com/aaron_kr/224286383367"
---

I'm teaching an <mark>ESP32 IoT course</mark> in both [Korean](https://courses.aaron.kr/courses/2026/ut-iot/) and [English](https://courses.aaron.kr/courses/2026/jbnu-devs/). The [textbook](https://www.yes24.com/Product/Goods/141217787) includes a link to purchase an [ESP32 Board](https://smartstore.naver.com/iotmaker-kr/products/12299892914) with 8 shields and various sensors.

## Problem

The author's code references several different sensors with <ins>non-standardized code</ins>. Although there is a `Parse` class to extract JSON data from the various sensors, using non-standardized code means that there are many `if-else` blocks needed to `_arrange_data()` properly.

For example, the [`sensor_dictionary.py`](https://github.com/aaronkr-courses/esp32-iotmaker/blob/main/micropython/9_1_sensor_dictionary.py) provides JSON data like this:

```python
# gpio에 연결
value_dht22 = {
    'DHT22': {
        'Temperature': 23.5,
        'Humidity': 45
    },
    'TempUnit': 'C'    
}

# OnwWire에 여러 개의 센서 연결
value_ds18b20 = {
    'DS18B20_1': {
        'Temperature': 20.5,
        'Humidity': 54
    },
    'DS18B20_2': {
        'Temperature': 25.5,
        'Humidity': 50
    },
    'TempUnit': 'C'    
}

# I2C에 연결
value_bh1750 = {
    'BH1750': {
        'Brightness': 55
    }
}
```

An example of parsing the DHT22 Sensor data can be seen below, and the full `parse.py` code is [available online](https://github.com/aaronkr-courses/esp32-iotmaker/blob/main/utilities/parse.py):

```python
def main():
    import pinno as P
    from parse import Parse

    sensor = DHT22Sensor(P.DHT, ser="001")  # 예시로 "001"을 ser에 입력
    while True:        
        data = sensor.read()
        print(data)
        p = Parse(data)
        print(f'name: {p.name}, {p.keys[0]}: {p.values[0]}, {p.keys[1]}: {p.values[1]}, TempUnit: {p.temp_unit}')

        time.sleep_ms(5000)
```

This code will work as is, but it has problems:

- Sensor names always are expected to be top-level keys
- `TempUnit` is special-cased
- OneWire and DS18B20 get special variables: `ow_id`, `ow_keys`, `ow_values`
- It does not nautrally support per-value units
- It makes it more difficult to standardize and use with:
   - MQTT
   - JSON uploads
   - Node-RED
   - ThinkSpeak
   - Other platforms that process JSON data

## Solution

Therefore, I have created a [`better_parse.py`](https://github.com/aaronkr-courses/esp32-iotmaker/blob/main/utilities/better_parse.py) file that parses data from standardized JSON formatted sensor files. This will keep the sensor data much closer to a real IoT payload. 

For example:

```python
data = {
    "sensor": "temperature",
    "values": {
        "current": 22.5,
        "min": 18.0,
        "max": 25.0
    },
    "unit": {
        "current": "°C",
        "min": "°C",
        "max": "°C"
    },
    "timestamp": 1625247600
}
parse = Parse(data)
print(parse.name)  # Output: temperature
print(parse.get("current"))  # Output: 22.5
print(parse.get_unit("current"))  # Output: °C
```

This **generic sensor parser** is better for the following reasons:

- It works with <ins>ANY</ins> sensor that follows the same JSON stucture
- It works with all existing sensors (if the JSON structure is updated), and any future sensors that may be added
- It works for single-value and multi-value sensors
- It uses a consistent parsing API, and dynamically extracts:
   1. `sensor` name
   2. keys
   3. `values`
   4. `units`
   5. metadata

Updating all of the above sensor data to the new standardized format looks like this:

```python
sensors = [
    {
    "sensor": "DHT22",
    "values": {
        "Temperature": 25.6,
        "Humidity": 45
    },
    "units": {
        "Temperature": "C",
        "Humidity": "%"
    },
    "timestamp": 123456789
    },
    {
    "sensor": "BH1750",
    "values": {
        "Lux": 352
    },
    "units": {
        "Lux": "lx"
    },
    "timestamp": 123456789
    },
    {
    "sensor": "DS18B20",
    "values": {
        "Temperature": 24.1
    },
    "units": {
        "Temperature": "C"
    },
    "timestamp": 123456789
    }
]
```

Now we can use the same format for every sensor and a single, simpler, `parse.py` file to extract the data. This will make collecting data from our IoT devices much simpler. It will also future-proof our code so that we can add any number of extra sensors in the future without drastically updating the code.