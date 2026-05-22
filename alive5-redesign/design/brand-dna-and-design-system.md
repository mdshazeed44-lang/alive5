# Alive5 Redesign — Final Design System (Brand-Compliant)

> ✅ Locked to official Alive5 Brand Guide (August 2023)  
> Premium polish from Twine + ToDesktop applied to LAYOUT, COMPOSITION, MOTION — NOT colors/fonts.

---

## 1. Brand-Locked Foundations (from official PDF)

### 1.1 Logo
**Files (from Alive5 CDN, ready to use):**
- Color logo: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_RGB_2023-01-high-01-1920w.png`
- White logo: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_WHT_2023-1920w.png`

**Rules (from brand guide):**
- Min size: 50px digital / 0.7" print
- Icon5 min size: 25px digital / 0.35" print
- Clear space ≥ logo height
- NO drop shadows, NO gradients, NO outline, NO recoloring
- Use color logo on light bg, white logo on color bg
- Never crop, never alter

### 1.2 Color Palette (OFFICIAL — locked)

```css
/* ========== PRIMARY ========== */
--alive5-orange:  #EB5124;   /* PMS 7579 C / RGB 235-81-36 */
--alive5-grey:    #48484A;   /* PMS 7540 C / RGB 72-72-74 */
--alive5-white:   #FFFFFF;

/* ========== ACCENT (primary palette) ========== */
--accent-blue:    #A5DBDB;   /* PMS 572 C — Light Blue */
--accent-yellow:  #FFD889;   /* PMS 1205 C */

/* ========== SECONDARY (digital depth ONLY — not body/headlines/bg) ========== */
--secondary-teal:        #278B93;   /* PMS 5483 C */
--secondary-green:       #7CB65E;   /* PMS 7489 C */
--secondary-light-green: #BFE0BB;   /* PMS 7485 C */
--secondary-navy:        #0E4F74;   /* PMS 3025 C */
--secondary-light-grey:  #9E9D9E;   /* PMS 422 C */
--secondary-peach:       #F9CEB3;   /* PMS 475 C */
--secondary-purple:      #955683;   /* PMS 7655 C */
--secondary-pink:        #F8B4BD;   /* PMS 707 C */

/* ========== DERIVED (computed shades for hover/depth — kept tonal to brand) ========== */
--orange-50:  #FEF4EE;
--orange-100: #FCE3D2;
--orange-200: #F9CEB3;   /* = secondary-peach */
--orange-500: #EB5124;   /* = primary orange */
--orange-600: #D63F18;   /* hover state */
--orange-700: #B33212;   /* active state */

--grey-50:  #F5F5F6;
--grey-100: #E8E8EA;
--grey-200: #D1D1D4;
--grey-400: #9E9D9E;     /* = secondary light-grey */
--grey-700: #48484A;     /* = primary alive5-grey */
--grey-900: #1F1F20;     /* near-black for max contrast */

/* ========== USAGE GUARDRAILS (per brand guide) ========== */
/* ✓ Headlines: orange, grey, black, OR white only */
/* ✓ Body copy: grey, black, OR white only — NEVER in colors */
/* ✓ Backgrounds: white primary; accent colors for sectional bg only */
/* ✗ Don't create tints/values that deviate from this palette */
/* ✗ Secondary palette (teal/green/navy/etc) is ONLY for digital depth — */
/*   never for headlines, body, or full-page backgrounds */
```

### 1.3 Typography (LOCKED to Poppins)

