import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  Bot,
  Database,
  Inbox,
  Zap,
  BarChart3,
  Users,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { Typewriter } from '@/components/motion/Typewriter';
import { SEOHead } from '@/components/seo/SEOHead';

const FB_BLUE = '#0084FF';

const TOOLKIT = [
  {
    Icon: Bot,
    title: 'Build custom chatbot flows in 15 minutes or less',
    body: 'Drag-and-drop builder, no code. Greeting → qualification → handoff in under an hour.',
  },
  {
    Icon: Database,
    title: 'Capture customer data for your CRM',
    body: 'Every Facebook lead flows into Salesforce, Dynamics 365, or your custom CRM via API.',
  },
  {
    Icon: Inbox,
    title: 'Never miss a message and keep customers happy',
    body: 'Round-the-clock automation + team inbox routing so no inquiry sits unread.',
  },
];

const ACTIVATION_STEPS = [
  {
    icon: '/facebook-messenger/fb-1.png',
    title: 'Connect your Facebook page',
    body: 'Authorize Alive5 in two clicks — no developer required.',
  },
  {
    icon: '/facebook-messenger/fb-2.png',
    title: 'Build a custom chatbot flow',
    body: 'Greeting, FAQ, qualification, escalation — all visually configured.',
  },
  {
    icon: '/facebook-messenger/fb-3.png',
    title: 'Manage from one inbox',
    body: 'Replies flow to the same Alive5 inbox as SMS and Live Chat.',
  },
];

const ALL_IN_ONE = [
  'Give your entire team access to incoming Facebook messages',
  'Save time switching between screens with all your messages in one place',
  'Gather customer data and analytics in real time',
  'Route messages to Sales / Support / Billing automatically',
];

const JOURNEY = [
  {
    title: 'Schedule a Demo',
    body: 'Explore opportunities with our Facebook tool. See if it\'s a fit.',
  },
  {
    title: 'Tailor your solution',
    body: 'Integrate your CRM. Set up your agent accounts.',
  },
  {
    title: 'Train with our team',
    body: 'Set up your Facebook workflow and become an Alive5 power user.',
  },
  {
    title: 'Activate your brand',
    body: 'Manage your business communications from one dashboard.',
  },
];

const FAQ = [
  {
    q: 'Do I need a Facebook Business page to use this?',
    a: 'Yes — you need a Facebook Business (or Creator) page. Personal Facebook profiles can\'t use the Messenger Platform.',
  },
  {
    q: 'Does Alive5 work with Instagram DMs?',
    a: 'Currently we focus on Facebook Messenger. Instagram DM support is on our roadmap — talk to sales for early access.',
  },
  {
    q: 'How are Facebook chats billed?',
    a: 'Facebook conversations count toward your monthly conversation usage like any other channel. Within Meta\'s 24-hour customer service window, replies are free; outside it, standard messaging-tag rules apply.',
  },
  {
    q: 'Can my chatbot escalate to a human?',
    a: 'Yes — chatbot flows can hand off to a live agent based on keywords, sentiment, or explicit "talk to a human" requests.',
  },
  {
    q: 'Can I broadcast to my Facebook subscribers?',
    a: 'Meta restricts broadcast messaging to Sponsored Messages and the limited Subscription / News / Account-Update / Confirmed-Event message tags. We help you stay compliant.',
  },
];

