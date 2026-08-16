# Changelog

All notable changes to **Petit Monde** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (sort of — Agus is 4, not a semver expert).

---

## [1.1.0] - 2026-08-16

### Added
- **Petit Monde branding** — New name, logo, and color palette
- **SVG logo** — Bear sitting on a book with floating educational icons
- **New color palette** — Muted, calming colors designed for focus:
  - Cream (#FFFDF7) - Background
  - Sage (#B8C9A3) - Secondary
  - Dusty Rose (#D4A5A5) - Accents
  - Warm Sand (#E8DCC8) - Borders
  - Charcoal (#4A4A4A) - Text
  - Muted Blue (#7BA7BC) - Interactive elements
  - Terracotta (#C9886E) - Active states
  - Pale Gold (#E8C97A) - Rewards
  - Lavender (#C9A9D4) - Creative elements

### Changed
- **App name** — Renamed from "Apprendre avec Agus" to "Petit Monde"
- **Mascot colors** — Updated to match new palette
- **All component colors** — Updated to use muted, child-friendly colors
- **localStorage keys** — Updated to "petit-monde-*" prefix

---

## [1.0.0] - 2026-08-16

### Added
- **Colors section** — Explore 5 colors with bilingual TTS + quiz mode
- **Numbers section** — Numbers 1-10 with dot grids + quiz mode
- **Body Parts section** — Interactive SVG human body you can tap on + quiz mode
- **Shapes section** — Circle, square, triangle, rectangle, star, and heart with SVGs + quiz mode
- **Counting game** — Count animals by tapping the correct number
- **Color classification game** — Sort objects by color into buckets (2 difficulty levels)
- **Bilingual TTS** — French first, then Spanish, because Agus lives in France but dreams in Español
- **Quiz engine** — Reusable quiz component with shuffled questions, feedback animations, confetti, and star scoring
- **Mascot** — SVG bear with speech bubbles and bilingual messages (welcome, explore, quiz, correct, wrong, perfect)
- **Progress tracking** — localStorage-based mastery tracking per section and per concept
- **Streak system** — Daily streak counter persisted in localStorage
- **Parent dashboard** — Hidden behind 5 secret taps on the logo; shows sessions, streak, progress, weak concepts, and configurable settings
- **Sound effects** — Pop, success, error, click, celebration, whoosh, and unlock sounds via Web Audio API oscillators
- **First-visit guide** — Blue tooltip banner on first visit to each section
- **Animated feedback** — Bounce-in, shake (wrong), glow (active), float (feedback toast), pop (correct), confetti (completion)
- **Touch optimization** — `touch-action: manipulation`, large tap targets, no double-tap zoom
- **Bottom navigation bar** — 4 tabs: Maison, Couleurs, Nombres, Corps
- **Google Fonts** — Nunito (display) + Inter (body)
- **Makefile** — Dev workflow with install, build, start, stop, lint, security, format, clean targets
- **README** — Funny, informative, and slightly unhinged

### Known Issues
- `App.jsx` only registers 4 routes (`/`, `/colores`, `/numeros`, `/cuerpo`) — Formas, Contar, and Clasificar pages exist but aren't routed (accessible from Home grid only)
- No tests (because Agus doesn't write tests)
- No CI/CD (because Agus doesn't deploy)
- The mascot is a bear and not a dog (unacceptable for some users)

---

*No animals were harmed in the making of this app. The bear is an SVG. The oscillators are fine.*
