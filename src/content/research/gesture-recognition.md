---
title: "Real-time gesture recognition for embedded robotic control"
title_ko: "임베디드 로봇 제어를 위한 실시간 제스처 인식"
authors: "A. Snowberger, K. Park"
venue: "IEEE ICTC"
year: 2024
status: "published"
doi: "https://doi.org/10.1109/ictc.2024.example"
tags: ["Physical AI", "Robotics", "Edge ML"]
featured: true
---

This paper presents a real-time gesture recognition pipeline optimized for
deployment on resource-constrained embedded hardware used in robotic control
systems. We demonstrate sub-50ms inference latency on an Arduino Nicla Vision
using a lightweight MobileNet-V2 variant, enabling reactive closed-loop control
without offloading to a host computer.

## Key contributions

- A hardware-aware pruning strategy reducing model size by 73% with <2% accuracy loss
- A labeled gesture dataset (1,200 samples, 6 gestures) released under CC-BY 4.0
- Benchmarks on Arduino Nicla Vision, Raspberry Pi Zero 2W, and ESP32-S3
