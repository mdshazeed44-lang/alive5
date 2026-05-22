# Alive5.com Redesign — Claude Code Build Specification

> Paste this as your initial prompt to Claude Code. The accompanying `alive5-content/` folder contains all 121 page content files. The accompanying `alive5-audit/` folder contains routes, asset inventory, and the URL map. Reference these throughout the build.

---

## 0. CONTEXT

You are building a complete redesign of **Alive5.com**, a B2B SaaS that provides AI chatbots, live web chat, SMS/text messaging, and Facebook Messenger — unified into a single team inbox for customer service. Their customers include professional and college sports teams, government agencies, higher education, healthcare, and retail.

**Current site:** https://www.alive5.com (dated, weak typography, basic UI)  
**Goal:** Premium, modern marketing site — inspired by [Twine.com](https://twine.com) (editorial minimalism, content-first) and [ToDesktop.com](https://www.todesktop.com) (premium SaaS polish, depth, motion).

**Constraint:** 100% compliant with the official Alive5 Brand Guide (August 2023). No deviation on fonts or colors — modernization happens via layout, composition, motion, and depth.

**Migration target:** After build, this codebase will be migrated to Lovable. Use Lovable-friendly patterns (single-file components when reasonable, standard React patterns, no exotic dependencies).

---

## 1. TECH STACK (FIXED)

- **React 18** + **Vite** + **TypeScript** (strict mode)
- **TailwindCSS 3.4** with custom theme extension
- **React Router v6** for multi-page routing
- **Framer Motion** for animations (heavy use — see Section 10)
- **Lucide React** for icons
- **shadcn/ui** for accessible primitives (button, dialog, accordion, tabs, sheet)
- **clsx** + **tailwind-merge** for className composition
- **Poppins** font via Google Fonts

---

## 2. PROJECT SETUP

Run these commands first:

```bash
npm create vite@latest alive5-web -- --template react-ts
cd alive5-web
npm install
npm install react-router-dom framer-motion lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p

# shadcn/ui setup
npx shadcn-ui@latest init
npx shadcn-ui@latest add button dialog accordion tabs sheet card badge
```

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 3. DESIGN TOKENS — `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // ===== BRAND (LOCKED — from official Alive5 Brand Guide 2023) =====
        alive5: {
          orange: '#EB5124',  // PMS 7579 — primary brand
          grey:   '#48484A',  // PMS 7540 — primary text
          white:  '#FFFFFF',
        },
        // ===== ORANGE RAMP (computed from brand orange) =====
        orange: {
          50:  '#FEF4EE',
          100: '#FCE3D2',
          200: '#F9CEB3',   // == brand peach
          300: '#F5B088',
          400: '#F08560',
          500: '#EB5124',   // brand primary
          600: '#D63F18',
          700: '#B33212',
          800: '#8F2810',
          900: '#6E2010',
        },
        // ===== GREY RAMP (computed from brand grey) =====
        grey: {
          50:  '#F5F5F6',
          100: '#E8E8EA',
          200: '#D1D1D4',
          300: '#B0B0B3',
          400: '#9E9D9E',   // brand light-grey
          500: '#73737A',
          600: '#5C5C5F',
          700: '#48484A',   // brand primary grey
          800: '#2E2E30',
          900: '#1F1F20',
        },
        // ===== OFFICIAL ACCENT COLORS (use ONLY as specified by brand) =====
        accent: {
          'light-blue':  '#A5DBDB',  // PMS 572
          'yellow':      '#FFD889',  // PMS 1205
          'teal':        '#278B93',  // PMS 5483
          'green':       '#7CB65E',  // PMS 7489
          'light-green': '#BFE0BB',  // PMS 7485
          'navy':        '#0E4F74',  // PMS 3025
          'peach':       '#F9CEB3',  // PMS 475
          'purple':      '#955683',  // PMS 7655
          'pink':        '#F8B4BD',  // PMS 707
        },
        // ===== SURFACES =====
        surface: {
          page:  '#FFFFFF',
          soft:  '#FAFAFA',
          grey:  '#F5F5F6',
          cream: '#FFF8F2',
          dark:  '#1F1F20',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // brand-compliant scale
        'display': ['88px', { lineHeight: '96px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1':      ['72px', { lineHeight: '80px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2':      ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '700' }],
        'h3':      ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h4':      ['20px', { lineHeight: '28px', letterSpacing: '-0.005em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'body':    ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'small':   ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'legal':   ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        'sm':  '4px',
        'DEFAULT': '6px',  // brand button radius
        'md':  '8px',
        'lg':  '12px',
        'xl':  '20px',
        '2xl': '32px',
      },
      boxShadow: {
        'xs':  '0 1px 2px rgba(72, 72, 74, 0.05)',
        'sm':  '0 2px 4px rgba(72, 72, 74, 0.06), 0 1px 2px rgba(72, 72, 74, 0.04)',
        'md':  '0 8px 16px -4px rgba(72, 72, 74, 0.08), 0 2px 4px -1px rgba(72, 72, 74, 0.06)',
        'lg':  '0 16px 32px -8px rgba(72, 72, 74, 0.12), 0 6px 12px -4px rgba(72, 72, 74, 0.08)',
        'xl':  '0 24px 48px -12px rgba(72, 72, 74, 0.16), 0 8px 16px -8px rgba(72, 72, 74, 0.10)',
        '2xl': '0 32px 64px -16px rgba(72, 72, 74, 0.20), 0 12px 24px -8px rgba(72, 72, 74, 0.12)',
        'orange':  '0 12px 32px -8px rgba(235, 81, 36, 0.35)',
        'orange-lg': '0 24px 48px -12px rgba(235, 81, 36, 0.40)',
      },
      maxWidth: { '8xl': '1440px' },
      animation: {
        'marquee':       'marquee 30s linear infinite',
        'marquee-slow':  'marquee 60s linear infinite',
        'fade-in':       'fade-in 0.6s ease-out',
        'fade-up':       'fade-up 0.8s ease-out',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body { @apply font-sans text-body text-grey-700 bg-surface-page; }
  /* Brand rule: headlines never end with punctuation, sentence case only */
  h1, h2, h3, h4 { @apply font-display; }
}

@layer components {
  /* Brand-compliant button base */
  .btn { @apply inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 rounded; }
  .btn-orange { @apply btn bg-alive5-orange text-white hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-orange px-6 py-3.5 text-small; }
  .btn-grey   { @apply btn bg-alive5-grey text-white hover:bg-grey-800 hover:-translate-y-0.5 hover:shadow-lg px-6 py-3.5 text-small; }
  .btn-ghost  { @apply btn bg-transparent text-alive5-grey border-[1.5px] border-alive5-grey hover:bg-alive5-grey hover:text-white px-6 py-3.5 text-small; }
}
```

---

## 4. BRAND RULES (NON-NEGOTIABLE)

Reference: official Alive5 Brand Guide 2023.

### Typography
- **Font:** Poppins ONLY (weights 400 Regular and 700 Bold per brand; 500/600 acceptable for nuance)
- **Headlines:** Bold, sentence case, NO end punctuation, left-aligned
- **Subheads:** Bold, sentence case, end punctuation OK
- **Body:** Regular, sentence case, left-aligned, NEVER colored (only grey-700, black, or white)
- **NEVER use ALL CAPS or Title Case anywhere**

### Colors
- **Headlines** may only appear in: `alive5-orange`, `alive5-grey`, black, or white
- **Body** may only appear in: `alive5-grey`, black, or white
- **Backgrounds** primarily white; accent colors only for sectional bg blocks
- **Secondary palette** (teal, navy, purple, pink, etc.) only for digital depth (icons, illustrations, small accents) — never for headlines, body, or full-page backgrounds
- **DO NOT** create tints/values that deviate from the official palette

### Logo
- Use exact provided URLs (see Section 11)
- No drop shadows, no gradients, no outlines, no recoloring
- Min size 50px width; clear space ≥ logo height
- Color logo on light bg; white logo on color bg

### Buttons
- Border radius: 6px (brand spec)
- Two filled styles: `btn-orange` and `btn-grey` (interchangeable per brand)
- One outlined style: `btn-ghost` (with `→` arrow on "Learn more" pattern)
- Min height 44px (accessibility-lifted from brand's 30px)
- Wide letter-spacing on button text (~0.5px / 15pt scaled)

---

## 5. FILE STRUCTURE

```
alive5-web/
├── public/
│   └── (favicon, robots.txt)
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn primitives
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   ├── marketing/
│   │   │   ├── Hero.tsx
│   │   │   ├── LogoCloud.tsx
│   │   │   ├── FeatureGrid.tsx
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── TabsProduct.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   ├── IndustryTile.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── PlaybookCard.tsx
│   │   │   ├── ComparisonTable.tsx
│   │   │   └── CaseStudyCard.tsx
│   │   ├── motion/
│   │   │   ├── FadeUp.tsx       # scroll-reveal wrapper
│   │   │   ├── Parallax.tsx     # scroll parallax wrapper
│   │   │   └── Marquee.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── Icon.tsx
│   ├── pages/
│   │   ├── Home.tsx             # /
│   │   ├── LiveChat.tsx         # /live-chat
│   │   ├── Chatbots.tsx         # /chatbots
│   │   ├── BusinessSMS.tsx      # /business-sms
│   │   ├── ... (all 121 pages, see Section 7)
│   ├── content/                 # markdown files (drop alive5-content/ here)
│   ├── lib/
│   │   ├── utils.ts             # cn() helper
│   │   └── routes.ts            # route metadata
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 6. SHARED COMPONENTS — KEY SAMPLES

### `src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

### `src/components/shared/Button.tsx`
```tsx
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type Variant = 'orange' | 'grey' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  orange: 'bg-alive5-orange text-white hover:bg-orange-600 hover:shadow-orange',
  grey:   'bg-alive5-grey text-white hover:bg-grey-800 hover:shadow-lg',
  ghost:  'bg-transparent text-alive5-grey border-[1.5px] border-alive5-grey hover:bg-alive5-grey hover:text-white',
};
const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-small min-h-[40px]',
  md: 'px-6 py-3.5 text-small min-h-[44px]',
  lg: 'px-8 py-4 text-body min-h-[52px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'orange', size = 'md', showArrow, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded font-bold tracking-wide transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alive5-orange focus-visible:ring-offset-2',
        variantClasses[variant], sizeClasses[size], className,
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
    </button>
  ),
);
Button.displayName = 'Button';
```

### `src/components/motion/FadeUp.tsx`
```tsx
import { motion, type MotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface FadeUpProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className, ...props }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

### `src/components/layout/Navbar.tsx` (pattern to follow)
- Sticky top, glass-blur backdrop (`backdrop-blur-md bg-white/70`) on scroll
- Left: Alive5 color logo (use exact CDN URL)
- Center/Right: nav menu (Platform dropdown, Industries dropdown, Pricing, Resources, About)
- Far right: "Login" ghost button + "Schedule Demo" orange button
- Mobile: hamburger → sheet (slide-in drawer with full menu)

### `src/components/layout/Footer.tsx` (pattern to follow)
- `bg-grey-900` dark background, white text
- 4-column grid on desktop: Platform / Resources / Company / Legal
- Top: white Alive5 logo + tagline
- Bottom: copyright + social links (Facebook, Twitter, LinkedIn)
- Include compliance badges row (AWS Partner, SOC2, PCI, Techstars) above the footer or in a separate band

---

## 7. ROUTING — ALL 121 PAGES

Set up React Router with these exact route mappings. Page content for each route is in `src/content/{slug}.md` (read with a markdown loader or vite-plugin-markdown).

### Tier 1 — Core Product (12 routes)
| Route | Component | Content file |
|---|---|---|
| `/` | Home | `index.md` |
| `/live-chat` | LiveChat | `live-chat.md` |
| `/chatbots` | Chatbots | `chatbots.md` |
| `/business-sms` | BusinessSMS | `business-sms.md` |
| `/sms-texting-for-business` | SMSTextingBusiness | `sms-texting-for-business.md` |
| `/facebook-messenger` | FacebookMessenger | `facebook-messenger.md` |
| `/crm` | CRM | `crm.md` |
| `/qr-codes` | QRCodes | `qr-codes.md` |
| `/10dlc` | TenDLC | `10dlc.md` |
| `/api` | API | `alive5-public-api.md` |
| `/alive5-public-api` | PublicAPI | `alive5-public-api.md` |
| `/how-pricing-works` | Pricing | `how-pricing-works.md` |

### Tier 2 — Industry Pages (10 routes)
| Route | Component | Content |
|---|---|---|
| `/sports` | Sports | `sports.md` |
| `/gov` | Government | `gov.md` |
| `/retail` | Retail | `retail.md` |
| `/retail-copy` | RetailCopy | `retail-copy.md` |
| `/tourism` | Tourism | `tourism.md` |
| `/sms-for-health-and-wellness` | HealthWellness | `sms-for-health-and-wellness.md` |
| `/sms-for-admissions-and-recruiting` | HigherEd | `sms-for-admissions-and-recruiting.md` |
| `/ai-chatgpt-chatbot-for-your-college-and-university` | CollegeChatGPT | `ai-chatgpt-chatbot-for-your-college-and-university.md` |
| `/virtual-conference-exhibit-software` | VirtualConference | `virtual-conference-exhibit-software.md` |
| `/conferences` | Conferences | `conferences.md` |

### Tier 3 — Competitor Alternatives (10 routes)
| Route | Component | Content |
|---|---|---|
| `/zipwhip-alternative` | ZipwhipAlt | `zipwhip-alternative.md` |
| `/zipwhip-replacement` | ZipwhipReplacement | `zipwhip-replacement.md` |
| `/zipwhip-nextsteps` | ZipwhipNextSteps | `zipwhip-nextsteps.md` |
| `/zipwhip-thankyou` | ZipwhipThankYou | `zipwhip-thankyou.md` |
| `/podium-alternative` | PodiumAlt | `podium-alternative.md` |
| `/twilio-alternative-replacement` | TwilioAlt | `twilio-alternative-replacement.md` |
| `/cant-send-sms-vonage` | VonageAlt | `cant-send-sms-vonage.md` |
| `/ringcentral--sms` | RingCentralAlt | `ringcentral--sms.md` |
| `/cant-send-sms-zoom-phone` | ZoomPhoneAlt | `cant-send-sms-zoom-phone.md` |
| `/comcast-business-sms-texting` | Comcast | `comcast-business-sms-texting.md` |

### Tier 4 — Company / About (12 routes)
| Route | Component | Content |
|---|---|---|
| `/about-us` | About | `about-us.md` |
| `/contact-us` | Contact | `contact-us.md` |
| `/employment-opportunities` | Careers | `employment-opportunities.md` |
| `/security-overview` | Security | `security-overview.md` |
| `/case-studies` | CaseStudies | `case-studies.md` |
| `/roadmap` | Roadmap | `roadmap.md` |
| `/roadmap7963a548` | RoadmapAlt | `roadmap7963a548.md` |
| `/copy-of-product-roadmap` | RoadmapCopy | `copy-of-product-roadmap.md` |
| `/thank-you` | ThankYou | `thank-you.md` |
| `/doherty` | DohertyCase | `doherty.md` |
| `/customer-success-spotlight-clemson-athletics` | ClemsonCase | `customer-success-spotlight-clemson-athletics.md` |
| `/techstars` | Techstars | `techstars.md` |
| `/enterprise-ready` | EnterpriseReady | `enterprise-ready.md` |

### Tier 5 — Playbooks (36 routes)
- `/playbooks` → PlaybooksHub
- `/playbook-picker` → PlaybookPicker
- `/playbooks-channel` → PlaybooksChannel
- `/playbooks-industries` → PlaybooksIndustries
- `/playbook-department` → PlaybookDepartment
- `/playbooks/livechat-sales-support` → PBLiveChatSales
- `/playbooks/ai-chatbot-with-livechat-support` → PBAIChatbot
- `/playbooks/sms-1to1-vip-support` → PBVIP
- `/playbooks/digital-business-cards` → PBCards
- `/playbooks/turn-voicemails-into-sms-text-messages` → PBVoicemail
- `/playbook/setting-up-live-chat-for-your-organization` → PBLiveChatSetup
- `/playbooks/5` through `/playbooks/29` (25 numbered playbook routes) — use ONE component `PlaybookDetail` that reads the playbook number from URL params and loads content dynamically from `playbooks-{n}.md`

### Tier 6 — Blog (19 routes)
| Route | Component | Content |
|---|---|---|
| `/blog` | BlogIndex | `blog.md` |
| `/why-universities-must-employ-an-sms-strategy-to-recruit-gen-z-students` | BlogPost | (corresponding .md) |
| `/maximizing-your-sms-texting-a-guide-to-the-top-12-best-practices` | BlogPost | ... |
| `/revolutionizing-communication-how-text-messaging-is-overtaking-email-as-the-preferred-b2c-channel` | BlogPost | ... |
| `/maximizing-customer-interaction-how-conversational-marketing-drives-successful-engagement` | BlogPost | ... |
| `/fan-engagement-and-outreach-in-2023-how-sms-is-the-proven-method-for-selling-sports-tickets` | BlogPost | ... |
| `/alive5-live-chat-routing-and-reporting-overview` | BlogPost | ... |
| `/texting-for-health-and-wellness` | BlogPost | ... |
| `/best-practices-for-sms-opt-ins` | BlogPost | ... |
| `/understanding-tcpa-compliance-for-sms-texting` | BlogPost | ... |
| `/10dlc-and-what-it-means-for-texting` | BlogPost | ... |
| `/shifts-in-college-enrollment-post-covid` | BlogPost | ... |
| `/capturing-utm-parameters-from-web-chat-sessions` | BlogPost | ... |
| `/passing-custom-variables-into-web-chat-sessions` | BlogPost | ... |
| `/7-concepts-that-will-make-you-an-expert-in-chatbot-marketing` | BlogPost | ... |
| `/intro-to-alive5-business-chat-sms` | BlogPost | ... |
| `/alive5-troubleshooting` | BlogPost | ... |
| `/10dlc-and-privacy-policy-compliance` | BlogPost | ... |
| `/4-steps-needed-for-10dlc-compliance` | BlogPost | ... |

→ Use ONE `BlogPost` template component. Routes can be registered dynamically by reading filenames from `src/content/`.

### Tier 7 — Legal (6 routes)
| Route | Component | Content |
|---|---|---|
| `/privacy-policy` | Privacy | `privacy-policy.md` |
| `/terms-of-service` | Terms | `terms-of-service.md` |
| `/terms-of-service-affiliates` | TermsAffiliates | `terms-of-service-affiliates.md` |
| `/gdpr-policy` | GDPR | `gdpr-policy.md` |
| `/cookie-policy` | CookiePolicy | `cookie-policy.md` |
| `/disclosure` | Disclosure | `disclosure.md` |

### Tier 8 — Misc (10+ routes)
- `/webinar-ahl` → Webinar
- `/rohit-consult` → RohitConsult
- `/bug-bounty` → BugBounty
- `/newsletter-subscription` → Newsletter
- `/service-status` → ServiceStatus
- `/sms-old` → SmsOld
- `/websitealive-vs-alive5-comparison-and-migration-plan` → MigrationPlan
- `/copy-of-pricing` → PricingCopy
- `/pricing-new-html` → PricingNew
- `/pricing-x` → PricingX
- `/pricing---comcast-business-sms` → PricingComcast

**Note:** Full route list with metadata is in `alive5-audit/routes-map.json`. All 121 routes are there. Use that as the source of truth.

---

## 8. SECTION COMPONENT PATTERNS

### Hero (homepage and product pages)
```tsx
// Pattern:
// - Large H1 (text-h1 or text-display), Poppins Bold, sentence case, no period
// - 1-2 sentence body-lg subtitle in grey-700
// - Dual CTA: btn-orange "Schedule Demo" + btn-ghost "See product →"
// - Optional: small kicker text above H1 (e.g., "A.I. WEB CHAT + SMS") in alive5-orange, font-bold, tracking-widest, text-small (uppercase ONLY for kicker labels — this is the one exception)
// - Right side: product preview image or animated chat-bubble mockup
// - Use FadeUp + staggered children for entrance
// - Optional: subtle Parallax on hero image
```

### LogoCloud
```tsx
// "Trusted by professional and college sports, government, higher education, and retail"
// Then a marquee row of partner/customer logos
// Use the Marquee component (CSS animation, pauses on hover)
```

### BentoGrid (for "Why Alive5" / features showcase)
- Mix of card sizes: 1 large (col-span-2 row-span-2) + 4 small cards
- Each card: icon (Lucide) + headline (text-h4) + body copy
- Cards on `surface-soft` bg with `rounded-xl` and `shadow-sm`
- Hover: lift effect + shadow upgrade

### TabsProduct (showcase Live Chat / SMS / Chatbot / FB Messenger)
- Tabs at top (shadcn/ui tabs)
- Each tab shows a product screenshot + 3 bullet points
- Smooth transition between tabs (Framer Motion AnimatePresence)

### Stats
- 3-4 big numbers in a row: count-up animation on scroll-into-view
- e.g., "24/7 AI response", "60-day pilot", "100+ enterprise customers"

### Testimonial (Twine editorial style)
- Large pull-quote with Poppins Bold, italic optional
- Quote in alive5-grey (NOT in colors per brand)
- Attribution: name + title + customer logo
- Background: surface-cream or surface-soft

### CTABanner
- Full-width bg-alive5-orange OR bg-grey-900 section
- H2 + body + CTA button
- Optional: small chat-bubble illustration in background

---

## 9. ANIMATION PLAYBOOK (Framer Motion — HEAVY USE)

User wants HEAVY animation. Apply liberally:

### Scroll-reveals (everywhere)
- Use `FadeUp` wrapper on every section heading, image, and major content block
- Stagger children: each child fades up 100ms after the previous

### Parallax
- Hero images: light parallax (`y: [0, -50]` on scroll)
- Decorative shapes/blobs in backgrounds: heavier parallax
- Implement with `useScroll` + `useTransform` from framer-motion

### Micro-interactions
- Button hover: `whileHover={{ y: -2 }}`, shadow growth
- Card hover: lift + shadow + slight scale (1.02)
- Image hover: subtle zoom (scale 1.05) with overflow-hidden parent
- Nav link hover: underline draw-in from left
- Icon hover: rotate or pulse

### Page transitions
- Wrap routes in AnimatePresence
- Fade + slight slide between routes (200ms)

### Hero animations (homepage)
- Headline: characters/words stagger in (use framer-motion's `staggerChildren`)
- Subtext: fade-up after headline
- CTA buttons: pop-in with scale 0.9 → 1.0
- Hero image: slide-up + fade-in with slight rotation

### Chat-bubble demo (homepage section)
- Animated chat bubbles appearing one after another
- Typing indicator (three dots pulse) before each AI response
- Use Framer Motion's `motion.div` with `initial`, `animate`, `transition`

### Marquee
- Continuous horizontal scroll, pauses on hover
- Duplicate content for seamless loop

### Counter / Stats
- Numbers count up from 0 to target when scrolled into view
- Use `useInView` + animate with custom hook

**Performance:** Use `will-change: transform`, `transform: translateZ(0)` on heavy elements. Lazy-load components below the fold.

---

## 10. ASSET URLs (use these exact URLs — Alive5's CDN)

### Logos (REQUIRED everywhere)
```
Color logo (use on light bg):
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_RGB_2023-01-high-01-1920w.png

White logo (use on dark bg):
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_WHT_2023-1920w.png
```

### Trust / Compliance Badges
```
AWS Partner:    https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/logo_aws-84d4533b-662w.png
SOC 2 / CPA:    https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/SOC_CPA_Blue-1920w.png
PCI Compliant:  https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/pci-1920w.png
Techstars:      https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Techstars-alive5-1920w.png
BBB:            https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/bbb-logo-CBB941BD50-seeklogo.com_-1920w.png
Google Play:    https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/google-play-badge-e9ee6f15-1920w.png
```

### Hero / Product Screenshots
```
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/a5-home-1-b19e9542-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/a5-home-2-427a0f7a-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/a5-home-3-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/a5-home-4-e81bef4b-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/reporting-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/phone-image-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Text-Message-Image-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/sms-works-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/allinone-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/qrdemo-dd1ef3c7-1920w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/10DLC-1920w.png
```

### Industry Imagery
```
Sports:    https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/sports-image-1920w.png
Higher Ed: https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Collegekids-1920w.png
Health:    https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/doctor-text-1920w.png
```

### Chat Bubble Avatars (for animated chat demo)
```
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-2-68w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-3-68w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman2-68w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman3-68w.png
https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/cheerful-woman-smiles-warmly-against-bright-orange-background_1082141-69531-68w.jpg
```

→ Full image inventory (218 unique URLs across all pages) is in `alive5-audit/all-images.json`. Reference for each page's required images.

---

## 11. CONTENT SOURCING

All 121 pages have crawled content as markdown in `src/content/{slug}.md`.

Each file has frontmatter:
```yaml
---
url: https://www.alive5.com/<slug>
title: <page title>
description: <meta description>
status_code: 200
slug: <slug>
---

<markdown content>
```

**For each page component:**
1. Read the corresponding `.md` file
2. Extract: title, description, hero text, body sections, lists, CTA copy
3. Render through your section components (Hero, FeatureGrid, etc.)
4. Use the title/description for `<title>` and `<meta name="description">` via React Helmet or similar

**Tooling option:** Use `vite-plugin-markdown` or write a simple `useMarkdown(slug)` hook that imports the raw markdown via `import.meta.glob`.

---

## 12. HOMEPAGE LAYOUT SPEC (build first — see Section 14)

The current Alive5 homepage's value prop is: **"Personalized answers powered by your knowledge, 24/7."** — preserve this as the H1.

### Sections (top to bottom)
1. **Navbar** (sticky, glass-blur on scroll)
2. **Hero**
   - Kicker: `A.I. WEB CHAT + SMS` (orange, tracking-widest, small text — ONE allowed all-caps kicker)
   - H1: "Personalized answers powered by your knowledge, 24/7" (text-display or text-h1, grey-700)
   - Subtitle: "A shared inbox where every customer question gets answered — by your team or AI that knows your business." (body-lg)
   - Dual CTA: "Schedule a Live Demo" (orange) + "See how it works →" (ghost)
   - Right: animated chat-bubble mockup OR product screenshot (a5-home-1)
3. **Chat-channel showcase** — 5 chat bubble examples in a row (AI Chatbot, Live Chat, SMS, FB Messenger, Spanish SMS) — recreate the existing pattern but with smoother animations
4. **LogoCloud / Trust band** — "Trusted by professional and college sports, government, higher education, and retail"
5. **Problem section** — "Provide exceptional service at the speed of A.I." with 3 cards: Overwhelmed team / Never ending training / Prospects leaving
6. **AI training feature** — "A.I. trained only on your business" — 4 features: Learns your website, Answers with sources, Upload company docs, Solves complex inquiries (BentoGrid)
7. **Team inbox showcase** — "A team inbox for streamlined messaging" — TabsProduct showing Live Web Chat / SMS / Social Messaging
8. **Interactive demo embed** — Storylane embed or product walkthrough (preserve current outbound text demo concept)
9. **Industries grid** — 6 industry tiles (Sports, Government, Higher Ed, Retail, Healthcare, Tourism) linking to industry pages
10. **Testimonial** — Clemson Athletics case study pull-quote
11. **Pricing teaser** — "Simple, transparent pricing" with link to /how-pricing-works
12. **FAQ accordion** — 6-8 common questions
13. **CTA Banner** — orange bg, "Ready to convert more leads?" + "Schedule a Live Demo" CTA
14. **Footer** — dark grey, 4-column, trust badges row above

---

## 13. PER-PAGE LAYOUT NOTES (Tier 1 pages)

For each product/industry page, follow this general structure (customize per page based on content file):

```
1. Navbar (shared)
2. Hero (kicker → H1 → subtitle → dual CTA → right-side image)
3. Trust band (LogoCloud — abbreviated)
4. Features section (3-4 features in grid or bento)
5. Use case section (2-3 use cases with imagery)
6. Integration showcase (where applicable — CRM logos, etc.)
7. Comparison or stats (where applicable)
8. Testimonial / Case study
9. FAQ
10. CTA Banner
11. Footer (shared)
```

**Special pages:**
- **`/case-studies`** — Grid of customer case study cards (Doherty, Clemson, etc.)
- **`/blog`** — Blog index with filter tags + 3-column card grid
- **Blog posts** — Article layout: H1 + byline + hero image + prose content + CTA at end + 3 related posts
- **`/pricing` & `/how-pricing-works`** — 3-tier pricing table with feature comparison + FAQ + CTA
- **`/playbooks`** — Hub with categorized playbook tiles (filter by industry/channel/department)
- **Playbook detail (`/playbooks/N`)** — Single template that reads playbook content dynamically; show: title, hero image, problem, solution, setup steps, result metric
- **Legal pages** — Single-column reading layout with sticky TOC sidebar
- **Competitor alternative pages** — Heavy comparison table + migration steps + customer testimonial

---

## 14. BUILD ORDER

Execute in this exact sequence:

### Phase A: Foundation (Day 1)
1. Project scaffold (Section 2 commands)
2. Tailwind config + index.css (Section 3)
3. `utils.ts`, `Button`, `Container`, `Section` shared components
4. `Navbar`, `Footer` layout components
5. `FadeUp`, `Marquee`, `Parallax` motion wrappers
6. React Router setup with all 121 routes (use dynamic route registry from `routes-map.json`)
7. Basic page shells (just navbar + footer + "Coming soon" placeholder for each route)
8. Confirm dev server runs, all routes resolve

### Phase B: Marketing Sections (Day 2)
9. `Hero` component (with variants: with-image, with-mockup)
10. `LogoCloud` component
11. `FeatureGrid` + `BentoGrid` components
12. `TabsProduct` component (with shadcn tabs + Framer Motion AnimatePresence)
13. `Stats` component (with count-up)
14. `Testimonial` component
15. `CTABanner` component
16. `FAQ` accordion component

### Phase C: Tier 1 Pages (Day 3)
17. **Home** (highest priority — full section list above)
18. LiveChat, Chatbots, BusinessSMS (product pages)
19. CRM, QRCodes, 10DLC, API (feature pages)
20. Pricing (how-pricing-works)
21. FacebookMessenger, SMSTextingBusiness

### Phase D: Tier 2 Industry Pages (Day 4)
22. Sports, Gov, Retail, Tourism (industry pages — reuse industry template)
23. Healthcare, HigherEd, College ChatGPT
24. Conferences pages

### Phase E: Tier 3 Alternative Pages (Day 5)
25. Build a single `ComparisonPage` template
26. Apply to: Zipwhip, Twilio, Podium, RingCentral, Vonage, ZoomPhone, Comcast pages

### Phase F: Tier 4 Company Pages (Day 6)
27. About, Contact, Careers, Security, Case Studies, Roadmap, Thank You, etc.

### Phase G: Tier 5 Playbooks (Day 7)
28. Playbooks hub + picker + categories
29. PlaybookDetail template (handles all 25 numbered + named playbooks)

### Phase H: Tier 6 Blog (Day 8)
30. BlogIndex with filters
31. BlogPost template (all 18 articles use same template)

### Phase I: Tier 7 Legal + Misc (Day 9)
32. Legal pages (Privacy, Terms, GDPR, Cookie, Disclosure) — single LegalPage template with sticky TOC
33. Misc pages (Webinar, Bug Bounty, Newsletter, Service Status, etc.)

### Phase J: Polish (Day 10)
34. SEO meta tags on every page (use React Helmet Async)
35. OpenGraph + Twitter cards
36. Sitemap.xml generation
37. 404 page (branded)
38. Loading skeleton states
39. Lighthouse audit + fixes
40. Mobile responsiveness pass
41. Cross-browser test

---

## 15. QUALITY STANDARDS

- **Responsive:** Mobile-first; verified breakpoints at 375px, 768px, 1024px, 1440px
- **Accessibility:** WCAG 2.1 AA — semantic HTML, ARIA labels, keyboard nav, focus rings, alt text on all images, sufficient color contrast (use grey-700 not grey-400 for body)
- **Performance:** Lighthouse ≥ 90 on all metrics; lazy-load below-fold images; preload Poppins font; route-level code splitting
- **SEO:** Per-page `<title>`, meta description, OpenGraph tags, canonical URL, structured data where useful (Organization, BlogPosting, FAQPage)
- **TypeScript:** Strict mode; no `any`; proper prop interfaces
- **Naming:** Components in PascalCase; files match component name; tailwind classes follow logical order (layout → typography → color → state)

---

## 16. NON-NEGOTIABLE DON'Ts

- ❌ Don't use any font other than Poppins
- ❌ Don't use any color outside the official palette
- ❌ Don't put body copy in colors (only grey/black/white)
- ❌ Don't use Title Case or ALL CAPS (except the ONE kicker exception)
- ❌ Don't add drop shadows or gradients to the Alive5 logo
- ❌ Don't end headlines with periods
- ❌ Don't use generic stock imagery — only Alive5's CDN URLs from Section 10
- ❌ Don't add dependencies not in Section 1
- ❌ Don't ship pages without responsive testing
- ❌ Don't skip Framer Motion — animation is a key deliverable

---

## 17. WHAT'S BUNDLED WITH THIS PROMPT

The companion folder `alive5-redesign/` contains:
- `content/` — 121 markdown files (one per page) with crawled content
- `audit/url-inventory.md` — page categorization
- `audit/routes-map.json` — programmatic route list with metadata
- `audit/all-images.json` — full image asset inventory (218 unique URLs)
- `audit/crawl-inventory.json` — raw crawl metadata
- `design/brand-dna-and-design-system.md` — full design system reference
- `design/Alive5_BrandGuide_2023.pdf` — official brand guide

Drop these into your Claude Code workspace root or `/src/data/` and reference them as needed.

---

## 18. KICK-OFF INSTRUCTIONS

Start with Phase A (foundation). After scaffold + config + Navbar + Footer + Home shell are working, show me the result. Then proceed through Phases B–J in order, checking in after each phase.

For each page, BEFORE building, read the corresponding `content/{slug}.md` file to understand the actual copy and structure to preserve. Don't invent new content — adapt and elevate what's there.

**First deliverable expectation:** Working dev server with Navbar + Footer + Homepage hero section rendering with the new design system, using the exact Alive5 logo and Poppins font, with at least one Framer Motion entrance animation on the hero.

Begin.

---

## 19. REFERENCE SITE STUDY (CRITICAL — READ BEFORE BUILDING)

Two reference sites have been hard-crawled with HTML, screenshots, animation CSS, and 50+ images downloaded into the project bundle. **Study these BEFORE writing any animation code.**

### Files to read first:
1. **`ANIMATION_PLAYBOOK.md`** (project root) — Comprehensive animation specs:
   - 10+ exact Twine scroll-driven animation keyframes (navbar morph, section reveals, grayscale-to-color, card rotations, captions)
   - 10+ ToDesktop CSS animations (MacBook lid, code magnifier, build progress, smoke check pie, dashboard mouse, bouncing icons, status pulse)
   - Section-by-section mapping of which animation pattern applies to each Alive5 page section
2. **`REFERENCE_ASSETS.md`** (project root) — Complete URL manifest for fonts, images, Lottie files
3. **`references/twine/`** — Twine homepage:
   - `homepage_fullpage.png` — full screenshot (visual reference)
   - `page_part1.png`, `page_part2.png` — split for easy viewing
   - `images/` — 10 actual hero/feature images bundled
   - `inline_styles.css` — Twine's exact inline CSS (scroll-driven animations)
4. **`references/todesktop/`** — ToDesktop homepage:
   - `homepage_fullpage.png` + parts
   - `images/` — 42 feature illustrations + Lottie JSON
   - `animations.css` — extracted keyframe definitions
5. **`audit/twine_raw.html`** + **`audit/todesktop_raw.html`** — Full HTML for deeper inspection if needed

### Animation execution philosophy

The user wants HEAVY animation — every minor micro-interaction matters. Specifically:

**ALL of these must be in the build:**
1. ✅ Navbar that morphs from full-width to floating pill on scroll (Twine pattern)
2. ✅ Login button that fades out as you scroll
3. ✅ Hero headline with stagger character/word entrance
4. ✅ Hero CTAs with pop-in scale animation
5. ✅ Hero product image with subtle float + parallax
6. ✅ Chat bubble showcase with sequential entrance + typing indicator dots pulsing
7. ✅ Logo cloud marquee (continuous scroll, pauses on hover)
8. ✅ Scroll-driven section reveals on EVERY section (fade-up with intersection)
9. ✅ Card rotate-on-scroll (Twine pattern — cards rotate slightly as you scroll past)
10. ✅ Grayscale-to-color image reveal on testimonial photos
11. ✅ Tab content crossfade on TabsProduct
12. ✅ Bento card hover lift + shadow upgrade + scale 1.02
13. ✅ Icon hover rotations / pulses
14. ✅ Button hover -translateY(2px) + shadow grow
15. ✅ Nav link underline draw-in from left on hover
16. ✅ Industry tile reveal stagger on view
17. ✅ Stats numbers count-up animation
18. ✅ FAQ accordion smooth height + chevron rotate
19. ✅ Status dot pulse animation (ToDesktop pattern)
20. ✅ Footer reveal on intersection
21. ✅ Mobile menu popover with @starting-style opacity transition
22. ✅ Product dropdown menu with scale-in + scroll-aware positioning
23. ✅ Spinner rotate (rotate-1turn) for any loading states
24. ✅ Magnifier sliding across AI training feature card (ToDesktop pattern)
25. ✅ Build/progress card animations on AI training section
26. ✅ Bouncing icon row on "Trusted by" or integration section
27. ✅ MacBook-style float on hero product image
28. ✅ Section view-timeline scroll-driven animations on at least 3 sections
29. ✅ Page transition animations (fade + slide between routes)
30. ✅ CTA button gradient pulse on the final banner

### Browser support strategy

CSS Scroll-Driven Animations API works in Chrome/Edge 115+ and Firefox (with flag). For Safari and older browsers:

```tsx
// In motion/ScrollDriven.tsx — wrap with feature detection
export function ScrollDriven({ children, fallback }) {
  const supportsNative = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
  return supportsNative ? <>{children}</> : <>{fallback}</>;
}
```

Use Framer Motion's `useScroll` + `useTransform` for the JS fallback. The Navbar component MUST include both implementations.

### Font strategy

Brand-locked Poppins remains primary. BUT — for the **hero headline only**, study Twine's serif treatment. Consider:
- Option A: Stay 100% Poppins (safest, brand-compliant)
- Option B: Use Poppins for everything BUT allow `font-serif` (Times/system serif stack) for the ONE hero H1 on homepage — this is a stylistic choice that mirrors Twine's editorial feel while keeping body in Poppins. **Discuss with brand owner before implementing.**

For ToDesktop's Aeonik Pro feel, replicate the WEIGHT and SIZE rather than the actual font — Poppins Bold at 72-88px feels equally premium.

---

## 20. UPDATED FIRST DELIVERABLE EXPECTATION

After reading `ANIMATION_PLAYBOOK.md` thoroughly, the FIRST PR/checkpoint must include:

1. ✅ Vite + React + TS scaffold
2. ✅ Tailwind config with full token system from §3
3. ✅ Poppins font loaded
4. ✅ Navbar with scroll-morph animation (Twine pattern §2.1) — BOTH native CSS + Framer Motion fallback
5. ✅ Footer with status pulse (ToDesktop §3.9)
6. ✅ Homepage Hero with:
   - Stagger headline animation
   - Subtitle fade-up
   - Dual CTA with hover lift
   - Product image with float animation
7. ✅ At least ONE scroll-driven section reveal demonstrating Twine pattern §2.2
8. ✅ Chat bubble showcase with sequential entrance animation

Show me this checkpoint before proceeding to other pages.

