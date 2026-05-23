import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  UserMinus,
  Sparkles,
  ArrowRight,
  Check,
  Globe,
  Quote,
  FileText,
  MessagesSquare,
  MessageCircle,
  Smartphone,
  Mail,
  Database,
} from 'lucide-react';
import { Hero } from '@/components/marketing/Hero';
import { ChatShowcase } from '@/components/marketing/ChatShowcase';
import { TrustBand } from '@/components/marketing/TrustBand';
import { SlidingDeck } from '@/components/marketing/SlidingDeck';
import { StorylaneDemo } from '@/components/marketing/StorylaneDemo';
import { PilotPricing } from '@/components/marketing/PilotPricing';
import { ProductPillars } from '@/components/marketing/ProductPillars';
import { LaunchSteps } from '@/components/marketing/LaunchSteps';
import { FAQ } from '@/components/marketing/FAQ';
import { SEOHead } from '@/components/seo/SEOHead';
import { SectionHeading } from '@/components/sections/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const TRAINED = [
  { icon: Globe, title: 'Learns your website and FAQs', body: 'A.I. replies only from the URLs you trust and specify.' },
  { icon: Quote, title: 'Answers with sources', body: 'Personalized responses come with citation links.' },
  { icon: FileText, title: 'Upload your company docs', body: 'Add PDFs — pricing tables, schedules, and more.' },
  { icon: MessagesSquare, title: 'Solves complex inquiries', body: 'Asks follow-up questions for personalized replies.' },
];

const HANDOFF = [
  { icon: MessageCircle, title: 'Live chat', body: 'Route chats to your staff based on availability, skillset, and lead flow.' },
  { icon: Smartphone, title: 'SMS / texting', body: 'Start a 2-way text to engage hot sales leads or continue support by SMS.' },
  { icon: Mail, title: 'Email inbox', body: 'Forward chat transcripts to specified inboxes and reply when available.' },
  { icon: Database, title: 'CRM integration', body: 'Push chats to Salesforce, Microsoft Dynamics, or HubSpot.' },
];

const PROBLEMS = [
  {
    icon: Users,
    title: 'Overwhelmed team',
    body: 'A.I. handles routine questions, freeing your team to focus on high-value inquiries and unexpected traffic surges.',
  },
  {
    icon: GraduationCap,
    title: 'Never-ending training',
    body: 'Staff training, knowledge gaps, and turnover create ongoing operational burdens that A.I. quietly absorbs.',
  },
  {
    icon: UserMinus,
    title: 'Prospects leaving',
    body: 'Long wait times and limited business hours kill sales. Reply in seconds, 24/7, instead of days.',
  },
];

