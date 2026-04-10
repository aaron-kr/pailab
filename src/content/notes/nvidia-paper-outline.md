---
title: "PAI Landscape Paper Outline"
title_ko: "피지컬 AI 연구소"
pubDate: 2026-04-10
lang: "en"
tags: ["Physical AI", "Education", "Curriculum"]
---

**Paper title**

Mapping the Physical AI Landscape in Education

**Target venue**

한국피지컬AI학회 Journal, inaugural issue (June 2026)

**Paper type**

Systematic mapping study

**Target length**

6,000–9,000 words + database appendix

* **Now → Apr 30** - Build survey database (target 150+ entries). Lock inclusion/exclusion criteria.
* **May 1–15** - Run analysis: geographic distribution, hardware trends, curriculum maturity scoring.
* **May 15–31** - Full draft written. Internal review.
* **Early June** - Submit to inaugural issue.

## 1 Introduction ~600 words

Why Physical AI in education, and why map it now? Establish the stakes: the field is moving fast, university curricula are lagging, and there is no consolidated reference for educators or policymakers building programs.

* Define "Physical AI" for the paper's purposes (AI that acts on or through physical systems — distinct from pure software AI)
* Distinguish from adjacent terms: embodied AI, cyber-physical systems, robotics education, edge AI
* State the research questions: Where is Physical AI being taught? What hardware/software stacks dominate? What gaps exist? How does Korea compare globally?
* Brief note on your positionality as founder of the first Korean Physical AI academic society journal

## 2 Methodology ~800 words
Frame this explicitly as a systematic mapping study (cite Petersen et al. 2008 as your methodological anchor — it's the canonical reference). This framing is more defensible than "literature review" and more appropriate for a field survey.

* **Search strategy:** Google Scholar, Scopus, IEEE Xplore, ACM DL, ASEE PEER, direct university catalog searches (Google: "physical AI course" site:edu, etc.)
* **Search terms:** "physical AI," "embodied AI curriculum," "edge AI education," "robotics AI course," "Jetson education," "cyber-physical systems course"
* **Inclusion criteria:** University-level course or program, identifiable institution, taught 2018–2026, primary focus on AI + physical systems
* **Exclusion criteria:** K-12 only, purely theoretical (no hardware component), non-degree training programs
* **Database schema:** Country, Institution, Institution Type, Course Level, Delivery Format, Hardware Stack, Software Stack, Assessment Method, Year Introduced, Language, Open Resources (Y/N), Source URL
* **Validation:** Two-pass review; flag ambiguous entries; note entries confirmed vs. inferred

## 3 Results — Global Landscape ~1,800 words

Present the database findings. Use figures: a world map of course density, bar charts of hardware stack frequency, a timeline of course introductions by year.

* **3.1 Geographic distribution** — where is Physical AI being taught? Likely heavy in US, EU, East Asia. Map it.
* **3.2 Institution type** — R1 research universities vs. teaching-focused vs. polytechnics. Who is leading?
* **3.3 Curriculum maturity** — dedicated programs vs. modules vs. elective courses. Propose a 3-level maturity model (Module → Course → Program).
* **3.4 Hardware ecosystems** — NVIDIA Jetson, Raspberry Pi, Arduino, ROS-based systems. Frequency analysis.
* **3.5 Software stacks** — PyTorch, TensorFlow, ROS2, OpenCV dominance. Which combinations appear together?
* **3.6 Assessment approaches** — project-based vs. exam-based vs. publication-linked. Note that publication-linked assessment is rare and worth highlighting.

## 4 Results — Korean Context ~1,000 words

Your differentiator. No English-language paper has systematically characterized Korean Physical AI education. This section is why this paper belongs in the inaugural issue of a Korean Physical AI journal.

* **4.1 Current state of Physical AI in Korean universities** — what exists, where, at what level
* **4.2 Government policy context** — 과학기술정보통신부 AI policy, 교육부 SW/AI 교육 정책, how they shape curriculum
* **4.3 Infrastructure reality** — budget constraints, lecturer-heavy staffing, lack of dedicated lab space. Honest characterization.
* **4.4 Comparison to global leaders** — specific gaps and specific advantages (strong math/CS foundations, hardware manufacturing ecosystem)
* **4.5 Your own courses as mini-case studies** — Autonomous Driving & ML, IoT, Python ML, Imaging-Based Medical Devices. Cite your GitHub Classroom papers here.

## 5 Discussion ~1,200 words

Interpret the findings. This is where your voice as a field-founder comes through.

* **5.1 Key gaps:** Lack of open curriculum resources; hardware cost barriers; no standardized competency framework for Physical AI graduates
* **5.2 Emerging patterns:** NVIDIA Jetson becoming the de facto platform; ROS2 adoption accelerating; simulation-first pedagogy growing
* **5.3 Recommendations for Korean institutions:** prioritize module-level integration before full courses; leverage existing IoT/embedded infrastructure; use NVIDIA DLI to bridge training gaps
* **5.4 Propose a Physical AI Curriculum Framework:** a 3×3 matrix of competency areas (Sensing / Inference / Actuation) × skill levels (Conceptual / Implementable / Publishable). This becomes a citable contribution that others reference.
* **5.5 Limitations:** web-based search may miss unpublished courses; English-language search bias; rapidly changing field

## 6 Conclusion ~400 words

Summarize the map, restate the gaps, and signal the lab's role in addressing them. End with a forward-looking statement about the inaugural journal's role in building this field in Korea.

* Restate the 3 research questions and answer each in 1–2 sentences
* Propose the database as a living resource (link to public Google Sheet in appendix)
* Close with a call for curriculum sharing and open collaboration among Korean Physical AI researchers

## + Appendix — Course Database Public Google Sheet

Link to the full living database. Include a static snapshot table of the top 20–30 most complete entries in the paper body. The living spreadsheet becomes a citable research artifact on its own — other researchers will link to it, which builds your citation count over time.

**Key citations to collect now**

* Petersen et al. (2008) — "Systematic Mapping Studies in Software Engineering" — your methodological anchor
* Kitchenham & Charters (2007) — systematic review guidelines (for credibility)
* ROS2 / NVIDIA Jetson adoption papers from IEEE ICRA / IROS education tracks
* Korean government AI education policy documents (교육부, 과기정통부)
* Your own prior papers: GitHub Classroom (JPEE 2024/2025), AI in Education (JCCR 2025)
* Any ASEE papers on robotics/embedded AI curriculum (search ASEE PEER database)