---
layout: page
title: Capstone
permalink: /capstone/
description: Information about Capstone Design projects.
nav: true
nav_order: 2
display_categories: [work, fun]
horizontal: false
---

# Capstone Projects

## ✅ General Deliverables (for every project)

1. Proposal Document (Week 3): Problem, objectives, timeline.
2. Midterm Presentation (Week 7): Progress update.
3. Final Deliverables (Week 12):
   - Trained ML model
   - Working demo (Streamlit app or Arduino)
   - Final report (methods, results, discussion)
   - Slides + oral presentation

## Project Ideas

### 1. Hybrid Solar + Grid Power System (Bangladesh Focus)

- **Theme:** Renewable Energy + Simulation + Arduino + ML
- **Dataset/Tools:**
  - HOMER / MATLAB (simulation),
  - Arduino with small solar cell,
  - weather/solar datasets (Kaggle/NREL).
- **Deliverables:**
  - HOMER design of solar + grid backup system.
  - Arduino demo with LED load switching between “solar” and “grid.”
  - Simple ML model predicting daily solar power from weather data.

### 2. Football Match Outcome Predictor

- **Theme:** Sports Analytics + ML
- **Dataset/Tools:**
  - Kaggle “European Football Dataset,”
  - FBref stats (Barcelona).
- **Deliverables:**
  - Exploratory data analysis of team/player stats.
  - ML model to predict win/draw/loss given past performance.
  - Streamlit demo: input two teams → see win probability.

### 3. Solar Panel Efficiency Predictor

- **Theme:** Energy + IoT + ML
- **Dataset/Tools:**
  - Arduino + small solar panel (optional),
  - or Kaggle/NREL open solar datasets.
- **Deliverables:**
  - Data collection (voltage/current or weather vs. solar output).
  - ML regression model predicting solar efficiency.
  - Tangible demo: Arduino or Streamlit graph of real vs. predicted performance.

### 4. Crop Disease Detection (Image Classification)

- **Theme:** Computer Vision + Agriculture
- **Dataset/Tools:**
  - Kaggle “PlantVillage” (healthy vs. diseased leaves).
  - CNN in TensorFlow/PyTorch.
- **Deliverables:**
  - Preprocessing of images + CNN training.
  - Model achieving >80% accuracy.
  - Streamlit app: upload leaf → model predicts disease type.

### 5. Smart Waste Sorting System

- **Theme:** Computer Vision + Sustainability
- **Dataset/Tools:**
  - TrashNet dataset (glass, plastic, paper, metal).
  - CNN in PyTorch/TensorFlow.
- **Deliverables:**
  - Train CNN to classify waste items by category.
  - Accuracy evaluation + confusion matrix.
  - Tangible demo: Arduino with 4 LEDs (red=plastic, green=glass, etc.) lights up based on predicted category.

### 6. Student Performance Predictor

- **Theme:** Education + Data Science
- **Dataset/Tools:**
  - UCI “Student Performance Data,”
  - Kaggle exam success datasets.
- **Deliverables:**
  - EDA of student performance factors (hours studied, GPA, attendance).
  - Regression/classification model to predict final grade.
  - Streamlit demo: enter features → get prediction of success.

### 7. Air Quality Monitoring and Prediction

- **Theme:** IoT + Environment + ML
- **Dataset/Tools:**
  - Arduino air quality sensor (PM2.5)
  - OR Kaggle “Air Quality” datasets.
- **Deliverables:**
  - Collect or download AQI data.
  - ML regression model to predict AQI from weather/traffic.
  - Arduino or Streamlit demo: display “Good / Moderate / Unhealthy” classification.

---

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}

<!-- Display projects without categories -->

{%- assign sorted_projects = site.projects | sort: "importance" -%}

  <!-- Generate cards for each project -->

{% if page.horizontal -%}

  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
