# Alive5 Redesign — Project Memory / Handoff

> Single source of truth to resume this project from anywhere. Last updated: 2026-05-22.

---

## 1. What this is

A from-scratch redesign of **alive5.com** — a B2B SaaS marketing site for an A.I. chat / live chat / SMS / Facebook Messenger "team inbox" product. Goal: a premium, animation-heavy marketing site (visual inspiration: Twine.com + ToDesktop.com) that migrates to **Lovable**.

- **Working directory:** `C:\Users\SEO\Desktop\lovable-alive5`
- **GitHub:** https://github.com/mdshazeed44-lang/alive5 (branch `main`)
- **Dev URL:** http://localhost:5173

---

## 2. Tech stack (FIXED — do not change)

- React 18.3 + Vite 5.4 + TypeScript 5.6 (strict: `noUnusedLocals`/`noUnusedParameters`)
- TailwindCSS 3.4 (TS config via `tailwind.config.ts`)
- React Router v6 (`react-router-dom`)
- Framer Motion 11 (scroll-driven + reveal animations)
- Lucide React (icons)
- Poppins font only
- Path alias `@` → `./src`

Scripts (`package.json`): `dev`, `build` (`tsc -b && vite build`), `preview`, `lint` (`tsc --noEmit`).

---

## 3. Brand system (LOCKED — Alive5 Brand Guide 2023)

- **Orange** `#EB5124` (primary, `alive5-orange`)
- **Grey** ramp; text `grey-900` `#1F1F20`, body `grey-700` `#48484A`
- **Accent** palette: teal `#278B93`, navy `#0E4F74`, green `#7CB65E`, light-blue `#A5DBDB`, etc.
- **Surfaces:** page `#FFF`, soft `#FAFAFA`, cream `#FFF8F2`
- Type scale: display 88px, h1 72px, h2 48px, h3 32px, h4 20px, body-lg 18px
- **6px button radius** (`.btn-orange` / `.btn-ghost` in `src/index.css`)
- Sentence case, no end-punctuation on headlines (kicker UPPERCASE is the one exception)

All tokens live in `tailwind.config.ts`. Buttons/nav-link helpers in `src/index.css`.

---

