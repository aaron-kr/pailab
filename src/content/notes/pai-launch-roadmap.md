---
title: "Physical AI Lab — Launch Roadmap"
title_ko: "피지컬 AI 연구소"
pubDate: 2026-04-10
lang: "en"
tags: ["Physical AI", "Education", "Opinion"]
---

# Physical AI Lab — Launch Roadmap

## Is Now a Good Time to Recruit?

Mid-semester is actually a smart time to recruit for _next_ semester. Students are deep enough into their current work to know what they want more of, and you'll have a pool ready to hit the ground running after break. Aim to have commitments locked in 3–4 weeks before semester's end.

## How Many Students & What Types

Start with 4–6 students total. Small enough to manage quality, large enough to run parallel projects. You want:

* **1–2 Hardware/Embedded folks** — comfortable with microcontrollers, sensors, actuators (Arduino, Raspberry Pi, ROS). These are your build leads.
* **1–2 ML/AI people** — computer vision, reinforcement learning, or edge inference. They bridge the model side to the physical side.
* **1 generalist engineer** — someone who can write clean code, document well, and isn't precious about switching tasks. Invaluable glue.
* **1 strong writer/researcher** — even one person who can draft clearly pays dividends at paper time.

Mix of undergrad and grad if possible. Undergrads bring energy and time; grad students bring depth and ownership.

## PI's Role

Given your background, I'd suggest a shift: **move from solo researcher with advisors to research director with active technical involvement in one thread.** Concretely:

* **Pick one project** where you are genuinely in the weeds — designing experiments, analyzing results, writing sections. This keeps your skills sharp and gives students a model to emulate.
* On the other projects, be a **structured advisor**: weekly check-ins, sharp feedback on writeups, and blocking decisions (not bottlenecking execution).
* You write the **framing and introduction** sections of papers. Students often struggle most with situating work in the literature — this is where your experience adds the most value.


## Midterm-to-Break Research Project Ideas

These are scoped to be completable in ~6–8 weeks and publishable at a workshop or short paper venue:

1. **Sim-to-Real Gap on a Budget** — Train a simple manipulation or locomotion policy in simulation (Isaac Gym / MuJoCo), deploy on cheap hardware, and systematically measure the gap. Lots of venues want honest benchmarks like this.
2. **Edge Vision for Robotic Trigger Detection** — Deploy a fine-tuned vision model (e.g. YOLO variant) on a Jetson Nano or Pi 5, and benchmark latency/accuracy tradeoffs under real-world lighting/occlusion. Great for a systems-flavored paper.
3. **Human-in-the-Loop Correction Study** — Build a small robot task (pick-and-place, navigation) and study how few corrective demonstrations are needed to adapt a pretrained policy. Connects neatly to RLHF/HITL literature.
4. **Physical LLM Interface** — Use an LLM (via API) as a task planner for a physical agent, and evaluate failure modes systematically. Very publishable right now given LLM-robotics interest.
5. **Tactile/Sensor Fusion Baseline** — If you have any force or tactile sensors, even a basic dataset + baseline model contributes something concrete to an underexplored area.


## Roadmap

| Phase | Timing | Actions |
|-------|--------|---------|
| **Seed** | Now → 3 weeks | Draft lab mission statement; soft-recruit 2–3 students informally; sketch project list | 
| **Recruit** | Weeks 3–6 | Post formal call; interview 8–10; select 4–6; assign to projects | 
| **Sprint** | Midterms → Break | Focused project execution; weekly standups; draft paper outlines | 
| **Write** | Over break | Paper drafts; you edit and frame; target workshop/short paper deadlines | 
| **Launch** | Start of next semester | Lab site goes live; first blog post; submit first paper |

## Online Presence — Content Suggestions

### Site structure:

* _About_ — Lab mission (1 clear paragraph: what problems, what approach, why physical AI)
* _People_ — You + students with short bios and GitHub/Scholar links
* _Research_ — Project cards with status (ongoing / submitted / published)
* _Blog_ — Where most of your energy should go early on

### Blog content to start with:

* _"Why Physical AI, Why Now"_ — your founding statement
* _"What We're Building This Semester"_ — project previews, generates interest
* A build log post per project (students write these, you edit)
* _"What We Learned Presenting at [Conference]"_ — you already have material for this

### Recruiting email (to send to undergrad/grad lists):

> Subject: Joining the [Lab Name] Physical AI Lab — Paid/Credit Research Positions

> I'm forming a small research group focused on physical AI — where learned models meet real hardware. We're working on problems involving robotic perception, edge inference, and human-robot interaction, with a goal of publishing at venues like [CoRL / ICRA / RA-L workshops / etc.].

> I'm looking for 4–6 students (undergrad and MS) who are curious, self-directed, and want to put their name on real publications. Background in robotics, CV, or embedded systems is helpful but not required — motivation matters more.

> If this sounds like you, send me a short email (not a formal CV) describing one thing you've built or studied that you're proud of.


The single most important thing early on: **ship one paper before the lab site has been live six months.** Even a workshop paper signals that this is a real lab, not a landing page.