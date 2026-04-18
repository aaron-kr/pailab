---
title: "Physical AI Lab — Looking Ahead"
title_ko: "피지컬 AI 연구소"
pubDate: 2026-04-10
lang: "en"
tags: ["Physical AI", "Education", "Opinion"]
private: true
---

Your CV is actually surprisingly well-positioned for Physical AI — more than you might think.

## 1. Your CV → Physical AI: What Transfers Directly

Your existing work maps into Physical AI along three threads:

* **Thread A** — On-Device Vision & Inference (your strongest thread)
Your CNN/OCR thesis work, the ACGAN dataset supplementation papers, mask detection with OpenCV, and handwritten grapheme classification all have direct Physical AI descendants. The natural extension is: _same models, deployed at the edge, on real hardware._ Your Interactive Dataset Builder paper (July 2025) is practically already a Physical AI tools paper — just needs hardware-side context added.
* **Thread B** — Physical Systems & Sensing (your teaching gives you this)
Your Autonomous Driving & ML course, IoT course, Imaging-Based Medical Device Manufacturing, Computer-Aided Diagnosis, Circuit Theory I/II, and the Python for Robotics special course are all Physical AI-adjacent. These aren't just teaching — they're credibility that you work at the intersection of code and hardware.
* **Thread C** — Education & Methodology (your differentiator)
Your GitHub Classroom/Codespaces papers, AI in Education papers, and the cross-cultural AI perception paper establish you as someone who studies _how_ AI is taught and adopted — which feeds directly into your landscape paper and makes your lab unique: you're not just doing Physical AI, you're studying how it's taught and structured.

**Specific papers you can directly extend or cite in Physical AI work:**

| Existing Paper | Physical AI Extension |
|----------------|-----------------------|
| CNN-Based Handwriting Recognition (PhD) | On-device OCR for embedded/robotic annotation systems |
| ACGAN for Manchu Dataset Supplementation | Synthetic data pipelines for physical sensor training sets |
| Interactive Dataset Builder (2025) | Physical AI dataset tooling; add ROI via camera feed |
| Mask Wearing Detection (OpenCV) | Real-time edge vision for physical sensing systems |
| Hangul Grapheme Classification (ANN) | Embedded model comparison on constrained hardware |
| GitHub Classroom / Codespaces papers | Lab infrastructure methodology for Physical AI courses |
| AI in Education (Cross-Cultural) | Physical AI education adoption study |
| Systematic Review of Hangul OCR | Template for your landscape paper methodology |

## 2. Course Plugin Modules — Comprehensive Table

Based on your current and recent courses at courses.aaron.kr:

| Course | Proposed Physical AI Module | Type | Difficulty | Notes | 
|--------|-----------------------------|------|------------|-------|
| IoT (교통대) | Sensor-to-Model Pipeline: collect data → train → deploy on device | Lab module | ★★★ | Core Physical AI use case | 
| IoT | MQTT + Edge Inference: real-time sensor triggers ML decision | Lab module | ★★★ | Publishable benchmark | 
| Autonomous Driving & ML (교통대) | Jetson Nano lane detection deployment | Lab module | ★★★★ | Direct NVIDIA tie-in | 
| Autonomous Driving & ML | Sim-to-Real gap measurement (CARLA → physical) | Research module | ★★★★ | Immediate paper potential | 
| Python ML (전북대) | Edge inference: PyTorch Lite / ONNX on Raspberry Pi | Lab module | ★★★ | Budget-friendly | 
| Python ML | Physical dataset collection pipeline (camera + labeling) | Lab module | ★★ | Pairs with dataset builder paper | 
| Deep Learning Applications (교통대) | TensorRT optimization for Jetson | Lab module | ★★★★ | NVIDIA ecosystem | 
| Medical Image Processing (교통대) | Physical sensor → medical image pipeline (ultrasound/microscope) | Research module | ★★★★★ | Strong journal angle | 
| Computer-Aided Diagnosis (교통대) | CAD on embedded device: latency/accuracy benchmarks | Lab module | ★★★★ | Extends existing CAD work | 
| Imaging-Based Medical Devices (교통대) | Physical device integration: camera calibration + inference | Lab module | ★★★★ | Hardware + CV | 
| C++ Programming (한밭대) | Embedded C++ for microcontrollers (Arduino/STM32) | Supplement module | ★★ | Natural bridge | 
| Advanced C Programming (한밭대) | C for real-time sensor interrupt handling | Supplement module | ★★★ | Low-level Physical AI | 
| Circuit Theory I/II (전북대) | Sensor circuit design → data acquisition → ML | Bridge module | ★★★ | Unique interdisciplinary angle | 
| Convergence Power Electronics (전북대) | Motor control + ML feedback loop | Research module | ★★★★★ | Rare crossover, high novelty | 
| Semiconductor Science (전북대) | Edge chip selection guide: MCU vs GPU vs NPU | Conceptual module | ★★ | Context-setting, good for paper | 
| Data Science (교통대) | Physical data collection methodology + EDA | Foundation module | ★★ | Feeds all other modules | 
| Database Design (교통대) | IoT time-series database design (InfluxDB / TimescaleDB) | Lab module | ★★★ | Physical AI data layer | 
| Secure Coding / Web Hacking (대전대) | Physical AI security: adversarial attacks on deployed models | Research module | ★★★★ | Growing niche, publishable | 
| Information Society & Software (전주교육대) | Physical AI literacy for K-12 teachers (Entry/Scratch robots) | Curriculum module | ★ | Education paper angle | 
| Arduino (site section) | Full Arduino → ML pipeline: sense → infer → actuate | Flagship module | ★★★ | Your existing Arduino content + AI |
| Capstone (site section) | Physical AI capstone project framework | Project module | ★★★ | Structured deliverable for students |

