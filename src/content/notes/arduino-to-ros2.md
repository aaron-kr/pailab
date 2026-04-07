---
title: "Arduino to ROS 2: bridging hobbyist hardware and research software"
title_ko: "Arduino에서 ROS 2로: 취미 하드웨어와 연구 소프트웨어 연결"
pubDate: 2025-01-10
lang: "both"
tags: ["Arduino", "ROS 2", "Tutorial", "Physical AI"]
summary: "micro-ROS lets an Arduino publish and subscribe to ROS 2 topics directly over USB or WiFi. Here's how to set it up without losing your mind."
naver_url: "https://blog.naver.com/aaron_kr/arduino-ros2-bridge"
---

ROS 2 is the de-facto standard for robotics research software. Arduino is the
de-facto standard for hobbyist and teaching hardware. The gap between them used to
require a Raspberry Pi acting as a translator. With **micro-ROS**, an Arduino can
be a first-class ROS 2 node.

## What micro-ROS gives you

- Publish and subscribe to ROS 2 topics from bare-metal firmware
- Standard `rcl` / `rclc` API — the same concepts you'd use in a full ROS 2 node
- Transport over USB serial, WiFi UDP, or CAN bus
- Works on Arduino Portenta H7, Teensy 4.x, and ESP32

## Setup (Ubuntu 24.04 + ROS 2 Jazzy)

```bash
# 1 — Install micro-ROS agent on host
pip install catkin_pkg lark-parser empy
sudo snap install micro-ros-agent

# 2 — Add the micro-ROS Arduino library
# In Arduino IDE: Sketch → Include Library → Manage Libraries → search "micro_ros_arduino"

# 3 — Flash the publisher example to your board, then:
micro-ros-agent serial --dev /dev/ttyACM0 --baudrate 115200
```

## Minimal publisher sketch

```cpp
#include <micro_ros_arduino.h>
#include <rcl/rcl.h>
#include <std_msgs/msg/int32.h>

rcl_publisher_t publisher;
std_msgs__msg__Int32 msg;

void setup() {
  set_microros_serial_transports(Serial);
  rcl_init_options_t options = rcl_get_zero_initialized_init_options();
  // ... (full init omitted for brevity — see GitHub example)
  msg.data = 0;
}

void loop() {
  rcl_publish(&publisher, &msg, NULL);
  msg.data++;
  delay(100);
}
```

On the host, `ros2 topic echo /micro_ros_arduino_node_publisher` will print
the incrementing integers in real time.

## Teaching tip

I use this setup in the "Robotic Systems and Control" curriculum track as the
bridge moment: students who have spent weeks with Arduino suddenly see their sensor
data appearing in `rqt_graph` alongside simulated robots. The conceptual gap
between "hobby hardware" and "research robotics" closes visibly.
