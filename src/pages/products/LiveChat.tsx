import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Sparkles,
  MessageSquare,
  Globe,
  Smartphone,
  Bell,
  Users,
  PhoneOff,
  Layers,
  BarChart3,
  Shield,
  Zap,
  Bot,
  Palette,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { Typewriter } from '@/components/motion/Typewriter';
import { SEOHead } from '@/components/seo/SEOHead';

const CHANNELS = [
  {
    Icon: Globe,
    title: 'Website widgets',
    body: 'Embed Alive5 into your website and apps with a single line of code.',
    tint: 'bg-orange-100 text-alive5-orange',
  },
  {
    Icon: Layers,
    title: 'Short links',
    body: 'Start a chat anywhere — email signatures, business cards, print media — with short URLs.',
    tint: 'bg-accent-teal/15 text-accent-teal',
  },
  {
    Icon: Smartphone,
    title: 'Popups & landing pages',
    body: 'Increase engagement on key campaign pages with triggered chat popups.',
    tint: 'bg-accent-purple/15 text-accent-purple',
  },
];

const DISTRIBUTION = [
  { Icon: Bell, title: 'Ring all agents', body: 'Notify every team member of an incoming chat at once.' },
  { Icon: Users, title: 'Load-balanced routing', body: 'Assign chats with a fair-distribution algorithm.' },
  { Icon: PhoneOff, title: 'Offline flows', body: 'Capture the lead even when your team is away — no one waits.' },
  { Icon: Layers, title: 'Team channels', body: 'Create segments or teams to respond to incoming chats.' },
];

const CAPABILITIES = [
  { Icon: Palette, title: 'On-brand canned replies', body: 'Pre-approved templates, greetings, and FAQ responses — your tone, faster.' },
  { Icon: Smartphone, title: 'Mobile & desktop apps', body: 'Start on desktop, finish on mobile. No chat ever falls through the cracks.' },
  { Icon: BarChart3, title: 'Reporting & analytics', body: 'Real-time ROI, agent performance, transcripts, and CSAT trends.' },
  { Icon: Shield, title: 'Admin monitoring & QA', body: 'Review live chats, capture post-chat surveys, coach agents.' },
];

const STATS = [
  { value: '< 30s', label: 'Average first-response time' },
  { value: '5×', label: 'More qualified leads vs. forms' },
  { value: '24/7', label: 'A.I. handoff to humans' },
];

const FAQ = [
  {
    q: 'Can I use my existing brand colors and logo in the chat widget?',
    a: 'Yes — Alive5 chat widgets are fully white-labelled. Customize your widget colors, icons, fonts, position, and chat-window header to match your brand exactly.',
  },
  {
    q: 'Does Alive5 support multiple departments or teams?',
    a: "Yes. Create unlimited departments (Sales, Support, Returns, etc.). Each team has its own queue, routing rules, and operating hours. Chats land where they belong.",
  },
  {
    q: 'What happens after hours when no one is online?',
    a: 'Configure offline message flows that capture the visitor\'s phone or email, ask qualifying questions, and trigger an SMS reply when your team is next available. No lead lost.',
  },
  {
    q: 'Can the chatbot answer questions automatically?',
    a: 'Yes. Use our drag-and-drop builder for keyword-based flows, or upgrade to the A.I. Chatbot that learns from your website + PDFs and answers in seconds.',
  },
  {
    q: 'How quickly can I get Live Chat running?',
    a: 'Most teams go live in under a day. Drop our widget snippet on your site, configure routing, and train your team — that\'s it.',
  },
];

const STEPS = [
  { title: 'Book a demo', body: 'Quick 30-min call — we map your use case and chat strategy.' },
  { title: 'Tailor your widget', body: 'Brand colors, scripts, journeys, and CTAs — all configured to fit.' },
  { title: 'Train your team', body: 'We train your agents on routing, canned replies, and reporting.' },
  { title: 'Activate', body: 'Deploy widgets, short links, QR codes — start chatting.' },
];