## 3. NVIDIA Jetson / Edge AI Coursework — How to Use It

This is a smart move. Here's how to approach it strategically rather than just as self-study:

**Recommended learning path:**

1. **Jetson AI Fundamentals** (free, NVIDIA DLI) — start here; covers camera pipelines, inference, deployment basics
2. **Getting Started with AI on Jetson Nano** — the flagship course; hands-on and directly publishable
3. **Disaster Risk Monitoring with Satellite Imagery** — good for understanding physical sensor pipelines
4. **Building Video AI Applications at the Edge** — directly relevant to your camera-based prior work

**How to leverage this beyond self-study:**

* Document your learning process as blog posts on the lab site ("NVIDIA DLI Week 1: What I learned about latency on the Nano"). Students love seeing instructors learn publicly.
* Use the completion certificates as **lab credentials** on the site — they signal you're current.
* Assign parallel modules to students: you do Jetson, student does Raspberry Pi 5, another does Google Coral. Compare results → instant comparative paper.
* The NVIDIA Jetson ecosystem ties directly into your Autonomous Driving & ML and Deep Learning courses — you can fold what you learn into those courses immediately.


## 4. "Mapping the Physical AI Landscape in Education" — Paper Tips

This is a well-timed and well-scoped idea. A few things that will make it stronger:

**Framing:** Don't just call it a survey. Frame it as a **systematic mapping study** (Petersen et al. methodology) — it's more citable and methodologically defensible than a literature review. The distinction: you're not just reviewing what exists, you're building a classification schema and mapping the field.

**Database construction tips:**

* Use Google Sheets as your primary database, publicly linkable — reviewers appreciate transparency.
* Key columns: Country, Institution Type (R1/teaching/polytechnic), Course Level (UG/MS/PhD), Delivery Format (dedicated course / module / lab), Hardware Used, Software Stack, Assessment Method, Year Introduced, Language of Instruction, Open Resources (Y/N).
* Target **150–200 course entries** minimum for the map to feel comprehensive. Anything under 100 feels thin for a landscape paper.
* Use **Google Scholar, Scopus, and direct university catalog searches** systematically. Also check IEEE Education, ACM SIGCSE proceedings, and ASEE (American Society for Engineering Education) — lots of curriculum papers there.

S**tructure suggestion:**

1. **Introduction** — why map Physical AI in education now?
2. **Methodology** — search strategy, inclusion/exclusion criteria, database schema
3. **Findings** — geographic distribution, hardware trends, curriculum maturity
4. **Discussion** — gaps, opportunities, recommendations
5. **Conclusion** — your lab's positioning within the landscape (subtle but legitimate)

**Differentiator:** Add a **Korea-specific subsection.** You're uniquely positioned to characterize Korean Physical AI education in English for an international audience. No one else is doing this.

**Timeline for June:** This is tight but doable if the survey work starts now. Aim to have your database locked by end of April, analysis done in May, writing in late May / early June.

## 5. Publishing Pathway: KCI/Scopus → SCIE

**Immediate targets (now → 18 months):**

| Tier | Venue Examples | Cost | Notes |
|------|----------------|------|-------|
| KCI domestic | JPEE, JICCE, KLife Journal | Free–₩300K | Your home base; fast turnaround | 
| Scopus (low APC) | Education and Information Technologies, MDPI Education Sci. | $500–1,500 | Achievable without funding | 
| Scopus (mid) | IEEE Access, Sensors (MDPI) | $1,000–2,000 | Target once you have one solid result | 
| SCIE target | IEEE Trans. Learning Technologies, Robotics and Autonomous Systems | $0–3,000 | 2–3 year horizon | 

**Strategy for moving up tiers:**

* **One strong result first.** Don't spread across venues until you have one paper with a clean contribution that others cite.
* **Align with your edge/embedded CV work** when targeting SCIE — your best shot is IEEE-family journals where your Computer Vision + hardware combination is valued.
* **Co-author with a SCIE-active researcher.** Even one co-author at an R1 Korean university (KAIST, POSTECH, SNU, or even other Hanbat faculty in ICE) dramatically improves your acceptance rate.


