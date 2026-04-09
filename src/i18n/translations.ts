// src/i18n/translations.ts
// All UI strings in one place — add keys here first, then use in components.

export const translations = {
  en: {
    // Nav
    nav_research:    "Research",
    nav_curriculum:  "Curriculum",
    nav_projects:    "Projects",
    nav_modules:     "Modules",
    nav_team:        "Team",
    nav_notes:       "Notes",
    nav_about:       "About",
    nav_subtitle:    "Physical AI Laboratory",

    // Hero
    hero_location:   "— JEONJU · KOREA · EST. 2025",
    hero_title:      "Physical AI\nLaboratory",
    hero_tagline:    "Bridging machine intelligence and the physical world — through embedded systems, robotics, and real-time AI at the edge.",
    hero_cta_research: "View research",
    hero_cta_about:    "About the lab",

    // Section headings
    sec_research:    "Research",
    sec_curriculum:  "Curriculum",
    sec_projects:    "Projects",
    sec_modules:     "Course plug-in modules",
    sec_modules_sub: "Self-contained Physical AI add-ons for courses not primarily focused on AI.",
    sec_notes:       "Notes",
    sec_about:       "About",

    // About
    about_pi_role:   "Principal Investigator",
    about_body:      "The Physical AI Laboratory is an independent research group focused on the intersection of machine learning, embedded systems, and physical world interaction. Based in Jeonju, Korea, the lab supports multiple university partnerships and is committed to open, reproducible research.",
    about_affiliated: "Affiliated institutions",
    about_naver:     "Naver blog (KR)",

    // Status pills
    status_published: "Published",
    status_active:    "Active",
    status_review:    "In review",
    status_planned:   "Planned",

    // Footer
    footer_copy:     "© 2025 Aaron Snowberger · PAI LAB",

    // Notes list
    notes_lang_both: "EN · 한국어",
    view_all:        "View all",
    read_more:       "Read more →",
  },

  ko: {
    nav_research:    "연구",
    nav_curriculum:  "커리큘럼",
    nav_projects:    "프로젝트",
    nav_modules:     "모듈",
    nav_team:        "팀",
    nav_notes:       "노트",
    nav_about:       "소개",
    nav_subtitle:    "피지컬 AI 연구소",

    hero_location:   "— 전주 · 대한민국 · 설립 2025",
    hero_title:      "피지컬 AI\n연구소",
    hero_tagline:    "임베디드 시스템, 로보틱스, 엣지 AI를 통해 기계 지능과 물리적 세계를 연결합니다.",
    hero_cta_research: "연구 보기",
    hero_cta_about:    "연구소 소개",

    sec_research:    "연구",
    sec_curriculum:  "커리큘럼",
    sec_projects:    "프로젝트",
    sec_modules:     "코스 플러그인 모듈",
    sec_modules_sub: "AI 중심이 아닌 과목에 바로 적용할 수 있는 독립형 피지컬 AI 추가 모듈.",
    sec_notes:       "노트",
    sec_about:       "소개",

    about_pi_role:   "책임 연구원",
    about_body:      "피지컬 AI 연구소는 기계 학습, 임베디드 시스템, 물리 세계 상호작용의 교차점을 연구하는 독립 연구 그룹입니다. 전주에 기반을 두고 여러 대학과 협력하며 개방적이고 재현 가능한 연구를 지향합니다.",
    about_affiliated: "관련 기관",
    about_naver:     "네이버 블로그",

    status_published: "게시됨",
    status_active:    "진행 중",
    status_review:    "검토 중",
    status_planned:   "예정",

    footer_copy:     "© 2025 Aaron Snowberger · PAI LAB",

    notes_lang_both: "EN · 한국어",
    view_all:        "전체 보기",
    read_more:       "더 보기 →",
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["en"];

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations["en"][key] ?? key;
}

// ── FIXED altLangUrl ─────────────────────────────────────
// Bug: clicking /ko toggle repeatedly added /ko/ko/ko...
// Fix: always strip ALL leading /ko before rebuilding the URL.

export function altLangUrl(currentPath: string, currentLang: Lang): string {
  // Strip ALL instances of /ko from the beginning (handles the /ko/ko/ko bug)
  const cleanPath = currentPath.replace(/^(\/ko)+/, "") || "/";

  if (currentLang === "en") {
    // Going to Korean: prepend /ko
    return `/ko${cleanPath}`;
  } else {
    // Going to English: just the clean path
    return cleanPath;
  }
}