export default function FacebookMessenger() {
  return (
    <>
      <SEOHead
        title="Facebook Messenger for Business | Alive5"
        description="Add a chatbot to your Facebook Page and route Messenger conversations to the same team inbox as SMS and Live Chat. Build flows in 15 minutes — no code required."
        canonical="https://www.alive5.com/facebook-messenger"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Alive5 for Facebook Messenger',
            description:
              'One agent console for SMS, web chat, and Facebook Messenger with chatbot automation.',
            brand: { '@type': 'Brand', name: 'Alive5' },
          },
        ]}
      />

      {/* ============================================================
       * HERO
       * ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-surface-cream to-surface-page pt-32 pb-24 dark:from-[#0a1929] dark:via-grey-900 dark:to-grey-900 md:pt-40 md:pb-32">
        <div className="pointer-events-none absolute -left-32 top-12 size-[28rem] rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-[28rem] rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-900/30" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(72,72,74,0.10) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
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
            <Sparkles className="size-4" style={{ color: FB_BLUE, opacity: 0.7 }} />
          </motion.span>
        ))}

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold shadow-sm backdrop-blur dark:border-blue-700/40 dark:bg-white/10"
                style={{ color: FB_BLUE }}
              >
                <MessageCircle className="size-3.5" />
                Facebook Messenger
              </span>
              <h1 className="mt-6 text-h1 leading-[1.04] tracking-tight text-grey-900 md:text-[3.75rem]">
                One agent console for SMS, web chat, and{' '}
                <Typewriter
                  words={['Facebook Messenger.', 'social DMs.', 'every channel.']}
                  className="inline-block bg-gradient-to-r from-[#0084FF] via-[#1877F2] to-[#0066CC] bg-clip-text text-transparent"
                />
              </h1>
              <p className="mt-5 text-body-lg text-grey-700">
                Add a chatbot and respond to leads and support requests from Facebook users —
                easily. Same inbox as SMS and Live Chat.{' '}
                <strong className="font-semibold text-grey-900">Simple. Automated. Built for engagement.</strong>
              </p>
              <ul className="mt-7 space-y-2.5">
                {[
                  'Build chatbot flows in under 15 minutes',
                  'Sync every lead to your CRM automatically',
                  'Same inbox as SMS, web chat, and email',
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
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-body font-semibold text-white shadow-[0_8px_20px_-6px_rgba(0,132,255,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(0,132,255,0.6)]"
                  style={{ backgroundColor: FB_BLUE }}
                >
                  Schedule a Facebook Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/pricing" className="btn-ghost !px-7 !py-4 text-body">
                  See pricing
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
                <motion.img
                  src="/facebook-messenger/fb-top-828f0ec7.png"
                  alt="Facebook Messenger automation toolkit illustration"
                  loading="eager"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="w-full drop-shadow-[0_25px_50px_rgba(31,31,32,0.18)]"
                />
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ============================================================
       * AUTOMATION TOOLKIT
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p
            className="text-legal font-semibold uppercase tracking-[0.18em]"
            style={{ color: FB_BLUE }}
          >
            Automation toolkit
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Seamless{' '}
            <span style={{ color: FB_BLUE }}>social messaging</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Generate more leads with Facebook Messenger — without adding head count.
          </p>
        </FadeUp>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {TOOLKIT.map((t) => (
            <motion.div
              key={t.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span
                className="inline-flex size-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${FB_BLUE}15`, color: FB_BLUE }}
              >
                <t.Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{t.title}</h3>
              <p className="mt-3 text-body text-grey-700">{t.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * 3-STEP ACTIVATION
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p
            className="text-legal font-semibold uppercase tracking-[0.18em]"
            style={{ color: FB_BLUE }}
          >
            Live in minutes
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Activate your Facebook funnel in{' '}
            <span style={{ color: FB_BLUE }}>three easy steps</span>
          </h2>
        </FadeUp>
        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12}>
          {ACTIVATION_STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl border border-grey-200 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span
                className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full text-small font-bold text-white shadow-md"
                style={{ backgroundColor: FB_BLUE }}
              >
                {i + 1}
              </span>
              <div className="flex justify-center">
                <motion.img
                  src={s.icon}
                  alt={s.title}
                  loading="lazy"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-28 w-auto"
                />
              </div>
              <h3 className="mt-6 text-h4 text-grey-900">{s.title}</h3>
              <p className="mt-3 text-body text-grey-700">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * ALL-IN-ONE SOLUTION
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span
              className="inline-flex size-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${FB_BLUE}15`, color: FB_BLUE }}
            >
              <Inbox className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Provide better customer service via{' '}
              <span style={{ color: FB_BLUE }}>Facebook Messenger</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              All-in-one solution: every Facebook conversation lands next to your SMS and web-chat
              threads, with full context for your team.
            </p>
            <ul className="mt-7 space-y-3">
              {ALL_IN_ONE.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
              <motion.img
                src="/facebook-messenger/allinone.png"
                alt="Alive5 unified chat window showing a Facebook Messenger conversation"
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * SMART ROUTING
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-blue-200/40 blur-3xl dark:bg-blue-900/30" />
              <motion.img
                src="/facebook-messenger/routing.png"
                alt="Routing a Facebook customer to Sales, Support, or Billing teams"
                loading="lazy"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <span
              className="inline-flex size-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${FB_BLUE}15`, color: FB_BLUE }}
            >
              <Users className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Route to the{' '}
              <span style={{ color: FB_BLUE }}>right team</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Sales asks one set of questions. Support asks another. Billing has yet another flow.
              Alive5 routes each Facebook DM to the right department automatically.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Keyword-based routing (e.g. "refund" → Billing)',
                'Round-robin and load-balanced distribution',
                'Time-of-day & language-aware handoff',
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
        </div>
      </Section>

      {/* ============================================================
       * CAPABILITIES (dark band)
       * ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-grey-900 via-[#0a1929] to-grey-900 py-24 text-white md:py-28">
        <div
          className="pointer-events-none absolute -right-32 top-0 size-[36rem] rounded-full blur-3xl"
          style={{ backgroundColor: `${FB_BLUE}40` }}
        />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
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
            <p
              className="text-legal font-semibold uppercase tracking-[0.18em]"
              style={{ color: '#7DB6FF' }}
            >
              Convert visitors into customers
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-white md:text-[3rem]">
              Start converting{' '}
              <span className="bg-gradient-to-r from-[#7DB6FF] via-[#3B9BFF] to-[#0084FF] bg-clip-text text-transparent">
                Facebook visitors
              </span>{' '}
              into customers
            </h2>
            <p className="mt-6 text-body-lg text-grey-300">
              Even if you've never captured leads or supported customers via Facebook Messenger,
              there's no better time to start than today.
            </p>
          </FadeUp>

          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {[
              { Icon: Zap, title: 'Drag-and-drop flows' },
              { Icon: Bot, title: 'Smart auto-replies' },
              { Icon: BarChart3, title: 'Real-time analytics' },
              { Icon: Database, title: 'CRM sync' },
            ].map((c) => (
              <motion.div
                key={c.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span
                  className="inline-flex size-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${FB_BLUE}30`, color: '#7DB6FF' }}
                >
                  <c.Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-h4 font-bold text-white">{c.title}</h3>
              </motion.div>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================================================
       * CUSTOMER JOURNEY (4 steps)
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p
            className="text-legal font-semibold uppercase tracking-[0.18em]"
            style={{ color: FB_BLUE }}
          >
            Get started today
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Your Facebook journey,{' '}
            <span style={{ color: FB_BLUE }}>in four steps</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Let our all-star team show you the way.
          </p>
        </FadeUp>
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {JOURNEY.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span
                className="inline-flex size-10 items-center justify-center rounded-full text-small font-bold text-white shadow-md"
                style={{ backgroundColor: FB_BLUE }}
              >
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
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p
            className="text-legal font-semibold uppercase tracking-[0.18em]"
            style={{ color: FB_BLUE }}
          >
            Common questions
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Facebook Messenger{' '}
            <span style={{ color: FB_BLUE }}>FAQ</span>
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
                <span
                  className="inline-flex size-7 flex-none items-center justify-center rounded-full transition-transform group-open:rotate-180"
                  style={{ backgroundColor: `${FB_BLUE}15`, color: FB_BLUE }}
                >
                  <ArrowRight className="size-4 rotate-90" />
                </span>
              </summary>
              <p className="px-5 pb-5 text-body text-grey-700">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </Section>

      {/* ============================================================
       * FINAL CTA — orange brand banner
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
                Ready to engage Facebook customers?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Free demo. Live in days. Same team inbox as SMS and Live Chat.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/rohit-consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Schedule a Facebook Demo
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