## 6. Funding & Grants — Comprehensive Map

**Korea (most accessible for you now):**

| Grant | Agency | Amount | Eligibility | Notes |
|-------|--------|--------|-------------|-------|
| 기본연구 (Basic Research) | NRF (한국연구재단) | ₩50–150M/yr | Non-tenured OK if affiliated | Requires university affiliation; lecturer may qualify at some institutions | 
| 신진연구 (Young Researcher) | NRF | ₩80–150M/yr | Within 7 years of PhD | You're 2024 PhD — apply by 2030; this is your primary target | 
| 학문후속세대 지원 | NRF | ₩30–60M/yr | Postdoc/early career | Lower bar, good starting point | 
| 산학협력 R&D | IITP / KIAT | Variable | Industry partner required | Physical AI has many industry partners (Samsung, Hyundai, LG) | 
| 교육부 교육연구 | MOE (교육부) | ₩30–100M | Education-focused research | Your education + AI angle fits well here | 
| 지역혁신 R&D (전북/충남) | Regional governments | ₩20–80M | Located in region | Jeonbuk and Daejeon both have innovation funds | 
| TIPS Program | MSIT / TIPA | Up to ₩1B | Startup/commercialization | Long shot but possible if lab spins out a tool | 

**Key note on NRF:** As a lecturer (강사) without a tenured position, your primary affiliation university must sponsor the grant application. This is the main hurdle. Worth having a direct conversation with the research office at one of your universities — Hanbat or JBNU are your best bets given depth of relationship.

**United States (as a US citizen researching abroad):**

| Grant | Agency | Amount | Notes |
|-------|--------|--------|-------|
| NSF OISE (Office of International Science) | NSF | $50–300K | Specifically funds US researchers abroad; your situation is ideal | 
| Fulbright Scholar Program | US DoS / CIES | Stipend + benefits | Teaching/research in Korea; you may already qualify | 
| NEH Fellowship | NEH | ~$60K | Your Manchu/Hangul cultural-heritage + AI angle could fit | 
| DARPA SBIR/STTR | DoD | $150–1.5M | Very hard without a US entity, but possible with a collaborator | 

**NSF OISE is your strongest US angle.** It's designed exactly for US researchers conducting research internationally. Your Physical AI + education + Korea context is a compelling proposal frame.

**International:**

| Grant | Body | Notes | 
|-------|------|-------|
| JSPS Bilateral | Japan Society for Promotion of Science | Korea-Japan joint research; find a Japanese collaborator | 
| EU Horizon (Marie Curie) | European Commission | Requires EU host institution; possible with a collaborator | 
| IEEE Foundation Grants | IEEE | Small grants ($5–20K); good for equipment and conference travel | 
| Google Research Scholar | Google | ~$60K unrestricted; highly competitive but worth applying | 
| NVIDIA Academic Hardware Grant | NVIDIA | Free Jetson hardware; apply immediately — low bar, high return | 

**The NVIDIA Academic Hardware Grant is low-hanging fruit.** Apply now. Even getting 2–3 Jetson Nanos for free is a major lab resource, removes cost barriers for students, and gives you a direct relationship with NVIDIA's academic program.

## Master Roadmap — Everything Together

```
NOW (April 2026)
├── Apply: NVIDIA Academic Hardware Grant
├── Start: "Mapping Physical AI Landscape" database (Google Sheets)
├── Begin: NVIDIA DLI Jetson Fundamentals course
├── Draft: Lab mission statement + site About page
└── Soft-recruit: 2–3 students informally

MAY 2026
├── Lock landscape paper database (150+ entries)
├── Assign parallel edge device projects (Jetson / Pi / Coral)
├── Submit: Interactive Dataset Builder paper (July 2025 conf)
└── Begin analysis for landscape paper

JUNE 2026
├── Submit: "Mapping Physical AI Landscape" → inaugural journal issue
├── Lab site goes live
└── First blog post published

SUMMER 2026
├── Formal student recruitment (4–6 students for Fall)
├── Write: 1 short paper from device comparison project
├── Apply: NRF 신진연구 (deadline usually September)
└── Apply: NSF OISE (deadline varies; check current cycle)

FALL 2026
├── Students start; weekly standups
├── 2-3 parallel projects running
├── Apply: Fulbright Scholar (deadline October for following year)
└── Target: 1 Scopus submission by December

WINTER BREAK 2026–27
├── Paper writing sprint
├── 1 KCI + 1 Scopus paper submitted
└── Plan SCIE target for 2027
```

The single most important near-term action outside the paper: **apply to the NVIDIA Academic Hardware Grant today.** It costs nothing, gives you real equipment to work with, and makes every other step easier.