**Font:** Poppins (Bold 700 + Regular 400 only — per brand guide)

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
```

**Scale (brand-compliant ratios, web-scaled):**

| Element | Web (px/lh) | Brand spec | Weight | Tracking | Color rules |
|---------|-------------|------------|--------|----------|-------------|
| **Display** | 88 / 96 | (oversized hero variant) | 700 Bold | -1.5px | Orange/Grey/Black/White only |
| **H1** | 72 / 80 | 4.5X (min 36/43pt) | 700 Bold | -1.5px | Orange/Grey/Black/White only |
| **H2** | 48 / 56 | 3X (min 24/29pt) | 700 Bold | -1px | Orange/Grey/Black/White only |
| **H3** | 32 / 40 | (computed) | 700 Bold | -0.5px | Orange/Grey/Black/White only |
| **H4 / Subhead** | 20 / 28 | 1.5X (min 12/15pt) | 700 Bold | -0.25px | Orange/Grey/Black/White only |
| **Body** | 16 / 28 | 1X (min 8/12pt) | 400 Reg | 0 | Grey/Black/White only |
| **Body Large** | 18 / 30 | (lede paragraphs) | 400 Reg | 0 | Grey/Black/White only |
| **Small** | 14 / 22 | (captions/meta) | 400 Reg | 0 | Grey-700/Grey-400 |
| **Legal** | 12 / 18 | 0.75X (min 6/7pt) | 400 Reg | 0 | Grey-700 |
| **Button** | 14 / 20 | (CTA) | 700 Bold | +0.5px (~15pt scaled) | per button spec |

**Rules (per brand guide):**
- Always sentence case — NEVER Title Case, NEVER ALL CAPS
- Headlines: no end punctuation
- Subheads: use end punctuation
- Body: sentence case, never in colors
- Left-aligned default
- Optical kerning enabled

### 1.4 Buttons (per brand spec)

```css
/* Primary CTA — filled orange */
.btn-primary {
  background: var(--alive5-orange);     /* #EB5124 */
  color: var(--alive5-white);
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;                /* ~15pt tracking scaled */
  border-radius: 6px;                   /* per brand spec */
  min-height: 44px;                     /* (brand min 30px, lifted for tap targets) */
  padding: 14px 24px;                   /* (brand 15px padding ref) */
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}
.btn-primary:hover {
  background: var(--orange-600);        /* #D63F18 */
  transform: translateY(-1px);
  box-shadow: 0 8px 24px -8px rgba(235, 81, 36, 0.4);
}

/* Primary CTA — filled grey (interchangeable per brand) */
.btn-primary-grey {
  background: var(--alive5-grey);       /* #48484A */
  color: var(--alive5-white);
  /* ...same metrics... */
}

