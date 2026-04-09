---
title: "What is Physical AI? A working definition for educators"
title_ko: "피지컬 AI란? 교육자를 위한 작업 정의"
pubDate: 2025-03-15
lang: "both"
tags: ["Physical AI", "Education", "Opinion"]
summary: "The term 'Physical AI' is everywhere in 2025 — but what does it actually mean for someone designing a university curriculum? A working definition and framework."
summary_ko: "2025년 '피지컬 AI'라는 용어가 넘쳐나지만, 대학 커리큘럼을 설계하는 사람에게 실제로 무엇을 의미할까요?"
naver_url: "https://blog.naver.com/aaron_kr/physical-ai-definition"
featuredImage: "/hero.jpg"
---

The term *Physical AI* appears in every vendor keynote and research call-for-papers in 2025 — NVIDIA's Jensen Huang uses it, robotics labs use it, and now Korean ministry grant applications are starting to use it too. But when I sit down to build a curriculum around it, the term gets slippery fast.

Here is the definition I've settled on for teaching purposes:

> **Physical AI** is machine intelligence that perceives, reasons about, and acts within the physical world in real time, typically on or near the hardware doing the sensing and actuation.

Three words do the heavy lifting: *perceives*, *acts*, and *real time*. A model that classifies images in the cloud is not Physical AI. A model that runs on a microcontroller attached to a robot arm, reads a sensor, and moves a servo in response — that is.

## Why "Physical" and not "Embodied"?

Embodied AI is the older academic term and carries strong connotations from cognitive science: it implies a body, proprioception, environmental coupling. Physical AI is the industrial/engineering framing — it emphasises the hardware constraints (power budget, latency, memory), the deployment context (edge, embedded, real-time OS), and the feedback loop with the physical world.

For curriculum design, "Physical AI" maps more directly to what students will *build*: sensors, actuators, constrained inference, and control loops.

## Three axes for curriculum design

When I plan a track or module, I ask where the content sits on three axes:

1. **Perception → Action**: Is this primarily about sensing the world, reasoning about it, or changing it?
2. **Cloud → Edge → Bare-metal**: Where does inference happen?
3. **Prototype → Production**: Are we exploring possibilities or engineering reliability?

Most university courses live in the upper-left corner (perception, cloud, prototype). Physical AI curriculum deliberately pulls toward the lower-right: actuation, bare-metal, production-grade thinking.