/** JSON-LD blocks for the homepage — AEO/GEO-friendly structured data. */
const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Alive5',
    url: 'https://www.alive5.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.alive5.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Alive5 A.I. Chatbot',
    description:
      'Unified inbox A.I. chatbot trained only on your business knowledge. Live chat, SMS, and social messaging in one place.',
    brand: { '@type': 'Brand', name: 'Alive5' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '1',
      highPrice: '500',
      offerCount: '2',
      offers: [
        { '@type': 'Offer', name: '60 Day Pilot', price: '500', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Go Live (per conversation)', price: '1', priceCurrency: 'USD' },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Alive5?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alive5 is a unified inbox A.I. chatbot platform that automates customer conversations across live chat, SMS, and social — trained only on your business knowledge with 90%+ A.I. resolution and 5× ROI.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Alive5 priced?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alive5 offers a $500 one-time 60-day pilot (done-for-you launch + training + reporting) and a $1-per-A.I.-conversation Go Live plan with a $500 monthly minimum and automatic volume discounts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Alive5 enterprise-ready?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Alive5 is SOC 2 Type 2 and GDPR compliant with zero data retention, private VPC deployment, BAA available, and runs on Amazon Bedrock and Anthropic Claude.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does Alive5 take to launch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most customers go live in days, not weeks. The 60-day pilot includes a done-for-you launch, team training, and usage analysis regardless of volume.',
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="A.I. Chatbots for Customer Service | Alive5"
        description="Alive5 is the unified inbox where every customer question gets answered — by your team or A.I. trained only on your business. Live chat, SMS, and social messaging in one place. 90%+ answered by A.I., 5× ROI guaranteed."
        canonical="https://www.alive5.com/"
        ogImage="https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/Alive5_Logo_RGB_2023-01-high-01-1920w.png"
        jsonLd={HOME_JSONLD}
      />
      <Hero />
      <ChatShowcase />
      <TrustBand />

      {/* Problem section — comes BEFORE the SlidingDeck so users see the
          three problems Alive5 solves before the solution slides. */}
      <Section id="how-it-works" className="bg-surface-page">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-grey-900">Provide exceptional service at the speed of A.I.</h2>
          <p className="mt-5 text-body-lg text-grey-700">
            Three problems Alive5 solves the moment you turn it on.
          </p>
        </FadeUp>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-xl border border-grey-100 bg-surface-soft p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-md bg-orange-100 text-alive5-orange">
                <p.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-h4 text-grey-900">{p.title}</h3>
              <p className="mt-3 text-body text-grey-700">{p.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      <SlidingDeck />

      {/* A team inbox for streamlined messaging — self-hosted Storylane demo */}
      <Section id="team-inbox" className="bg-white dark:bg-grey-900">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-grey-900">
            A team inbox for{' '}
            <span className="text-alive5-orange">streamlined messaging</span>
          </h2>
          <p className="mt-5 text-body-lg text-grey-700">
            Handle multiple conversations, customer segments, and manage access across your entire
            organization via web browser and mobile app. Works across{' '}
            <strong className="font-semibold text-grey-900">live web chat</strong>,{' '}
            <strong className="font-semibold text-grey-900">SMS</strong>, and{' '}
            <strong className="font-semibold text-grey-900">social</strong> messaging.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-12">
          <StorylaneDemo />
        </FadeUp>
      </Section>

      {/* A.I. trained only on your business */}
      <Section className="bg-surface-soft">
        <SectionHeading
          eyebrow="Answers from your data"
          title="A.I. trained only on your business"
          subtitle="Responses are sourced exclusively from your content — zero hallucinations. Your data stays private, never shared with external models or used for their training."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINED.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-grey-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-grey-800"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-h4 text-grey-900">{f.title}</h3>
              <p className="mt-3 text-body text-grey-700">{f.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* Reduce support volume — stats */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeUp>
            <p className="mb-3 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">
              Proven results
            </p>
            <h2 className="text-h3 text-grey-900 md:text-h2">
              Reduce support volume and boost customer satisfaction
            </h2>
            <p className="mt-5 text-body-lg text-grey-700">
              Install an always-on intelligent chatbot that delivers personal, well-researched answers with
              exceptional accuracy.
            </p>
            <Link to="/thank-you" className="btn-orange group mt-8 !px-7 !py-4 text-body">
              Schedule a demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {[
              { n: '90%+', l: 'answered by A.I. successfully' },
              { n: '5× ROI', l: '$1 spent saves $5. Guaranteed.' },
            ].map((s) => (
              <motion.div
                key={s.n}
                variants={staggerItem}
                className="rounded-2xl border border-grey-100 bg-gradient-to-br from-orange-50 to-surface-soft p-8 text-center shadow-sm dark:border-white/10 dark:from-grey-800 dark:to-grey-900"
              >
                <p className="text-display font-bold text-alive5-orange">{s.n}</p>
                <p className="mt-2 text-body text-grey-700">{s.l}</p>
              </motion.div>
            ))}
            <p className="text-legal text-grey-400 sm:col-span-2">
              *Real customer success rates displayed; actual results vary by use case and knowledge quality.
            </p>
          </Stagger>
        </div>
      </Section>

      {/* 3 product pillars: training, insights, enterprise-ready */}
      <ProductPillars />

      {/* Human handoff */}
      <Section className="bg-surface-soft">
        <SectionHeading
          eyebrow="Human handoff"
          title="When automation can't help, your team can"
          subtitle="A.I. handles the routine and hands off seamlessly — across every channel your customers use."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HANDOFF.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-grey-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-grey-800"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-6 text-h4 text-grey-900">{f.title}</h3>
              <p className="mt-3 text-body text-grey-700">{f.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* "Do It For You" unlimited pilot pricing */}
      <PilotPricing />

      <FAQ />

      {/* Illustrated "Launch in days, not weeks" steps — final pre-CTA */}
      <LaunchSteps />

      {/* CTA banner */}
      <Section bleed className="!py-0">
        <FadeUp>
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-alive5-orange to-orange-700 px-6 py-24 text-center md:py-28">
              {/* dot-grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
                  backgroundSize: '26px 26px',
                  maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black, transparent 75%)',
                }}
              />
              {/* glows */}
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-orange-300/30 blur-3xl" />

              {/* floating glass chat bubbles for depth */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute left-6 top-12 hidden rounded-2xl rounded-bl-md border border-white/30 bg-white/15 px-4 py-2.5 text-small text-white shadow-lg backdrop-blur lg:block"
              >
                Are you open this weekend?
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="pointer-events-none absolute bottom-14 right-8 hidden rounded-2xl rounded-br-md border border-white/30 bg-white/20 px-4 py-2.5 text-small font-medium text-white shadow-lg backdrop-blur lg:block"
              >
                Yes — until 9pm ✓
              </motion.div>

              <Container className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-small font-semibold text-white backdrop-blur">
                  <Sparkles className="size-3.5" />
                  Get started in days
                </span>
                <h2 className="mx-auto mt-6 max-w-3xl text-h2 text-white md:text-[56px] md:leading-[1.05]">
                  Ready to convert more leads into customers
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                  See how Alive5 unifies live chat, SMS, and social into one A.I.-powered inbox.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2, ease: EASE }}>
                    <Link
                      to="/thank-you"
                      className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-shadow hover:shadow-xl"
                    >
                      Schedule a live demo
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                  <Link
                    to="/contact-us"
                    className="inline-flex min-h-[54px] items-center justify-center rounded border border-white/40 px-8 py-4 text-body font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Talk to sales
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-small text-white/80">
                  {['No credit card required', '60-day pilot', 'Live in days, not weeks'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5">
                      <Check className="size-4" strokeWidth={3} />
                      {t}
                    </span>
                  ))}
                </div>
              </Container>
            </div>
          </FadeUp>
      </Section>
    </>
  );
}
