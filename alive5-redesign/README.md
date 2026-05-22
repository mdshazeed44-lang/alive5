# Alive5 Redesign — Complete Build Bundle

> Drop this folder into your Claude Code workspace. Read `CLAUDE_CODE_PROMPT.md` first.

## What's inside

### Root files (read these first)
- **`CLAUDE_CODE_PROMPT.md`** — Main build specification (43 KB, 20 sections). Paste this as your initial prompt to Claude Code.
- **`ANIMATION_PLAYBOOK.md`** — Detailed CSS keyframes + animation patterns from Twine + ToDesktop (20 KB). Reference for every animation in the build.
- **`REFERENCE_ASSETS.md`** — Complete URL manifest of fonts, images, Lottie files from reference sites.

### Folders
- **`content/`** — 121 markdown files (one per Alive5 page) with full crawled content. Each file has YAML frontmatter (url, title, description, slug).
- **`audit/`** — Site audit data:
  - `url-inventory.md` — Page categorization (Tier 1-8)
  - `routes-map.json` — Programmatic route list with metadata
  - `all-images.json` — 218 unique Alive5 CDN image URLs
  - `crawl-inventory.json` — Raw crawl metadata
  - `twine_screenshot_url.txt` + `todesktop_assets.txt` — Reference site asset lists
  - `twine_raw.html.gz` + `todesktop_raw.html.gz` — Full reference HTML (gzipped)
- **`design/`** — Brand & design specs:
  - `brand-dna-and-design-system.md` — Final design system (Poppins, orange #EB5124, grey #48484A)
  - `Alive5_BrandGuide_2023.pdf` — Official brand guide
- **`references/`** — Reference site materials:
  - `twine/` — Twine.com homepage screenshots, 10 hero/feature images, inline CSS
  - `todesktop/` — ToDesktop.com homepage screenshots, 42 feature illustrations, animations.css, Lottie JSON

## Quick start

```bash
# 1. cd into this folder in your terminal
cd alive5-redesign

# 2. Open Claude Code
claude

# 3. Initial prompt to Claude Code:
"Read the CLAUDE_CODE_PROMPT.md, ANIMATION_PLAYBOOK.md, and REFERENCE_ASSETS.md files at the root. Then study the screenshots in references/twine/ and references/todesktop/. Execute the build per Section 14 (Build Order). Start with Phase A foundation, then show me the first checkpoint per Section 20."
```

## Bundle stats
- **121** Alive5 pages crawled (full content as markdown)
- **218** unique Alive5 CDN image URLs documented
- **30+** specific animations specified for Claude Code to build
- **52** reference site images bundled for visual replication
- **10** core Twine scroll-driven CSS animations extracted
- **64** ToDesktop CSS keyframes documented

## Tech stack (locked)
- React 18 + Vite + TypeScript
- TailwindCSS 3.4 (with full custom theme)
- Framer Motion (for animations + scroll fallbacks)
- React Router v6
- shadcn/ui + Lucide React
- Poppins font (Google Fonts)

## Brand constraints (non-negotiable)
- Font: Poppins ONLY
- Colors: Official Alive5 palette (Orange #EB5124, Grey #48484A, accent colors per brand guide)
- Buttons: 6px radius (NOT pill shape)
- Typography: Sentence case only, no end punctuation on headlines
- Logo: Use exact provided URLs, no shadows/gradients/recoloring

