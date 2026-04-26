---
title: "NVIDIA Jetson Nano at PAI Lab"
title_ko: "PAI Lab의 NVIDIA Jetson Nano"
description: "How the Jetson Nano fits into the Physical AI Laboratory's edge AI and robotics research pipeline."
description_ko: "PAI Lab의 엣지 AI 및 로봇공학 연구에서 Jetson Nano의 역할."
eyebrow: "RESOURCES · JETSON NANO"
show_in_nav: false
nav_label: "Jetson Nano"
order: 3
---

## NVIDIA Jetson Nano at PAI Lab

The Jetson Nano is planned as the next step in the PAI Lab hardware stack — the first platform
in our curriculum that bridges from microcontrollers to full GPU-accelerated edge AI inference.
Where Arduino and ESP32 handle real-time I/O, the Jetson Nano runs full neural networks on-device.

## Why Jetson Nano?

- **GPU compute** — 128-core NVIDIA Maxwell GPU runs YOLO, segmentation, and depth models at real-time rates
- **Full Linux** — Ubuntu 18/20 via JetPack SDK; Python, apt packages, ROS 2, and SSH access out of the box
- **NVIDIA ecosystem** — TensorRT, CUDA, cuDNN, DeepStream — the same tools used in production edge AI
- **Physical AI target** — run perception models alongside ROS 2 nodes on the same board
- **Natural progression** — Arduino → ESP32 → Jetson Nano is a deliberate complexity ramp in the PAI curriculum

## Hardware Status

> **Planned** — The PAI Lab plans to acquire Jetson Nano units. Lab exercises and curriculum for
> this platform will be developed once hardware is in place.

| Component | Quantity | Status |
|-----------|----------|--------|
| NVIDIA Jetson Nano 4GB Developer Kit | 4 | Planned |
| microSD card (64 GB UHS-1) | 4 | Planned |
| IMX219 Camera Module | 4 | Planned |
| 5V 4A DC barrel power supply | 4 | Planned |
| Jetson Nano case + cooling fan | 4 | Planned |

## Planned Curriculum

- **[Jetson Nano: GPU-Accelerated Physical AI](/curriculum/track-07-jetson)** — a planned 8-unit track
  from initial JetPack setup through real-time neural inference on robot platforms

## Use Cases in PAI Lab Research

Once hardware is available, the Jetson Nano is planned for:

- Real-time object detection (YOLO) on mobile robot platforms
- On-device TensorRT model optimization and inference benchmarking
- ROS 2 perception nodes running alongside sensor fusion pipelines
- Side-by-side benchmarks with ESP32 TFLite micro models — same task, different hardware
- Student research projects requiring GPU compute without cloud dependence

## Jetson Nano vs. Other Lab Platforms

| Feature | Arduino Uno | ESP32 | Jetson Nano |
|---------|------------|-------|-------------|
| Processing | 16 MHz AVR | 240 MHz dual-core Xtensa | 1.43 GHz quad-core ARM |
| GPU | None | None | 128-core NVIDIA Maxwell |
| OS | None (bare metal) | FreeRTOS / bare | Ubuntu Linux |
| Python | No | MicroPython | Full CPython 3 |
| ROS 2 | No | No | Yes |
| Best for | Simple I/O, beginner | IoT, wireless, edge ML | Neural inference, robotics |
