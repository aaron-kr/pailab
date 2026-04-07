---
title: "Setting up a TinyML dev environment on Apple Silicon"
title_ko: "Apple Silicon에서 TinyML 개발 환경 설정"
pubDate: 2025-02-28
lang: "en"
tags: ["TinyML", "Setup", "Tutorial"]
summary: "A step-by-step guide to getting TensorFlow Lite for Microcontrollers, Edge Impulse CLI, and Arduino IDE running smoothly on an M-series Mac."
---

Apple Silicon Macs are excellent TinyML development machines — but the toolchain
has enough arm64 / x86_64 gotchas to waste a morning if you don't know where to look.

This is the setup I use in 2025. Everything below has been tested on an M3 MacBook
Pro running macOS Sequoia 15.

## Prerequisites

```bash
# Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python 3.11 via pyenv (avoid system Python)
brew install pyenv
pyenv install 3.11.9
pyenv global 3.11.9
```

## TensorFlow Lite for Microcontrollers

The `tflite-micro` library ships as a pure C++ source tree — no pip package.
Clone it and use the provided Makefile to generate a project for your target.

```bash
git clone https://github.com/tensorflow/tflite-micro.git
cd tflite-micro
make -f tensorflow/lite/micro/tools/make/Makefile \
  TARGET=arduino \
  generate_arduino_zip_library
```

The output `gen/arduino_zip_lib/tensorflow_lite.zip` can be imported directly
into Arduino IDE via **Sketch → Include Library → Add .ZIP Library**.

## Edge Impulse CLI

```bash
npm install -g edge-impulse-cli
edge-impulse-daemon   # follow prompts to connect your device
```

> **Apple Silicon note**: the `edge-impulse-cli` binary includes a bundled
> native addon. If you see an `Unsupported architecture` error, run
> `npm install -g edge-impulse-cli --target_arch=arm64` explicitly.

## Arduino IDE 2.x

Download the `.dmg` directly from arduino.cc — the Homebrew cask sometimes lags
behind. Under **Preferences → Additional Boards Manager URLs**, add the
Nicla Vision and ESP32 board definitions:

```
https://downloads.arduino.cc/packages/package_index.json
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

## Verify the full chain

Connect an Arduino Nicla Vision, open the **ei_image_classification** example from
the Edge Impulse library, and flash. If you see inference output over Serial at
115200 baud, the chain is working end-to-end.
