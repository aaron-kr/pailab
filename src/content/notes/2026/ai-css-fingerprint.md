---
title: "AI-Assisted Development's Unique CSS Fingerprint"
title_ko: ""
category: "ai-assisted-development"
pubDate: 2026-05-10
updated:
lang: "en"
tags: ["Research", "Conferences", "ChatGPT", "References"]
summary: "With the help of Claude.ai, I built and deployed 5 websites "
naver_url: ""
---

With the help of Claude.ai, I built and deployed 5 websites in just over 1 month. From a visual, user's perspective, the sites looked incredible. They also performed well, building content, deploying from GitHub, and loading static pages quickly.

However, under the surface, there were quite a few things happening to the backend code that I noticed would need addressing. One of these was one that I did not notice immediately, but that appeared during various code audits: AI (Claude Code) produced a very distinct CSS fingerprint that raised warning flags during my code quality audit.

This note will describe the CSS fingerprint produced by AI-assisted development, how to find and recognize it, and why it suggests AI development is not yet ready for full-time service.

## Website Builds

The following table lists the websites built with Claude, the code churn ratio, and the deployed version of the website.