## 4. How to run

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # tsc --noEmit (must be EXIT 0)
npm run build      # production build
```

Preview is also wired via `.claude/launch.json` (server name `alive5-web`, port 5173).

---

## 5. Directory map (key files)

```
src/
  main.tsx, App.tsx           # router; CUSTOM_PAGES map → bespoke pages, else MarkdownPage
  index.css                   # tailwind layers + .btn helpers + nav scroll-morph CSS
  data/
    routes-map.json           # 121 crawled routes (route/title/slug/content_file/status)
    routes.ts                 # ROUTES, cleanTitle()
  content/*.md                # 121 scraped markdown pages (raw, with nav/footer noise)
  lib/
    content.ts                # import.meta.glob raw md → bySlug, parseFrontmatter()
    markdown.ts               # cleans md → typed Block[] (heading/para/list/image) + hero
    utils.ts                  # cn(), supportsScrollTimeline()
  components/
    layout/   Navbar (scroll-morph), Footer (trust chips + status pulse), Container, Section
    motion/   FadeUp, Stagger, staggerItem, Marquee, Parallax
    marketing/ Hero, ChatMockup, ChatShowcase, TrustBand, SlidingDeck, FAQ
    sections/  ProductHero, FeatureSplit, CardGrid, StepProcess, CTASection, SectionHeading
    content/   MarkdownPage (auto-designed renderer), InlineText
  pages/
    Home.tsx                  # hand-built homepage
    products/LiveChat.tsx     # hand-built /live-chat product page
    Placeholder.tsx           # "Coming soon" fallback (no usable content)

alive5-redesign/              # ORIGINAL build bundle (spec + crawl data, kept for reference)
  CLAUDE_CODE_PROMPT.md       # authoritative 20-section build spec
  ANIMATION_PLAYBOOK.md       # Twine/ToDesktop animation patterns
  audit/routes-map.json       # source of routes-map
  content/                    # source of src/content
```

---

## 6. Routing model

- **121 total routes** from `routes-map.json` (116 status 200, 5 non-200).
- `App.tsx` checks `CUSTOM_PAGES` first:
  - `/` → `Home`
  - `/live-chat` → bespoke `pages/products/LiveChat.tsx`
  - **all other 119** → `MarkdownPage` (auto-designed from `src/content/<slug>.md`)
  - no usable content → `Placeholder`
- Page transitions: `AnimatePresence mode="wait"` fade/slide in `App.tsx`.

---

## 7. How content pages work (the auto-design template)

`MarkdownPage.tsx` is the big lever — improving it improves ~119 pages at once.

1. `getPageContent(slug)` (in `lib/markdown.ts`) strips the repeated nav header + footer + reCAPTCHA/tracking noise, then parses the body into typed blocks. Merges split sub-heading artifacts (level ≥4) like "Ring All" + "Agents".
2. `MarkdownPage` segments blocks at each H1–H3 and classifies each section:
   - **split** (1 image) → alternating image↔text
   - **cards** (≥2 images+titles) → 3/4-col card grid
   - **gallery** (≥2 loose images) → image grid
   - **mini** (short text-only, grouped) → numbered card grid
   - **prose** → constrained reading column (legal pages)
3. Alternating section backgrounds, gradient hero, dark CTA at the end.

Internal `alive5.com` links are rewritten to in-app routes (`localizeHref`).

---

## 8. Homepage section order (`pages/Home.tsx`)

1. **Hero** — glass announcement pill, dot-grid + glow backdrop, word-stagger H1, dual CTA, avatar trust cluster, floating chat card (`ChatMockup`) with floating channel chips
2. **ChatShowcase** — 5 channel message cards
3. **TrustBand** — sector marquee
4. **SlidingDeck** — Twine-style scroll-pinned deck (device pins, screen crossfades through 3 slides: alerts / dashboard / connect; copy swaps in sync; progress rail)
5. **Problem** — "Provide exceptional service at the speed of A.I." (3 cards)
6. **Trained on your business** — 4 icon cards
7. **Stats** — "Reduce support volume…" 90%+ / 5× ROI cards
8. **Human handoff** — 4 channel cards
9. **Launch steps** — 4 numbered steps
10. **FAQ** — interactive accordion (8 Qs, one open at a time)
11. **CTA banner** — FULL-BLEED (edge-to-edge), gradient, dot-grid, floating bubbles, dual CTA, trust line
12. **Footer**

Real copy/data sourced via Firecrawl from the live site (homepage + /live-chat scraped clean).

---

## 9. Git / GitHub

- Repo initialized, branch **`main`**, remote `origin` = https://github.com/mdshazeed44-lang/alive5.git
- Initial commit pushed (362 files; `node_modules` ignored via `.gitignore`).
- **SSL note:** corporate SSL inspection blocks plain `git push`. Fix once:
  ```
  git config --global http.sslBackend schannel
  ```
  (Or prefix any command: `git -c http.sslBackend=schannel push`.)
- User git identity: `SEOworld` / `deepakkumar4195@iwantonlinemarketing.com`.

Normal flow going forward:
```bash
git add <files>
git commit -m "message"
git push          # after the schannel config above
```

---

## 10. Known caveats / honest status

- **Screenshots blank below the fold** in the preview sandbox (network-idle / programmatic-scroll limitation). Verification is done via DOM inspection (`preview_eval`), not screenshots.
- **Auto-template ≠ hand design.** The 119 content pages are heuristically laid out — sensible and consistent, but not art-directed like `/live-chat`. A few scrape artifacts remain (jammed words like "withLive", some titles render on two lines). A few CDN images 404 (lazy, degrade gracefully).
- `/live-chat` and `Home` are the only hand-built "gold standard" pages.

---

## 11. Remaining / next steps (suggested priority)

1. **Pricing section on homepage** — real site has "$500 60-day pilot" + "$1/conversation Go Live" cards (not yet added).
2. **Hand-build core product pages** like `/live-chat`: `business-sms`, `chatbots`, `facebook-messenger`, `crm`, `qr-codes` (crawl each with Firecrawl → assemble with `components/sections/*`).
3. **Industry pages** (`sports`, `gov`, higher-ed, health) — same treatment.
4. Clean remaining scrape artifacts in `lib/markdown.ts` if desired.
5. SEO: per-page `<title>`/meta (currently set via `document.title` only), 404 page polish.
6. Add `shadcn/ui` if richer primitives are wanted (not installed yet).
7. Lighthouse + responsive/cross-browser QA before Lovable migration.

---

## 12. Resume prompt (paste to a fresh Claude Code session)

> "Read MEMORY.md at the project root. We're rebuilding alive5.com (React+Vite+TS+Tailwind+Framer Motion, brand-locked orange #EB5124 / Poppins / 6px radius). Homepage and /live-chat are hand-built; 119 other pages render via the auto-design MarkdownPage template. Repo is on GitHub (origin/main). Continue with [the task]."