export default function LiveChat() {
  return (
    <>
      <SEOHead
        title="Live Chat for Customer Service | Alive5"
        description="Convert website visitors with the Alive5 Live Chat widget. Drag-and-drop chatbot, team routing, on-brand canned replies, and a unified team inbox. Starts at $5/month."
        canonical="https://www.alive5.com/live-chat"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Alive5 Live Chat',
            description:
              'A unified live chat widget with on-brand widgets, team routing, offline flows, and built-in chatbot.',
            brand: { '@type': 'Brand', name: 'Alive5' },
          },
        ]}
      />

      {/* ============================================================
       * HERO
       * ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-32 pb-24 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900 md:pt-40 md:pb-32">
        <div className="pointer-events-none absolute -left-32 top-12 size-[28rem] rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-[28rem] rounded-full bg-accent-light-blue/30 blur-3xl dark:bg-accent-teal/20" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(72,72,74,0.10) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
          }}
        />

        {/* floating sparkles */}
        {[
          { x: 8, y: 22, d: 0 },
          { x: 92, y: 18, d: 1.2 },
          { x: 12, y: 70, d: 2.4 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4], rotate: [0, 12, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
          >
            <Sparkles className="size-4 text-alive5-orange/70" />
          </motion.span>
        ))}

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* LEFT: copy */}
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
                <Sparkles className="size-3.5" />
                Live Chat, on-brand
              </span>
              <h1 className="mt-6 text-h1 leading-[1.04] tracking-tight text-grey-900 md:text-[4rem]">
                Convert visitors
                <br />
                with chat that's{' '}
                <Typewriter
                  words={['on-brand.', 'real-time.', 'always on.']}
                  className="inline-block bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent"
                />
              </h1>
              <p className="mt-5 text-body-lg text-grey-700">
                A highly customizable chat widget with team routing, A.I. chatbot, and offline
                flows — so no website visitor ever waits, and no lead ever falls through.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  'Match your brand: colors, fonts, logo, position',
                  'Drag-and-drop chatbot — no code required',
                  'Routes to the right team based on URL, hour, or keyword',
                ].map((line) => (
                  <li key={line} className="flex items-center gap-2 text-body text-grey-800">
                    <span className="inline-flex size-5 items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange group !px-7 !py-4 text-body"
                >
                  Schedule a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/pricing" className="btn-ghost !px-7 !py-4 text-body">
                  See pricing
                </Link>
              </div>
            </FadeUp>

            {/* RIGHT: looping product video */}
            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-xl">
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-tr from-orange-300/40 via-orange-200/30 to-transparent blur-3xl dark:from-orange-900/40" />
                <div className="overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-2xl ring-1 ring-grey-200 dark:border-white/10 dark:bg-grey-800 dark:ring-white/10">
                  <video
                    src="/videos/livechat-loop.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="block h-auto w-full bg-white dark:bg-grey-900"
                    aria-label="Alive5 Live Chat widget — looping product demo"
                  >
                    Your browser does not support embedded video.
                  </video>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ============================================================
       * STATS STRIP
       * ============================================================ */}
      <section className="relative -mt-12 px-4">
        <Container className="relative">
          <Stagger
            className="mx-auto grid max-w-4xl gap-3 rounded-3xl border border-grey-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-grey-800 sm:grid-cols-3 md:p-8"
            stagger={0.08}
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="text-center">
                <p className="text-[2.5rem] font-bold leading-none text-alive5-orange">{s.value}</p>
                <p className="mt-2 text-small text-grey-700">{s.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================================================
       * START CONVERSATIONS ANYWHERE
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Anywhere your audience is
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Start conversations{' '}
            <span className="text-alive5-orange">anywhere</span>
          </h2>
        </FadeUp>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {CHANNELS.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className={`inline-flex size-12 items-center justify-center rounded-xl ${c.tint}`}>
                <c.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{c.title}</h3>
              <p className="mt-3 text-body text-grey-700">{c.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * BRANDABLE WIDGET PREVIEW
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <Palette className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Highly{' '}
              <span className="text-alive5-orange">customizable</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              On-brand conversational journeys and chat interfaces with your logo, color schemes,
              and widget icons — no visible "Alive5" badge unless you want one.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Widget colors, gradients, fonts, and corner radius',
                'Logo, agent avatar, and chat-window header',
                'Greeting, away message, and proactive triggers',
                'Hide branding for white-label deployments',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>

          {/* Branded widget preview mockup */}
          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-2xl dark:border-white/10 dark:bg-grey-800"
              >
                {/* Widget header */}
                <div className="flex items-center gap-3 bg-alive5-orange p-4 text-white">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-alive5-orange shadow-sm">
                    <MessageSquare className="size-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-small font-bold">Your Brand</p>
                    <p className="flex items-center gap-1 text-legal text-white/90">
                      <span className="relative inline-flex size-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent-green opacity-70" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-accent-green" />
                      </span>
                      Online — replies in &lt; 1m
                    </p>
                  </div>
                </div>

                {/* Chat body */}
                <div className="space-y-3 p-5">
                  <ChatLine side="left" text="👋 Hi! How can we help today?" />
                  <ChatLine side="right" text="Looking for season ticket info" />
                  <ChatLine side="left" text="Awesome — I'll grab our season-ticket guide. What's a good number to text?" />
                  <div className="rounded-xl border border-grey-200 bg-grey-50 p-3 dark:border-white/10 dark:bg-grey-900/40">
                    <input
                      type="tel"
                      placeholder="+1 (555) 555-5555"
                      className="w-full bg-transparent text-small text-grey-900 outline-none placeholder:text-grey-400 dark:text-white"
                    />
                  </div>
                  <button className="w-full rounded-xl bg-alive5-orange py-2.5 text-small font-semibold text-white shadow-orange transition-transform hover:scale-[1.02]">
                    Continue via text →
                  </button>
                </div>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * SMART CHAT DISTRIBUTION
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Smart routing
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Chat distribution{' '}
            <span className="text-alive5-orange">that scales</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Route every visitor to the right person — or the right bot — automatically.
          </p>
        </FadeUp>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {DISTRIBUTION.map((d) => (
            <motion.div
              key={d.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-grey-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <d.Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-h4 text-grey-900">{d.title}</h3>
              <p className="mt-2 text-small text-grey-700">{d.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * CAPABILITIES BAND (dark)
       * ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-grey-900 via-[#1c1c1f] to-grey-900 py-24 text-white md:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 size-[36rem] rounded-full bg-alive5-orange/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-[28rem] rounded-full bg-accent-purple/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <Container className="relative">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-orange-300">
              Capabilities
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-white md:text-[3rem]">
              Everything your team needs.{' '}
              <span className="bg-gradient-to-r from-alive5-orange via-orange-400 to-orange-600 bg-clip-text text-transparent">
                Nothing it doesn't.
              </span>
            </h2>
          </FadeUp>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {CAPABILITIES.map((c) => (
              <motion.div
                key={c.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-alive5-orange/20 text-alive5-orange ring-1 ring-alive5-orange/40">
                  <c.Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-h4 font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-small text-grey-300">{c.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================================================
       * WHY ALIVE5 LIVE CHAT
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-4xl rounded-3xl border border-grey-200 bg-white p-8 shadow-sm dark:bg-grey-800 md:p-12">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
            <Zap className="size-6" />
          </span>
          <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
            Why teams pick{' '}
            <span className="text-alive5-orange">Alive5 Live Chat</span>
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              { Icon: Users, text: 'Simple to learn — non-technical agents are productive day one' },
              { Icon: Globe, text: 'Scale to thousands of concurrent conversations' },
              { Icon: Bot, text: 'A.I. chatbot handoff for after-hours coverage' },
              { Icon: Clock, text: 'Save hours per agent per week with canned replies' },
              { Icon: Shield, text: 'SOC 2 Type II + GDPR + PCI-DSS — enterprise ready' },
              { Icon: BarChart3, text: 'CSAT, CES, and ROI dashboards out of the box' },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-body text-grey-800">
                <span className="mt-0.5 inline-flex size-6 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                  <Icon className="size-3.5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </FadeUp>
      </Section>

      {/* ============================================================
       * GET STARTED — 4 steps
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Live in days
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Get started{' '}
            <span className="text-alive5-orange">today</span>
          </h2>
        </FadeUp>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-alive5-orange text-small font-bold text-white shadow-orange">
                {i + 1}
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{s.title}</h3>
              <p className="mt-3 text-small text-grey-700">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * FAQ
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Common questions
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Live Chat{' '}
            <span className="text-alive5-orange">FAQ</span>
          </h2>
        </FadeUp>
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-sm dark:bg-grey-800"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 transition-colors hover:bg-grey-50 dark:hover:bg-grey-900/40">
                <span className="text-body font-semibold text-grey-900">{item.q}</span>
                <span className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-orange-100 text-alive5-orange transition-transform group-open:rotate-180">
                  <ArrowRight className="size-4 rotate-90" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-body text-grey-700">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </Section>

      {/* ============================================================
       * FINAL CTA
       * ============================================================ */}
      <Section bleed className="!py-0">
        <FadeUp>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-alive5-orange to-orange-700 px-6 py-24 text-center md:py-28">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
                backgroundSize: '26px 26px',
              }}
            />
            <Container className="relative max-w-3xl">
              <h2 className="mx-auto text-h2 text-white md:text-[3rem] md:leading-[1.05]">
                Ready to convert more visitors?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Drop a chat widget on your site in minutes. Live in days.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Book a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/pricing"
                  className="inline-flex min-h-[54px] items-center justify-center rounded border border-white/40 px-8 py-4 text-body font-semibold text-white transition-colors hover:bg-white/10"
                >
                  See pricing
                </Link>
              </div>
            </Container>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------- */

function ChatLine({ side, text }: { side: 'left' | 'right'; text: string }) {
  return (
    <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-small shadow-sm ${
          side === 'right'
            ? 'rounded-br-md bg-alive5-orange text-white'
            : 'rounded-bl-md bg-grey-100 text-grey-800 dark:bg-grey-900 dark:text-grey-200'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
