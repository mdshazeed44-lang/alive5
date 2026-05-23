import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Sparkles,
  Database,
  Users,
  BarChart3,
  Zap,
  Globe,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { Typewriter } from '@/components/motion/Typewriter';
import { SEOHead } from '@/components/seo/SEOHead';

const PARTNERS = ['Salesforce', 'Microsoft Dynamics 365', 'Ellucian', 'HubSpot', 'Zapier'];

const STEPS = [
  {
    img: '/crm/step-1-schedule-demo.png',
    title: 'Schedule a Demo',
    body: "Learn about our live chat tool. See if it's a fit.",
  },
  {
    img: '/crm/step-2-tailor.png',
    title: 'Tailor Your Solution',
    body: 'Integrate your CRM. Set up agent accounts.',
  },
  {
    img: '/crm/step-3-train.png',
    title: 'Train With Our Team',
    body: 'Start using the system and become a power user.',
  },
  {
    img: '/crm/step-4-activate.png',
    title: 'Activate Your Brand',
    body: 'Manage your conversations from one simple platform.',
  },
];

const FAQ = [
  {
    q: 'Which CRMs does Alive5 natively integrate with?',
    a: 'Alive5 ships native integrations for Salesforce, Microsoft Dynamics 365, and Ellucian CRM Recruit. For anything else, the Zapier connector or our public API handle hundreds of additional platforms.',
  },
  {
    q: 'Will my chat / SMS / Messenger conversations sync into the CRM automatically?',
    a: "Yes. Every conversation, contact, transcript, and lead-status change syncs in real time. You don't have to touch the data manually.",
  },
  {
    q: 'Can I push existing CRM contacts INTO Alive5 for outbound campaigns?',
    a: 'Yes. Pull a segmented list from Salesforce/Dynamics, push it to an Alive5 broadcast, and the replies route back to the original CRM record.',
  },
  {
    q: 'How long does CRM integration take to set up?',
    a: 'Native integrations (Salesforce, Dynamics 365, Ellucian) take 1–2 hours with our team. Zapier flows take 15 minutes. Custom API work is sized per scope.',
  },
  {
    q: 'Do I need an enterprise CRM license to integrate?',
    a: 'Salesforce: yes — Enterprise Edition or higher is required. Dynamics 365: any tier with API access. Most other CRMs work via Zapier on standard plans.',
  },
];

