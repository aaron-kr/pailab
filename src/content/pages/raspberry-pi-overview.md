---
title: "Raspberry Pi at PAI Lab"
title_ko: "PAI Lab의 라즈베리 파이"
description: "The Raspberry Pi as a Linux-based physical computing and prototyping platform at PAI Lab."
description_ko: "PAI Lab에서 Linux 기반 피지컬 컴퓨팅 및 프로토타이핑 플랫폼으로서의 라즈베리 파이."
eyebrow: "RESOURCES · RASPBERRY PI"
show_in_nav: false
nav_label: "Raspberry Pi"
order: 4
---

## Raspberry Pi at PAI Lab

The Raspberry Pi occupies a different niche from both Arduino/ESP32 (microcontrollers) and the
Jetson Nano (GPU-accelerated inference). It is a full Linux single-board computer — ideal for
projects that need a flexible developer environment, rich networking, and broad library support
without specialized GPU hardware.

## Why Raspberry Pi?

- **Full Linux** — Raspberry Pi OS (Debian-based); Python, apt, SSH, git, and the entire Linux ecosystem
- **GPIO compatibility** — 40-pin header bridges the gap between microcontrollers and a full OS
- **Networking** — built-in Wi-Fi and Ethernet; ideal for IoT dashboards, MQTT brokers, and networked sensing
- **Camera support** — CSI camera connector, PiCamera library, OpenCV integration
- **Community** — the largest single-board computing community; answers exist for virtually every problem
- **Affordable** — Pi 4 (8 GB) and Pi 5 offer substantial compute at low cost

## Raspberry Pi vs. Other Lab Platforms

| Feature | Arduino Uno | ESP32 | Raspberry Pi 4 | Jetson Nano |
|---------|------------|-------|----------------|-------------|
| OS | None | FreeRTOS / bare | Linux (Debian) | Ubuntu + JetPack |
| Python | No | MicroPython | Full CPython 3 | Full CPython 3 |
| Wi-Fi | No | Built-in | Built-in | Via USB adapter |
| GPU | None | None | VideoCore VI | 128-core NVIDIA |
| GPIO pins | 14 digital | 34 | 28 | 40 |
| Best for | Simple I/O | IoT + BLE + edge ML | General Linux, CV | Neural inference |

## Hardware in the Lab

| Component | Quantity |
|-----------|----------|
| Raspberry Pi 4 (4 GB) | 2 |
| microSD cards (32 GB) | 4 |
| Camera Module v2 (8 MP) | 2 |
| Sense HAT | 1 |

## Related Curriculum

There is currently no dedicated Raspberry Pi curriculum track at PAI Lab. For students interested
in Linux-based physical computing, the recommended path is:

1. Complete [Arduino: Foundations of Physical Computing](/curriculum/track-05-arduino) for hardware fundamentals
2. Complete [ESP32: IoT and Wireless Physical AI](/curriculum/track-06-esp32) for networked sensing
3. Then work with Raspberry Pi independently — Python GPIO (`RPi.GPIO`, `gpiozero`), OpenCV, and
   Flask/FastAPI for sensor dashboards are all direct extensions of ESP32 IoT skills

## Raspberry Pi for Edge AI

The Raspberry Pi can run lightweight edge AI models via:

- **TFLite** — TensorFlow Lite runs on the Pi CPU; suitable for small models
- **Coral USB Accelerator** — Edge TPU module adds hardware ML inference via USB
- **OpenCV DNN** — MobileNet and similar models run well on Pi 4/5 with OpenCV

For models that require a GPU, the [Jetson Nano](/pages/jetson-nano-overview) is the next step.
