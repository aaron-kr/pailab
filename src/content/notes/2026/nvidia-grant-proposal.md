---
title: "NVIDIA Academic Grant Program - Proposal Draft"
title_ko: "피지컬 AI 연구소"
pubDate: 2026-04-10
lang: "en"
tags: ["Physical AI", "Education", "NVIDIA"]
private: true
---

**PI: Aaron Snowberger · Physical AI Lab · April 2026**

> **Eligibility note:** The main program requires full-time faculty at a PhD-granting institution. Recommend listing a full-time professor at Hanbat or JBNU as nominal PI, with you as co-PI. Alternatively, the NVIDIA Inception Program has no faculty requirement and grants hardware discounts + software access immediately.

#### Section 1

## Project Title

**Edge-Deployed Physical AI for Engineering Education: Benchmarking On-Device Inference Pipelines on NVIDIA Jetson Hardware**

#### Section 2

## Research Overview (300 words)

This project establishes a Physical AI research lab at the intersection of embedded hardware, on-device inference, and engineering education at universities in Daejeon and Jeonju, South Korea. The lab's founding research agenda addresses a critical gap: while AI model development is well-documented, the deployment of trained models onto physical, resource-constrained hardware for real-world tasks remains understudied — particularly in educational and low-budget settings common in East Asian universities.

Our work builds directly on prior published research in CNN-based handwritten character recognition (Hanbat National University PhD, 2024), computer vision for physical detection tasks (mask-wearing detection, OpenCV), and generative model pipelines for dataset supplementation (ACGAN). We now extend this body of work toward the edge: deploying trained vision models onto NVIDIA Jetson hardware, systematically benchmarking latency, accuracy, and thermal performance, and documenting the workflow as reproducible curriculum modules for engineering students.

The proposed hardware (Jetson Orin Nano Developer Kit × 2, Jetson Nano × 1) will directly support three parallel research threads: (1) sim-to-real gap measurement for robotic perception tasks, (2) edge inference benchmarking for medical image processing using models trained in our existing CAD and imaging courses, and (3) the development of open Physical AI curriculum modules for deployment at five partner universities. All work will be conducted with 4–6 undergraduate and graduate student researchers and is expected to produce 2–3 peer-reviewed publications within 12 months, with NVIDIA technology acknowledged in all resulting papers.

#### Section 3

## NVIDIA Technology Alignment

Our lab's research is built around the NVIDIA Jetson ecosystem as the primary deployment platform. Specifically, we will use:

* **JetPack SDK** — as the unified software foundation for all edge deployment work, enabling TensorRT-optimized inference and CUDA-accelerated training pipelines.
* **TensorRT** — for model optimization and quantization benchmarks comparing FP32, FP16, and INT8 performance on Jetson hardware under real workload conditions.
* **NVIDIA TAO Toolkit** — for transfer learning and fine-tuning of pretrained vision models (from NGC) against our existing handwritten character and medical image datasets.
* **Pretrained models from ai.nvidia.com (NGC)** — we will use NVIDIA's pretrained object detection and segmentation models as baselines for our sim-to-real and edge benchmarking experiments, adapting them to our physical lab tasks.
* **NVIDIA DLI courseware** — the PI is currently completing the "Getting Started with AI on Jetson Nano" DLI course, and student researchers will complete DLI certifications as part of the lab onboarding process.

#### Section 4

## Requested Hardware

* **Jetson Orin Nano Developer Kit (8GB) × 2** — primary research and benchmarking units; used for edge inference, TensorRT optimization work, and student project deployment.
* **Jetson Nano Developer Kit (4GB) × 1** — comparison baseline for latency/performance benchmarking against Orin; also serves as the lowest-cost-tier reference for curriculum development targeting budget-constrained universities.

<small>Edge inference | TensorRT | Computer vision | Curriculum development | Korea / international</small>

#### Section 5

## Expected Outputs & NVIDIA Acknowledgment Plan

Within 12 months of hardware receipt, the lab commits to:

* 2–3 peer-reviewed publications acknowledging NVIDIA Corporation and specifying Jetson hardware used
* 1 open-source curriculum module repository (GitHub) covering Physical AI deployment on Jetson, freely available to Korean and international educators
* 1 public blog post series (lab website) documenting the Jetson setup, benchmarking results, and DLI learning process
* Submission of at least one paper to an IEEE-family venue (IEEE Access or equivalent) on edge inference performance benchmarks
* Consideration of a GTC poster submission in 2027 presenting curriculum outcomes

#### Alternative if main program is ineligible

**NVIDIA Inception Program**

No faculty requirement. Open to research labs, startups, and independent research groups. Benefits include hardware discounts (up to 25% off Jetson), software access, and co-marketing opportunities. Apply at nvidia.com/inception — takes ~15 minutes.

**NVIDIA DLI Educator Program**

Free teaching kits and curriculum resources for faculty teaching AI/DL courses. You already have course contexts (Autonomous Driving & ML, Python ML, Deep Learning Applications) that qualify directly.

**A few things to do alongside this draft:**

* **Before submitting:** Have a conversation with one full-time faculty member at Hanbat or JBNU — ideally someone in the ICE or CS department who has submitted grants before. Frame it as: "I'm leading the work, you're the institutional sponsor." Many faculty are willing to do this since it costs them nothing and adds a publication credit. Your existing advisor relationship with Prof. Lee at Hanbat makes him the natural first ask.
* **For the Inception Program** (apply regardless, even if you pursue the main grant): go to nvidia.com/inception, select "Academic Research Lab" as your org type, and describe the lab in 2–3 sentences. You'll get approved within a few days and immediately unlock hardware discounts — which matters if you end up buying Jetson hardware yourself before a grant comes through.
* **One line to add to the proposal** that will strengthen it significantly: mention that you are the International Director of KLife (한국생활과학학회) and Managing Director of KIICE — these give you a built-in publication and dissemination pathway that most grant applicants can't claim. NVIDIA reviewers look for evidence that results will actually reach an audience.