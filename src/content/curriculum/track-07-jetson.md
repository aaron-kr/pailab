---
title: "Jetson Nano: GPU-Accelerated Physical AI"
title_ko: "Jetson Nano: GPU 가속 피지컬 AI"
track: "07"
level: "advanced"
units: 8
bilingual: false
description: "From JetPack setup to real-time neural inference — run YOLO, segmentation models, and ROS 2 nodes on NVIDIA Jetson Nano."
description_ko: "JetPack 설정부터 실시간 신경망 추론까지 — NVIDIA Jetson Nano에서 YOLO, 세그멘테이션 모델, ROS 2 노드를 실행합니다."
order: 7
---

> **Coming Soon** — This track is under development and requires Jetson Nano hardware
> (currently planned for acquisition). Unit pages will be added once hardware is available.

## Prerequisites

- [Arduino: Foundations of Physical Computing](/curriculum/track-05-arduino) — hardware I/O fundamentals
- [ESP32: IoT and Wireless Physical AI](/curriculum/track-06-esp32) — networked edge systems
- Python 3 proficiency (functions, classes, NumPy basics)
- Familiarity with Linux terminal (file system, apt, SSH)

## What You Will Build

By the end of this track, students will have:

- A working JetPack development environment with GPU-verified CUDA
- A real-time object detection pipeline (YOLOv8 via TensorRT) running at ≥ 15 FPS
- A ROS 2 perception node publishing detected object poses to a robot platform
- A benchmark comparison: ESP32 TFLite micro vs. Jetson Nano TensorRT for the same task

## Planned Unit Outline

| Unit | Title | Focus |
|------|-------|-------|
| 01 | JetPack Setup & GPIO | OS install, CUDA verify, LED/sensor via Jetson.GPIO |
| 02 | Python Computer Vision | OpenCV, camera capture, frame processing |
| 03 | TFLite on Jetson CPU | Run a MobileNet model, measure latency |
| 04 | TensorRT Optimization | Convert TFLite → TensorRT, GPU acceleration |
| 05 | YOLOv8 Real-Time Detection | Object detection pipeline at camera frame rate |
| 06 | ROS 2 on Jetson Nano | Install ROS 2 Humble, publish/subscribe basics |
| 07 | Perception Node | Publish detection results as ROS 2 topics |
| 08 | Capstone Project | Mobile robot with vision-guided navigation |