/* Outlined "Learn more >" style (per brand spec) */
.btn-ghost {
  background: transparent;
  color: var(--alive5-grey);
  border: 1.5px solid var(--alive5-grey);   /* brand: 1pt stroke */
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
  border-radius: 6px;
  min-height: 44px;
  padding: 14px 24px;
}
.btn-ghost::after {
  content: ' →';
  margin-left: 4px;
  transition: transform 200ms;
}
.btn-ghost:hover::after { transform: translateX(4px); }
.btn-ghost:hover {
  background: var(--alive5-grey);
  color: var(--alive5-white);
}
```

---

## 2. Modernization Layer (Twine + ToDesktop polish — non-brand-conflicting)

The brand locks fonts/colors/buttons. The MODERN feel comes from:

### 2.1 Layout & Composition
- ✨ Large hero canvas — 72-88px H1 (using Poppins Bold, brand-allowed)
- ✨ Generous whitespace (Twine vibe) — `padding: 80px 0` minimum on sections
- ✨ Bento grid for feature showcases (modern pattern)
- ✨ Auto-scrolling logo marquee (client trust)
- ✨ Tabbed product showcase (Live Chat / SMS / Chatbot / FB)
- ✨ Editorial pull-quote testimonials (Twine pattern, Poppins Bold large size)
- ✨ Sticky nav with glass-blur backdrop on scroll

### 2.2 Spacing System (4px base)
```
--space-1:  4px    --space-12: 48px
--space-2:  8px    --space-16: 64px
--space-3:  12px   --space-20: 80px
--space-4:  16px   --space-24: 96px
--space-6:  24px   --space-32: 128px
--space-8:  32px   --space-40: 160px
```

### 2.3 Border Radius
```
--radius-sm:  4px    /* tags, badges */
--radius-md:  6px    /* buttons, inputs (per brand button spec) */
--radius-lg:  12px   /* cards */
--radius-xl:  20px   /* feature blocks, modals */
--radius-2xl: 32px   /* hero canvases */
```

### 2.4 Shadows (premium depth on CARDS — NOT on logo per brand)
```css
--shadow-xs:   0 1px 2px rgba(72, 72, 74, 0.05);
--shadow-sm:   0 2px 4px rgba(72, 72, 74, 0.06), 0 1px 2px rgba(72, 72, 74, 0.04);
--shadow-md:   0 8px 16px -4px rgba(72, 72, 74, 0.08), 0 2px 4px -1px rgba(72, 72, 74, 0.06);
--shadow-lg:   0 16px 32px -8px rgba(72, 72, 74, 0.12), 0 6px 12px -4px rgba(72, 72, 74, 0.08);
--shadow-xl:   0 24px 48px -12px rgba(72, 72, 74, 0.16), 0 8px 16px -8px rgba(72, 72, 74, 0.10);
--shadow-orange: 0 12px 32px -8px rgba(235, 81, 36, 0.35);
```

### 2.5 Surfaces
```
--surface-page:    #FFFFFF      /* default white (per brand) */
--surface-soft:    #FAFAFA      /* subtle off-white for sections */
--surface-grey:    #F5F5F6      /* light grey panel */
--surface-cream:   #FFF8F2      /* warm orange-tinted bg (uses peach undertone) */
--surface-dark:    #1F1F20      /* dark sections — uses brand grey-900 */
```

---

## 3. Component Library (to build)

### Core (build first)
1. **Navbar** — sticky, glass-blur, logo + nav + CTA
2. **Footer** — grey-700 bg + white logo + multi-column links
3. **Button** (3 variants: orange-filled, grey-filled, ghost-outline)
4. **Container** — max-w 1280px, gutters
5. **Heading** — H1/H2/H3 components with brand rules

### Marketing sections (build second)
6. **Hero** — H1 + lede + dual CTA + visual
7. **LogoCloud** — "Trusted by" client logos
8. **FeatureGrid** — 3-up cards w/ icon + headline + copy
9. **BentoGrid** — mixed-size feature showcase
10. **TabsProduct** — tabbed showcase (Live Chat / SMS / Chatbot / FB)
11. **Stats** — bold numbers row
12. **Testimonial** — editorial pull-quote
13. **PricingTable** — 3-tier comparison
14. **FAQ** — accordion
15. **CTABanner** — full-width orange or grey gradient bg

### Pages-specific (build third)
16. **IndustryTile** — for industry grid
17. **BlogCard** — image + title + meta + tag
18. **PlaybookCard** — playbook tile
19. **ComparisonTable** — for "Alive5 vs Twilio/Zipwhip/etc."
20. **CaseStudyCard** — customer success

---

## 4. Tech Stack (confirmed)
- **React 18 + Vite + TypeScript** — Lovable-native
- **TailwindCSS 3.4** — custom theme matching tokens above
- **Framer Motion** — for hero + scroll-reveals (level TBD)
- **Lucide React** — icons
- **shadcn/ui** — accessible primitives (button, dialog, accordion, tabs)
- **React Router v6** — multi-page routing
- **Poppins** font via Google Fonts

---

## 5. Available Asset URLs (from Alive5 CDN)

### Logos
- Color: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_RGB_2023-01-high-01-1920w.png`
- White: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_WHT_2023-1920w.png`

### Trust badges
- AWS Partner: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/logo_aws-84d4533b-662w.png`
- SOC 2 / CPA: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/SOC_CPA_Blue-1920w.png`
- PCI: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/pci-1920w.png`
- Techstars: `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Techstars-alive5-247w.png`

### Hero product screenshots
- a5-home-1, a5-home-2, a5-home-3, a5-home-4 (cdn-website.com paths)

### Avatars (for chat bubble samples)
- man-2, man-3, woman2, woman3, cheerful-woman (cdn-website.com paths)

---

## 6. Summary: What Changed from v1 Draft

| | v1 Draft | **v2 (Brand-Compliant FINAL)** |
|---|---|---|
| **Heading font** | Aeonik Pro / Space Grotesk | **Poppins** (brand-locked) |
| **Body font** | Inter | **Poppins** (brand-locked) |
| **Neutral palette** | Custom navy ramp | **Official Alive5 Grey #48484A** + computed shades |
| **Button shape** | Pill (999px) | **6px radius** (brand-locked) |
| **Letter tracking** | Default | **+0.5px on buttons** (per brand 15pt spec) |
| **Headline case** | Mixed | **Sentence case only** (brand mandate) |
| **Accent colors** | Invented | **Official accents only** (light blue, yellow, teal, navy, peach, etc.) |

**Result:** 100% brand-compliant, but modernized via layout, composition, motion, depth, imagery — all the levers the brand guide doesn't restrict.
