# Reference Sites — Complete Animation & Design Playbook

> Built from hard-crawled HTML + screenshots of [twine.com](https://twine.com) and [todesktop.com](https://www.todesktop.com).  
> Every animation, font, color, and pattern documented for **exact replication** in the Alive5 build.

---

## 1. Reference Site Quick Reference

### Twine.com
- **Stack:** Astro + Tailwind CSS v4 + CSS Scroll-Driven Animations (`animation-timeline: scroll()` and `view()`)
- **Fonts:** Instrument Sans Variable (sans), Times/Times New Roman (serif — for hero headlines)
- **Aesthetic:** Editorial, monochrome with warm cream tints, lots of whitespace, Times serif hero
- **Background colors:** `#fff`, `#f7f6f5` (shell-50), `#e9e8e5` (shell-100)
- **Primary text:** `#161616` (gray-950)
- **Accent palette:** Blue `#3e5ae5`, Green `#44a26b`, Purple `#6c36f1`, Pink `#ec3ff6`, Red `#f0392b`
- **Border radius:** sm 4px, md 6px, lg 8px, xl 12px, 2xl 16px, 3xl 24px, 4xl 32px
- **Default ease:** `cubic-bezier(.4, 0, .2, 1)` at 150ms

### ToDesktop.com
- **Stack:** Likely Astro/Next.js + Tailwind, custom CSS keyframe animations + Lottie
- **Fonts:** Aeonik Pro (heading), Inter (body), Geist Mono (code)
- **Aesthetic:** Premium SaaS, dark gradient hero (sky blue → deep navy), white feature cards, animated illustrations
- **Hero gradient:** Top sky blue → dark navy, with floating macbook
- **Lottie file:** `https://www.todesktop.com/_home/assets/2uhHLDBL-bundle-graph.json` (cached in bundle)

---

## 2. Twine's Scroll-Driven Animations — RECREATE THESE EXACTLY

These use the CSS Scroll-Driven Animations API (`animation-timeline: scroll()` / `view()`). Browser support: Chrome/Edge 115+, Firefox via flag. For Safari, polyfill with Framer Motion's `useScroll` + `useTransform`.

### 2.1 Navbar Scroll Morph (CRITICAL — high impact)
The navbar starts full-width transparent, then becomes a floating pill as you scroll.

```css
header[data-desktop] {
  position: fixed;
  top: 0;
  max-width: 100%;
  height: 64px;
  padding-inline: 8px;
  border-radius: 0;
  background-color: transparent;
  backdrop-filter: blur(0px);
  animation: nav-animation ease-in-out both;
  animation-timeline: scroll();
  animation-range: 0px 320px;
  animation-delay: .2s;
}

@keyframes nav-animation {
  0% {
    top: 0;
    max-width: 100%;
    height: 64px;
    padding-inline: 8px;
    border-radius: 0;
    background-color: transparent;
    backdrop-filter: blur(0px);
  }
  20% {
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.48);
    box-shadow: 0 2px 3px -2px rgba(233, 232, 229, 0.4) inset, 0 0 0 1px rgba(22, 22, 22, 0.04), 0 4px 4px -4px rgba(22, 22, 22, 0.4);
    backdrop-filter: blur(32px);
  }
  100% {
    top: 16px;
    padding-inline: 0px;
    max-width: min(calc(100% - 32px), 600px);
    height: 48px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.64);
    box-shadow: 0 2px 3px -2px rgba(233, 232, 229, 0.4) inset, 0 0 0 1px rgba(22, 22, 22, 0.04), 0 4px 4px -4px rgba(22, 22, 22, 0.4);
    backdrop-filter: blur(32px);
  }
}

/* Login button fades out as nav shrinks */
a[data-login-btn] {
  display: flex;
  animation: login-btn-animation ease-in-out both;
  animation-timeline: scroll();
  animation-range: 0px 320px;
  animation-delay: .2s;
}
@keyframes login-btn-animation {
  0%   { opacity: 1; padding-inline: 6px; width: max-content; }
  30%  { opacity: 0; padding-inline: 6px; width: max-content; }
  100% { opacity: 0; width: 0px; padding-inline: 0px; }
}

/* Nav menu width shrinks */
div[data-menu-affix] {
  width: 188px;
  transition: transform .2s ease-in-out;
  animation: menu-affix-animation ease-in-out both;
  animation-timeline: scroll();
  animation-range: 0px 320px;
  animation-delay: .2s;
}
@keyframes menu-affix-animation {
  0%   { width: 188px; }
  30%  { width: 188px; }
  100% { width: 120px; }
}
```

**JS fallback (Framer Motion equivalent for non-supporting browsers):**
```tsx
const { scrollY } = useScroll();
const navWidth = useTransform(scrollY, [0, 320], ['100%', 'min(calc(100% - 32px), 600px)']);
const navHeight = useTransform(scrollY, [0, 320], ['64px', '48px']);
const navRadius = useTransform(scrollY, [0, 64, 320], ['0px', '8px', '12px']);
const navBg = useTransform(scrollY, [0, 64, 320], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.48)', 'rgba(255,255,255,0.64)']);
const navBlur = useTransform(scrollY, [0, 64], ['blur(0px)', 'blur(32px)']);
const loginOpacity = useTransform(scrollY, [0, 96], [1, 0]);
```

### 2.2 Section "HowItWorks" — Section-Scoped Scroll Reveal
Each section gets its own scroll timeline:
```css
section[data-section="how-it-works"] {
  view-timeline-name: --how-it-works-section;
  view-timeline-axis: block;
  min-height: 250vh; /* tall section to give scroll room */
}

/* Primary text fades, slides, color-shifts */
[data-timeline-text="primary"] {
  animation-duration: 100s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-name: HowItWorks_S1_Primary;
  animation-timeline: --how-it-works-section;
  animation-range: cover;
}

@keyframes HowItWorks_S1_Primary {
  0%, 14.288%, 16.668%  { color: var(--text-primary); }
  19.048%, 21.428%      { color: var(--text-secondary); opacity: 1; transform: translateX(0px); }
  35.716%, 100%         { color: var(--text-secondary); transform: translateX(-100px); opacity: 0; }
}

/* Secondary text enters from below as primary exits */
[data-timeline-text="secondary"] {
  animation-name: HowItWorks_S1_Secondary;
  animation-timeline: --how-it-works-section;
  animation-range: cover;
}
@keyframes HowItWorks_S1_Secondary {
  0%, 14.288%, 16.668%  { opacity: 0; transform: translateY(16px); }
  19.048%, 21.428%      { opacity: 1; transform: translateY(0px); }
  35.716%, 100%         { opacity: 0; transform: translateX(100px); }
}

/* Cards rotate slightly into view */
[data-card="1"] {
  animation-name: HowItWorks_S2_Card;
  animation-timeline: --how-it-works-section;
}
@keyframes HowItWorks_S2_Card {
  0%, 42.856%   { transform: rotate(0deg); }
  57.144%, 100% { transform: rotate(-2deg); }
}

/* Caption fade-up */
[data-card-caption="1"] {
  animation-name: HowItWorks_S2_Caption;
  animation-timeline: --how-it-works-section;
}
@keyframes HowItWorks_S2_Caption {
  0%, 21.428%   { opacity: 0; }
  35.716%, 100% { opacity: 1; transform: translateY(0); }
}
```

### 2.3 Grayscale-to-Color (cloud photo section)
The cloud background photo is B&W, then fades to color as scrolled into view:
```css
.cloud-image {
  filter: grayscale(100%);
  animation: GrayscaleToColor linear both;
  animation-timeline: view();
  animation-range: cover 36% cover 48%;
}
@keyframes GrayscaleToColor {
  0%   { filter: grayscale(100%); }
  100% { filter: grayscale(0%); }
}
```

### 2.4 Fade-In-Up (basic section reveal)
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  animation: YourSafeNow_FadeInUp linear both;
  animation-timeline: view();
  animation-range: cover 44% cover 60%;
}
@keyframes YourSafeNow_FadeInUp {
  0%   { opacity: 0; transform: translateY(24px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

### 2.5 Mobile menu popover animation
```css
#mobile-menu {
  position: fixed;
  top: 72px;
  left: 50%;
  transform: translate(-50%);
  width: calc(100vw - 32px);
  height: calc(100dvh - 88px);
  opacity: 0;
  transition: opacity .25s linear, overlay .25s allow-discrete, display .25s allow-discrete;
}
#mobile-menu:popover-open {
  opacity: 1;
}
@starting-style {
  #mobile-menu:popover-open { opacity: 0; }
}
```

### 2.6 Product dropdown menu (with scroll-aware repositioning)
```css
#product-menu {
  position: fixed;
  top: 52px;
  left: 50%;
  transform: translate(-50%) scale(0.95);
  transform-origin: center top;
  opacity: 0;
  animation: menu-position-animation ease-in-out both;
  animation-timeline: scroll();
  animation-range: 0px 320px;
  transition: opacity .2s ease-in-out, transform .2s ease-in-out;
}
@keyframes menu-position-animation {
  0%   { top: 56px; }
  100% { top: 72px; }
}
#product-menu:popover-open {
  opacity: 1;
  transform: translate(-50%) scale(1);
}
```

---

## 3. ToDesktop's Animation Patterns — RECREATE THESE

ToDesktop uses traditional CSS keyframes triggered on `:hover` or with intersection observers. Each feature card has its own micro-animation.

### 3.1 MacBook Hero Animation (signature)
Floating macbook with screen content. Subtle float on load:
```css
.macbook-hero {
  animation: macbook-float 6s ease-in-out infinite;
}
@keyframes macbook-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}

/* MacBook lid opens on scroll-into-view */
.macbook-lid {
  transform-origin: bottom center;
  transform: rotateX(-90deg);
  animation: macbook-lid 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-timeline: view();
  animation-range: cover 0% cover 30%;
}
@keyframes macbook-lid {
  0%   { transform: rotateX(-90deg); }
  100% { transform: rotateX(0deg); }
}

.macbook-lid-base {
  animation: macbook-lid-base 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes macbook-lid-base {
  0%   { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
```

### 3.2 Code Editor Magnifier (Code Signing feature card)
A magnifying glass slides across a code block, magnifying the area underneath:
```css
.code-magnifier {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  border: 2px solid #0036FF;
  animation: features-code-animation-magnifier 4s ease-in-out infinite;
}
@keyframes features-code-animation-magnifier {
  0%   { opacity: 0; transform: translateY(50px) rotate(0deg); }
  20%  { opacity: 1; transform: translateY(0) rotate(-15deg); }
  50%  { transform: translate(180px, 0) rotate(15deg); }
  80%  { transform: translate(-30px, 30px) rotate(-10deg); }
  100% { opacity: 0; transform: translateY(50px) rotate(0deg); }
}

.code-magnified-area {
  opacity: 0;
  animation: features-code-animation-magnified 4s ease-in-out infinite;
  mask-image: radial-gradient(circle 30px at var(--mask-x, 0) var(--mask-y, 0), white 100%, transparent 100%);
}
@keyframes features-code-animation-magnified {
  0%   { opacity: 0; mask-position: 152px 51px; }
  20%  { opacity: 1; }
  50%  { mask-position: 330px 51px; }
  80%  { mask-position: 120px 100px; }
  100% { opacity: 0; }
}
```

### 3.3 Build Card Progress (Smoke Test feature)
Cards "appear" with logo progress bar filling:
```css
.build-card {
  opacity: 0;
  transform: translateY(20px);
  animation: features-build-card-appear 0.6s ease-out forwards;
}
@keyframes features-build-card-appear {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.build-card-logo {
  /* Initially gray, becomes colored when "completed" */
  filter: grayscale(100%);
  animation: features-build-card-logo-completed 2s ease-in-out forwards;
  animation-delay: 1s;
}
@keyframes features-build-card-logo-completed {
  0%   { filter: grayscale(100%); }
  100% { filter: grayscale(0%); }
}

.build-card-progress {
  width: 0%;
  background: linear-gradient(90deg, #0036FF, #5d24dd);
  animation: features-build-card-progress 1.5s ease-out forwards;
}
@keyframes features-build-card-progress {
  0%   { width: 0%; }
  100% { width: 100%; }
}
```

### 3.4 Smoke Check Pie Progress + Loading
```css
.smoke-pie {
  background: conic-gradient(#10b981 0%, #e5e7eb 0%);
  animation: features-smoke-check-pie-progress 2s ease-out forwards;
}
@keyframes features-smoke-check-pie-progress {
  0%   { background: conic-gradient(#10b981 0%, #e5e7eb 0%); }
  100% { background: conic-gradient(#10b981 100%, #e5e7eb 100%); }
}

.smoke-loading {
  background: linear-gradient(90deg, transparent 0%, #0036FF 50%, transparent 100%);
  background-size: 200% 100%;
  animation: features-smoke-check-loading 1.5s linear infinite;
}
@keyframes features-smoke-check-loading {
  0%   { background-position: -60% 50%; }
  100% { background-position: 160% 50%; }
}
```

### 3.5 Dashboard Mouse Cursor (sliding interaction demo)
```css
.dashboard-mouse {
  position: absolute;
  width: 24px;
  height: 24px;
  animation: features-dashboard-mouse 3s ease-in-out infinite;
}
@keyframes features-dashboard-mouse {
  0%   { transform: translate(0, 0); }
  30%  { transform: translate(120px, 40px); }
  60%  { transform: translate(80px, 100px); }
  100% { transform: translate(0, 0); }
}

/* Pressed state */
.dashboard-mouse[data-state="pressed"] {
  animation-name: features-dashboard-mouse-p;
}
@keyframes features-dashboard-mouse-p {
  0%   { transform: scale(1); }
  50%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}
```

### 3.6 Distribution Apps Bounce (logo cloud with bouncing icons)
The row of app icons (Linear, Notion, etc.) bounce in sequence:
```css
.distribution-icon {
  animation: features-distribution-apps-inner 3s ease-in-out infinite;
}
.distribution-icon:nth-child(1) { animation-delay: 0s; }
.distribution-icon:nth-child(2) { animation-delay: 0.1s; }
.distribution-icon:nth-child(3) { animation-delay: 0.2s; }
.distribution-icon:nth-child(4) { animation-delay: 0.3s; }
.distribution-icon:nth-child(5) { animation-delay: 0.4s; }

@keyframes features-distribution-apps-inner {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* Download badge attached to one icon */
.download-badge {
  animation: features-distribution-badge-download 2s ease-out infinite;
}
@keyframes features-distribution-badge-download {
  0%   { opacity: 0; transform: translateY(10px) scale(0.8); }
  20%  { opacity: 1; transform: translateY(0) scale(1); }
  80%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-10px) scale(0.9); }
}
```

### 3.7 Measure Chart Bars (Performance Benchmarks)
Chart bars animate from 0 to their final height:
```css
.chart-bar {
  height: 0;
  animation: features-measure-chart-item-bar-active 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes features-measure-chart-item-bar-active {
  0%   { height: 0; opacity: 0.5; }
  100% { height: var(--bar-height, 80%); opacity: 1; }
}
.chart-bar-initial {
  animation-name: features-measure-chart-item-bar-initial;
}
@keyframes features-measure-chart-item-bar-initial {
  0%   { height: 0; }
  100% { height: var(--bar-initial, 60%); }
}
```

### 3.8 Launcher Enter (App icon scale-in)
```css
.launcher-icon {
  opacity: 0;
  transform: scale(0.5);
  animation: launcherEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes launcherEnter {
  0%   { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
}
```

### 3.9 Footer Status Pulse (green "operational" dot)
```css
.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  position: relative;
}
.status-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #10b981;
  border-radius: 50%;
  animation: footer-status-pulse 2s ease-out infinite;
}
@keyframes footer-status-pulse {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
}
```

### 3.10 Rotate (loading spinners)
```css
.spinner {
  animation: rotate-1turn 1s linear infinite;
}
@keyframes rotate-1turn {
  100% { rotate: 360deg; }
}
```

---

## 4. Animation Patterns to Apply on Alive5 (Mapped)

For each section of the Alive5 redesign, here's which reference pattern to apply:

| Alive5 Section | Animation Pattern | Source |
|---|---|---|
| Navbar | Scroll morph: full-width → floating pill | Twine §2.1 |
| Hero headline | Stagger character/word fade-in (Framer Motion) | Custom |
| Hero subtitle | Fade-up after headline (300ms delay) | Twine §2.4 |
| Hero CTAs | Pop-in with scale 0.9→1, +200ms delay | Custom |
| Hero product image | MacBook-style float + slight parallax | ToDesktop §3.1 |
| Chat bubble showcase | Sequential bubble entrance (typing indicator + appear) | Custom |
| LogoCloud / trust band | Marquee horizontal scroll, pauses on hover | Standard |
| "Why Alive5" cards (BentoGrid) | Stagger fade-up on scroll, hover lift | Twine §2.4 + ToDesktop §3.3 |
| AI training feature | Magnifier sliding across feature screenshot | ToDesktop §3.2 |
| Team inbox tabs | Smooth tab content crossfade (Framer AnimatePresence) | Custom |
| Industry tiles grid | Stagger reveal + hover scale 1.02 | Custom |
| Stats / numbers | Count-up on intersection observer | Standard |
| Testimonial | Photo grayscale → color on view + quote fade-up | Twine §2.3 |
| Pricing cards | Cards rotate -2deg → 0 on scroll | Twine §2.2 |
| Industries grid scroll section | Section scroll-driven cards rotate + caption fade | Twine §2.2 |
| FAQ accordion | Smooth height transition + chevron rotate | Standard |
| CTA banner | Animated gradient bg + pulse on CTA button | Custom |
| Footer | Status pulse on "all systems operational" dot | ToDesktop §3.9 |

---

## 5. Reference Images Bundled

### From Twine (in `references/twine/images/`)
- `_hero.CUIVxDOx_1sdwBr.webp` — hero person holding iPad (794KB)
- `_hero_slack_notification.CM2JT05z_Z2otnMQ.webp` — slack notification overlay
- `_differentiating.ADOvuIcV_2hzAWi.webp` — "Not another dashboard" section
- `_cta.DTyNXN1j_2hHPhk.webp` + `_cta_lg.DHqOBkuI_Z1Sgfng.webp` — CTA visuals
- `_agents_baseline.webp`, `_agents_focus.webp`, `_agents_personal.webp` — feature card icons
- `_useful_for_everyone-0.webp`, `_useful_for_everyone-1.webp` — persona cards
- `page_part1.png`, `page_part2.png` — full homepage screenshots
- `homepage_fullpage.png` — full original screenshot
- `inline_styles.css` — Twine's exact inline CSS (4 style blocks)

### From ToDesktop (in `references/todesktop/images/`)
- `homepage_fullpage.png` + parts — full homepage screenshots
- 42+ feature illustrations (build, smoke check, magnifier, dashboard, distribution, validation, etc.)
- `2uhHLDBL-bundle-graph.json` — Lottie animation file (use with `lottie-react`)
- `animations.css` — extracted keyframe definitions

### Asset URL Manifests
- `audit/twine_screenshot_url.txt` — direct screenshot URL (expires in 7 days)
- `audit/todesktop_all_assets.txt` — 80 image URLs
- `audit/twine_raw.html` — full crawled HTML for deeper inspection
- `audit/todesktop_raw.html` — full crawled HTML

---

## 6. Library Versions for Animation

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lottie-react": "^2.4.0",
    "@react-spring/web": "^9.7.0"
  }
}
```

For broad browser support (Safari, Firefox without flag), wrap scroll-driven CSS in `@supports`:

```css
@supports (animation-timeline: scroll()) {
  /* Native CSS scroll-driven animations */
  .nav-morph { animation: nav-animation ease-in-out both; animation-timeline: scroll(); }
}

@supports not (animation-timeline: scroll()) {
  /* Use Framer Motion useScroll + useTransform fallback */
  /* JS handles the animation via React state */
}
```

---

## 7. Performance Notes from Reference Sites

- Twine uses `will-change` implicitly via animations
- Both sites use `transform` and `opacity` only (GPU-accelerated)
- ToDesktop uses `mask-position` for the magnifier (composited)
- Avoid animating `width`, `height`, `top`, `left` directly — use `transform: scale/translate` instead
- All transitions on the same element use the same timing function for cohesion

---

## 8. Final Direction Statement

> Alive5 v3 will feel like Twine met ToDesktop and they both decided to keep Alive5's warm orange identity.
>
> **From Twine:** the editorial restraint, the scroll-driven sectional animations, the floating glass navbar, the grayscale-to-color photography reveal, the rotate-and-caption card sequences.
>
> **From ToDesktop:** the premium dark hero gradients, the animated illustrations in feature cards, the bouncing app icon clouds, the MacBook product reveal, the smooth micro-interactions on every interactive element.
>
> **From Alive5:** the orange `#EB5124`, the grey `#48484A`, Poppins typography, sentence case, the brand voice ("Personalized answers powered by your knowledge, 24/7").

Build with motion as a first-class citizen, not an afterthought.
