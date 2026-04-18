---
title: "Physical AI Lab Research Ideas"
title_ko: "피지컬 AI 연구소"
pubDate: 2026-04-10
lang: "en"
tags: ["Physical AI", "Education", "Opinion"]
private: true
---

## In-Progress &rarr; PAI

**Direct Physical AI extensions**

| Project | Physical AI connection | PAI fit | Output type |
|---------|------------------------|---------|-------------|
| Letter Segmenter App<br>OCR · KIICE Spring | Deploy segmenter on Jetson Nano as a physical document scanning pipeline — camera input → ROI → segmentation → recognition in real-time<small>Your interactive dataset builder paper (July 2025) is the upstream; this is the downstream physical deployment</small> | Strong | Lab module + paper | 
| Mnistify<br>OCR · Python · ICFICE Guam | Physical version: use a camera + light box to capture handwritten samples in real-time, auto-process into MNIST-style datasets. Closes the data collection loop physically.<small>Would make a strong demo at ICFICE — live hardware demo beats a slide every time</small> | Strong | Demo + paper | 
| Hangul Dataset<br>OCR · SCIE target | Physical data collection rig: standardized camera/lighting setup for capturing real handwriting samples at scale. Dataset paper + physical collection methodology = stronger SCIE contribution than digital-only datasets<small>Pair with Jetson-based inference benchmark for a two-part paper</small> | Strong | Dataset + benchmark | 
| Joseon Image Colorization<br>Computer Vision | Physical AI angle: deploy colorization model on edge device for museum/archive kiosk use — a real-world physical installation context. Connects cultural heritage AI to embedded deployment.<small>Niche but interesting; good for KLife or a humanities+tech crossover venue</small> | Medium | Conference paper | 
| Cherokee OCR<br>OCR · Scopus | Same physical pipeline as Hangul/Manchu: camera capture → edge segmentation → recognition. Cherokee's unique script structure (syllabary) makes it interesting for embedded OCR research.<small>Language preservation + Physical AI is a rare crossover — differentiated for Scopus reviewers</small> | Medium | Scopus paper | 
| Python HW Checking Script<br>Python · Education | Extend to a physical lab auto-grader: plug in student Arduino/Jetson projects, run automated tests that verify physical outputs (sensor readings, actuator states). Physical CI/CD for hardware courses.<small>Would be novel — automated assessment of physical AI student projects barely exists in literature</small> | Medium | Tool + edu paper | 

**Indirect / stretch connections**

| Project | Physical AI connection | PAI fit | Output type |
|---------|------------------------|---------|-------------|
| AI Perceptions in Edu<br>Education · KIICE/JPEE | Extend survey to specifically ask about Physical AI perceptions and readiness — one added section transforms this into a Physical AI education paper, not just a general AI paper<small>Already has co-author (Prof. You); easy lift to add a PAI-specific question block</small> | Medium | Survey extension |
| "Vibe Coding"<br>Edu · Ethics · AI · SCIE? | Physical AI angle: what happens when students "vibe code" embedded systems? Safety implications of LLM-generated hardware control code. Ethics paper with real stakes — robot/actuator behavior from hallucinated code.<small>Very timely; IEEE Technology and Society or similar would publish this</small> | Medium | SCIE opinion/ethics |
| Manchu Dataset<br>OCR · SCIE | Same physical capture pipeline as Hangul. Lower PAI priority given practical focus shift, but a physical collection methodology note adds value to the dataset paper.<small>Keep it in the queue; don't force it</small> | Light | Dataset paper |

## Save for Later &rarr; PAI

**High PAI potential**

| Idea | Physical AI connection | PAI fit | Horizon |
|------|------------------------|---------|---------|
| Script Learning App<br>Dev · Language | Physical version: app + camera recognizes user's handwritten strokes in real-time and gives feedback. Makes the app a physical AI product, not just a flashcard tool. Jetson or mobile edge inference.<small>Strong lab flagship product — combines OCR research + Physical AI + language learning</small> | Strong | 1–2 year project
| LLM Comparison for Peer Programming<br>LLM · Edu | Extend to Physical AI context: compare LLMs for generating embedded/Arduino/Jetson code. Which LLM writes the safest, most functional hardware control code? Novel angle, directly lab-relevant.<small>Pairs with "Vibe Coding" as companion papers</small> | Strong | 6–12 months
| GitHub Classroom vs Google Classroom<br>Edu · CS | Add a Physical AI lab course as the comparison context — how do these platforms handle hardware project submission, sensor data files, and embedded code? Gives the paper a novel applied angle.<small>Extends your GitHub Classroom series naturally</small> | Medium | 6 months
| PyQt6 App Case Study<br>Dev · Code | Build the app as a Physical AI dashboard — live sensor visualization, model inference monitoring, hardware status display. Makes the case study more than a coding diary.<small>Good lab tooling paper; practical for students</small> | Medium | Conf paper
| Soccer / Sports (Big Data)<br>Sports · Data | Physical AI sports angle: computer vision for player tracking, pose estimation on embedded devices, edge-deployed referee assistance. Your Olympic medal / GDP paper is a template for data analysis; this adds a physical sensor layer.<small>Wearable sensors + ML = strong industry interest; Samsung/LG health division alignment</small> | Medium | 1–2 year project

**Lighter PAI connections**

| Idea | Physical AI connection | PAI fit | Horizon |
|------|------------------------|---------|---------|
| ChatGPT for Language Learning<br>LLM · Language | Stretch connection: physical interface for language learning (voice + gesture recognition on device). Mostly a software/education paper but can reference edge deployment for accessibility.<small>Keep under Language Learning thread; don't force it into PAI</small> | Light | Edu / LLM paper |
| Korean Society / Immigration Data<br>Big Data · Korea | No direct PAI connection. Keep under Big Data / Social Science thread. Could eventually connect to smart city physical sensor data, but that's a stretch.<small>Valuable research, just not PAI — publish under your own name independently</small> | None | Independent |
| Olympic Host City Trends<br>Big Data · Sports | No direct PAI connection. Strong standalone Big Data paper. Your existing Olympic/GDP/Freedom Index conference paper is the seed.<small>Publish independently; mention lab affiliation for visibility</small> | None | Independent |

On **"not all research fits in Physical AI"** — you're right, and you shouldn't force it. The cleanest framing is: the PAI Lab site is your professional home, not a Physical AI-only site. Think of it the way a university professor's faculty page works — it lists all their research, even if it spans topics. Your Physical AI work is the lab's primary focus and gets featured prominently, but your OCR, education, and Big Data work lives there too under your name. This actually makes the site more useful as a single source of truth and more credible to visitors who can see your full range.