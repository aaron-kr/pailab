---
title: "AI-aware memory management"
title_ko: "AI 인식 메모리 관리"
course_tag: "C++"
duration: "3 weeks"
description: "Efficient C++ patterns for inference workloads — stack vs. heap, arena allocators, and avoiding dynamic memory on bare-metal targets."
description_ko: "추론 워크로드를 위한 효율적인 C++ 패턴 — 스택/힙, 아레나 할당기, 베어메탈 동적 메모리 회피."
order: 1
---

**Status: `Planned`**

## Who it's for

Any C++ programming course (intermediate level). Students learn efficient memory
patterns that matter for embedded AI — directly applicable to their coursework
*and* a meaningful Physical AI exposure.

## Schedule (3 weeks)

**Week 1** — Memory layout recap; why malloc/free breaks on microcontrollers  
**Week 2** — Arena and pool allocators; TFLite Micro's tensor arena  
**Week 3** — Profiling memory usage; project: port a small classifier to bare-metal C++