export default function Crm() {
  return (
    <>
      <SEOHead
        title="CRM Integration — Salesforce, Dynamics 365 & More | Alive5"
        description="Sync every SMS, web chat, and Facebook Messenger conversation into your CRM in real time. Native Salesforce, Microsoft Dynamics 365, and Ellucian integrations + Zapier + public API."
        canonical="https://www.alive5.com/crm"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Alive5 CRM Integration',
            description:
              'Two-way sync between Alive5 conversations (SMS, web chat, Facebook Messenger) and your CRM.',
            brand: { '@type': 'Brand', name: 'Alive5' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
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
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)',
          }}
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
                <Sparkles className="size-3.5" />
                CRM Integration
              </span>
              <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.04] tracking-tight text-grey-900 sm:text-h1 md:text-[3.75rem]">
                Grow revenues with{' '}
                <Typewriter
                  words={['Salesforce', 'Dynamics 365', 'Ellucian', 'any CRM']}
                  className="inline-block bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent"
                />
              </h1>
              <p className="mt-5 text-body-lg text-grey-700">
                Share data to and from your CRM to enrich conversations. One simple CRM integration
                for <strong className="font-semibold text-grey-900">SMS, web chat, and Facebook Messenger</strong>.
              </p>
              <ul className="mt-7 space-y-2.5">
                {[
                  'Real-time two-way sync — contacts, transcripts, lead status',
                  'Native: Salesforce, Microsoft Dynamics 365, Ellucian CRM Recruit',
                  'Zapier + public API for everything else',
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
                  Book a Demo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <Link to="/pricing" className="btn-ghost !px-7 !py-4 text-body">
                  See pricing
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
                <motion.img
                  src="/crm/crm-hero.png"
                  alt="Alive5 CRM integration illustration — data flowing into your CRM"
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
       * PARTNER LOGOS / NAMES STRIP
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-small text-grey-500">
            Works natively with the world's leading CRMs and ESBs.
          </p>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="rounded-xl bg-white px-5 py-3 text-h4 font-bold tracking-tight text-grey-700 shadow-sm ring-1 ring-grey-200 dark:bg-grey-800 dark:text-grey-200 dark:ring-white/10"
              >
                {p}
              </span>
            ))}
          </div>
        </FadeUp>
      </Section>

      {/* ============================================================
       * CRM DATA AT YOUR FINGERTIPS
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              Connect better with your audience
            </p>
            <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
              CRM data at your{' '}
              <span className="text-alive5-orange">fingertips</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Customers today expect more from you than ever. They know what they want and when
              they want it,{' '}
              <strong className="font-semibold text-grey-900">now</strong>. With a unified
              dashboard, teams meet every customer request — from support to inbound leads.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { Icon: Users, text: 'Create more conversations' },
                { Icon: TrendingUp, text: 'Close more sales' },
                { Icon: BarChart3, text: 'Activate better marketing' },
                { Icon: Sparkles, text: 'Drive customer loyalty' },
              ].map(({ Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-body font-medium text-grey-800"
                >
                  <span className="inline-flex size-7 flex-none items-center justify-center rounded-lg bg-orange-100 text-alive5-orange">
                    <Icon className="size-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <motion.img
                src="/crm/crm-data-fingertips.png"
                alt="A unified dashboard surfacing every customer conversation"
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full rounded-3xl shadow-2xl ring-1 ring-grey-200 dark:ring-white/10"
              />
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * GROW REVENUES THROUGH CONTACT LIST
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <motion.img
                src="/crm/enterprise-ready.png"
                alt="Enterprise-ready CRM integration with Salesforce, Microsoft Dynamics 365, Ellucian"
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <Database className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Grow revenues through your{' '}
              <span className="text-alive5-orange">customer contact list</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Update customer contact information, record every interaction, and automatically send
              inbound and outbound messages from every platform — from your website to SMS.
            </p>
            <div className="mt-7 rounded-2xl border border-orange-200 bg-orange-50/60 p-5 text-body text-grey-800 dark:border-orange-700/40 dark:bg-orange-950/30 dark:text-grey-300">
              From{' '}
              <strong className="font-semibold text-grey-900">Salesforce</strong> to{' '}
              <strong className="font-semibold text-grey-900">Microsoft Dynamics 365</strong> to{' '}
              <strong className="font-semibold text-grey-900">Ellucian</strong>, Alive5 works with
              any CRM.
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ============================================================
       * OMNI-CHANNEL MESSAGING MEETS CRM — video band
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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <p className="text-legal font-semibold uppercase tracking-[0.18em] text-orange-300">
                Omni-channel messaging meets CRM
              </p>
              <h2 className="mt-3 text-h2 leading-[1.05] text-white md:text-[3rem]">
                Connect with your audience{' '}
                <span className="bg-gradient-to-r from-alive5-orange via-orange-400 to-orange-600 bg-clip-text text-transparent">
                  anywhere, anytime
                </span>
              </h2>
              <p className="mt-6 text-body-lg text-grey-300">
                Alive5 makes it easy to deepen customer relationships with memorable digital
                experiences using chatbots, Facebook, SMS, and QR codes. Whether you're available
                to chat or not, Alive5 makes you available{' '}
                <strong className="font-bold text-white">24/7</strong>.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Chatbots', 'Facebook', 'SMS', 'QR codes', 'Web chat'].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-small font-medium text-grey-200 backdrop-blur"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-grey-900 shadow-2xl">
                <video
                  src="/crm/multichannel.mp4"
                  poster="/crm/multichannel-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full bg-grey-900"
                  aria-label="Alive5 omni-channel messaging — looping product demo"
                >
                  Your browser does not support embedded video.
                </video>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ============================================================
       * REAL-TIME REPORTING
       * ============================================================ */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <BarChart3 className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              View customer interaction data via{' '}
              <span className="text-alive5-orange">real-time reporting</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              With advanced reporting, understand the behavior, sentiment, and needs of your
              audience. Export data to <code className="rounded bg-grey-100 px-1.5 py-0.5 text-small dark:bg-grey-800 dark:text-grey-200">.CSV</code>, web
              views, or access reports via our public API.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Sentiment + topic analysis on every conversation',
                'Per-agent and per-team performance dashboards',
                'CSV export + scheduled email digests',
                'Public REST API for custom dashboards',
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

          <FadeUp delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <motion.img
                src="/crm/sms-reporting.png"
                alt="Real-time SMS and chat reporting dashboard"
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
       * ZAPIER + API AUTOMATION
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
              <motion.img
                src="/crm/zapier.png"
                alt="Zapier and public API integration"
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.15)]"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="order-1 lg:order-2">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
              <Zap className="size-6" />
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Automate using Zapier{' '}
              <span className="text-alive5-orange">and API</span>
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Using the Alive5 Zapier integration, customize and automate chatbots, SMS, and live
              chat with your existing digital infrastructure.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                '7,000+ apps via Zapier — no engineering needed',
                'REST + Webhooks API for custom workflows',
                'OAuth-secured connections',
                'Rate limits + retry built in',
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
       * 4-STEP PROCESS
       * ============================================================ */}
      <Section>
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Live in days
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            Strengthen relationships{' '}
            <span className="text-alive5-orange">across every channel</span>
          </h2>
          <p className="mt-4 text-body-lg text-grey-700">
            A cost-effective and easy-to-deploy solution.
          </p>
        </FadeUp>
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl border border-grey-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-alive5-orange text-small font-bold text-white shadow-orange">
                {i + 1}
              </span>
              <div className="flex justify-center">
                <motion.img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-24 w-auto"
                />
              </div>
              <h3 className="mt-4 text-h4 text-grey-900">{s.title}</h3>
              <p className="mt-2 text-small text-grey-700">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ============================================================
       * FAQ
       * ============================================================ */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Common questions
          </p>
          <h2 className="mt-3 text-h2 leading-[1.05] text-grey-900">
            CRM integration{' '}
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-small font-semibold text-white backdrop-blur">
                <Shield className="size-3.5" />
                Enterprise-grade integration
              </span>
              <h2 className="mx-auto mt-6 text-h2 text-white md:text-[3rem] md:leading-[1.05]">
                Streamline your customer communications
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Sign up for a demo today and we'll show you how the integration looks in your CRM.
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

      {/* Unused-icon hint to keep tree-shaking honest */}
      <span className="hidden">
        <Globe />
      </span>
    </>
  );
}
