import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Star,
  Shield,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Building2,
  Phone,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { SEOHead } from '@/components/seo/SEOHead';
import { CheckoutModal } from '@/components/marketing/CheckoutModal';

/* =====================================================================
 * VERIFIED PRICING DATA — sourced from src/content/pricing-new-html.md
 * (the canonical SMS pricing page on alive5.com). Do not change figures
 * without re-verifying against alive5.com first.
 * =================================================================== */

type Plan = {
  key: 'starter' | 'pro' | 'proPlus' | 'premium';
  name: string;
  monthly: number;
  setup: number;
  users: number;
  credits: number;
  overage: string;
  support: string;
  blurb: string;
  bullets: string[];
  inherits?: string;
  bestValue?: boolean;
};

const PLANS: Plan[] = [
  {
    key: 'starter',
    name: 'Starter',
    monthly: 5,
    setup: 100,
    users: 1,
    credits: 150,
    overage: '$0.05',
    support: 'Email only',
    blurb: 'One user & phone line. 150 text credits refilled monthly with rollover.',
    bullets: [
      '1 user & phone line',
      '150 text credits/month with rollover',
      'Email support only',
      'Automated replies',
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    monthly: 37,
    setup: 20,
    users: 3,
    credits: 500,
    overage: '$0.035',
    support: 'Email, Live Chat, SMS',
    blurb: '3 users & phone lines. 500 text credits refilled monthly with rollover.',
    bullets: [
      '3 users & phone lines',
      '500 text credits/month with rollover',
      'Email & SMS support',
      'Chatbot automation',
      'API access',
    ],
    inherits: 'Starter',
  },
  {
    key: 'proPlus',
    name: 'Pro Plus',
    monthly: 77,
    setup: 20,
    users: 5,
    credits: 1500,
    overage: '$0.0325',
    support: 'Email, Live Chat, SMS, Phone',
    blurb: '5 users & phone lines. 1,500 text credits refilled monthly with rollover.',
    bullets: [
      '5 users & phone lines',
      '1,500 text credits/month with rollover',
      'Email, SMS & Phone support',
      'Team inbox',
      'Advanced reporting',
    ],
    inherits: 'Pro',
    bestValue: true,
  },
  {
    key: 'premium',
    name: 'Premium',
    monthly: 160,
    setup: 50,
    users: 10,
    credits: 3000,
    overage: '$0.03',
    support: 'Email, Live Chat, SMS, Phone',
    blurb: '10 users & phone lines. 3,000 text credits refilled monthly with rollover.',
    bullets: [
      '10 users & phone lines',
      '3,000 text credits/month with rollover',
      'Email, SMS & Phone support',
      'Single Sign-On (SSO)',
      'CRM integration',
      'Advanced reporting',
    ],
    inherits: 'Pro Plus',
  },
];

/* Compare table: '✓' | '—' | 'Contact us' | 'Included' | string */
const COMPARE: {
  group: string;
  rows: { label: string; values: [string, string, string, string]; note?: string }[];
}[] = [
  {
    group: 'Plan basics',
    rows: [
      { label: 'Users & phone lines', values: ['1', '3', '5', '10'] },
      { label: 'Text credits/month (with rollover)', values: ['150', '500', '1,500', '3,000'] },
      { label: 'One-time setup fee', values: ['$100', '$20', '$20', '$50'] },
      { label: 'Additional user / phone line', values: ['—', '$10/user', '$10/user', '$10/user'] },
      { label: 'Per text credit overage', values: ['$0.05', '$0.035', '$0.0325', '$0.03'] },
    ],
  },
  {
    group: 'Phone numbers',
    rows: [
      { label: 'Bring your own number', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Toll-free phone number', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Reserve local phone number', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Expedited 10DLC campaign approval', values: ['—', '✓', '✓', '✓'] },
    ],
  },
  {
    group: 'Messaging',
    rows: [
      { label: 'Two-way texting', values: ['✓', '✓', '✓', '✓'] },
      { label: 'MMS texting (photo & video)', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Large file transfer (PDF, XLS, CSV, DOC)', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Scheduled sending', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Auto language translation', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Opt-out / opt-in management', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Mass messaging', values: ['—', '✓', '✓', '✓'] },
      { label: 'Templates & canned answers', values: ['—', '✓', '✓', '✓'] },
      { label: 'SMS signatures', values: ['—', '✓', '✓', '✓'] },
      { label: 'Away auto-reply', values: ['—', '✓', '✓', '✓'] },
    ],
  },
  {
    group: 'Contacts & inbox',
    rows: [
      { label: 'Contacts CRM', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Contacts import/export', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Custom views & filters', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Tagging & segments', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Team inbox', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Thread ownership', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Transcript downloads & email', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Message archiving', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Internal team chat', values: ['—', '✓', '✓', '✓'] },
    ],
  },
  {
    group: 'Apps & integrations',
    rows: [
      { label: 'Website widget', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Desktop app', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Mobile app (iOS & Android)', values: ['✓', '✓', '✓', '✓'] },
      { label: 'Facebook Messenger integration', values: ['—', '—', '✓', '✓'] },
      { label: 'Secure credit card capture', values: ['—', '—', '✓', '✓'] },
      { label: 'No-code chatbot builder', values: ['—', '—', '✓', '✓'] },
      { label: 'API access', values: ['—', '—', '—', '✓'] },
      { label: 'Single Sign-On (SSO)', values: ['—', '—', '—', 'Contact us'] },
      { label: 'CRM (Salesforce Enterprise, MS Dynamics 365)', values: ['—', '—', '—', 'Contact us'] },
    ],
  },
  {
    group: 'Reporting & support',
    rows: [
      { label: 'Reporting — basic', values: ['—', '✓', '✓', '✓'] },
      { label: 'Reporting — advanced', values: ['—', '—', '—', '✓'] },
      { label: 'Self-service training', values: ['Included', 'Included', 'Included', 'Included'] },
      {
        label: 'Zoom training session (30m)',
        values: ['$50/session', '$50/session', '1 included • add\'l $50', '1 included • add\'l $50'],
      },
      { label: 'Customer support', values: ['Email only', 'Email/Chat/SMS', 'Email/Chat/SMS/Phone', 'Email/Chat/SMS/Phone'] },
    ],
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How long does it take to start?',
    a: '10DLC compliance is required to use Alive5 SMS. The process can take 24–72 hours and may require you to make changes to your website. Once 10DLC is approved, you can begin texting immediately.',
  },
  {
    q: 'How many licenses do I need?',
    a: 'Pricing for seats is based on users logged in at the same time. If you have a team of 20 users but only 2 are working the same shift, you only need 2 concurrent user licenses. You can also log in on unlimited devices with the same user account.',
  },
  {
    q: 'What types of users can I create?',
    a: 'There are 2 roles: Agent and Admin. Agents can only interact/chat/text with customers. Admins can manage the system (phone numbers, users, channels, customization, etc.).',
  },
  {
    q: 'How many SMS credits do I need?',
    a: 'For typical 2-way texting, expect 200–750 texts per month per user. For bulk/broadcast texting, volume depends on number of contacts and message content.',
  },
  {
    q: 'How do text credits and rollover work?',
    a: 'When you pick a plan, text credits are issued every month on day 1 of your billing cycle. If you exceed the balance, you pay overages at the per-text-credit rate. Unused credits roll over to the next month. A text credit = 1 SMS up to 160 characters. MMS = 4 credits. Both inbound and outbound count.',
  },
  {
    q: 'What if I exceed my allotted texts per month?',
    a: 'Broadcast (bulk) and API messages can quickly exhaust your monthly allotment. Any text credits over the limit are billed an overage fee per text at the rate for your plan.',
  },
  {
    q: 'How does bulk texting work?',
    a: 'Bulk texting (Broadcast SMS) lets you send a personalized text to a group of contacts in one click. Sent BCC-style: each contact replies individually and replies are not seen by other contacts. Broadcasts count against monthly allotted texts.',
  },
  {
    q: 'Is there a desktop and mobile app?',
    a: 'Yes — admins and agents can use any modern browser (Chrome, Firefox, Safari, Edge) plus mobile apps on the Apple App Store and Google Play. No native desktop app, but a Chrome desktop app shortcut can be created.',
  },
  {
    q: 'Can I integrate my CRM?',
    a: 'Alive5 integrates with Salesforce Enterprise, Microsoft Dynamics 365 CRM, and Zapier. Ellucian clients also have CRM integrations with CRM Recruit.',
  },
  {
    q: 'Are there any contracts?',
    a: "No contracts required. Purchase month-to-month or pre-pay annually at a discount (one free month).",
  },
  {
    q: 'Is there a money-back guarantee?',
    a: 'Yes — 60-day money-back guarantee on licenses (monthly and annual). Refunds are prorated based on unused seats and text credits. Once 10DLC registration has started, setup and 10DLC registration fees are non-refundable.',
  },
  {
    q: 'Do you invoice or accept POs?',
    a: 'Yes, we work with accounting and procurement teams for amounts $500 USD and over. Contact billing@alive5.com for details.',
  },
  {
    q: 'What phone numbers work?',
    a: 'Any US or Canadian toll-free or local VoIP number (except Google Voice). Examples: Comcast Business, Vonage, RingCentral, Zoom. Does NOT work with AT&T, T-Mobile, or personal cell numbers.',
  },
];

const TRUST_BADGES = [
  { Icon: Shield, label: '60-day money back' },
  { Icon: Sparkles, label: 'No contracts • Cancel anytime' },
  { Icon: Star, label: '4.9★ rated' },
];

/* =====================================================================
 * COMPONENT
 * =================================================================== */

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);

  return (
    <>
      <SEOHead
        title="SMS Plans and Pricing | Alive5"
        description="Compare Alive5's SMS plans & pricing — starting at $5/month with options for 1 to 10 users and up to 3,000 text credits/month. 60-day money-back guarantee, no contracts."
        canonical="https://www.alive5.com/pricing"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Alive5 SMS Plans',
            description:
              'SMS, web chat, and A.I. chatbot plans for businesses, starting at $5/month.',
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '5',
              highPrice: '160',
              offerCount: '4',
              offers: PLANS.map((p) => ({
                '@type': 'Offer',
                name: p.name,
                price: String(p.monthly),
                priceCurrency: 'USD',
              })),
            },
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

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-32 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900 md:pt-40">
        <div className="pointer-events-none absolute -left-32 top-12 size-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-96 rounded-full bg-accent-light-blue/30 blur-3xl dark:bg-accent-teal/20" />
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

        <Container className="relative">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
              <Sparkles className="size-3.5" />
              Transparent pricing
            </span>
            <h1 className="mt-6 text-h1 leading-[1.05] text-grey-900 md:text-[4rem]">
              SMS plans &{' '}
              <span className="bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
                pricing
              </span>
            </h1>
            <p className="mt-5 text-body-lg text-grey-700">
              Choose a texting plan that works for your organization. Call or text{' '}
              <a href="tel:+18555518858" className="font-semibold text-alive5-orange hover:underline">
                855-551-8858
              </a>
              .
            </p>

            {/* trust strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {TRUST_BADGES.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-small font-medium text-grey-700 ring-1 ring-grey-200 backdrop-blur dark:bg-white/10 dark:text-grey-200"
                >
                  <Icon className="size-3.5 text-alive5-orange" />
                  {label}
                </span>
              ))}
            </div>

            {/* billing toggle */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <BillingToggle value={billing} onChange={setBilling} />
            </div>
          </FadeUp>

          {/* ===== PLANS GRID ===== */}
          <Stagger className="mt-12 grid items-stretch gap-6 pb-12 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.key}
                plan={plan}
                yearly={billing === 'yearly'}
                onSubscribe={() => setCheckoutPlan(plan)}
              />
            ))}
          </Stagger>

          {/* === Checkout modal === */}
          {checkoutPlan && (
            <CheckoutModal
              open={!!checkoutPlan}
              onClose={() => setCheckoutPlan(null)}
              cycle={billing}
              plan={{
                name: checkoutPlan.name,
                monthly: checkoutPlan.monthly,
                yearly: checkoutPlan.monthly * 11,
                setup: checkoutPlan.setup,
                includedUsers: checkoutPlan.users,
              }}
            />
          )}
        </Container>
      </section>

      {/* ===== NEED MORE? — Live Chat / Enterprise ===== */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-grey-900">Need more?</h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Add A.I. chat, custom widgets, or enterprise deployments to any plan.
          </p>
        </FadeUp>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.1}>
          <NeedMoreCard
            icon={<MessageSquare className="size-6" />}
            tagline="Chat on your website"
            title="Live Chat & A.I. Chatbot"
            bullets={['Programmable chatbots', 'Unlimited chats & departments', 'Custom widget and chat window', 'Generative A.I.']}
            cta="Schedule a live demo"
          />
          <NeedMoreCard
            icon={<Building2 className="size-6" />}
            tagline="For larger deployments and custom requests"
            title="Enterprise Solutions"
            bullets={['Single Sign-On (SSO)', 'Salesforce / Dynamics 365 CRM', 'Custom deployments', 'VIP training & support']}
            cta="Schedule a live demo"
            highlight
          />
        </Stagger>
      </Section>

      {/* ===== COMPARE TABLE ===== */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 text-grey-900">Compare every feature</h2>
          <p className="mt-4 text-body-lg text-grey-700">
            Side-by-side breakdown across all four plans.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12 overflow-x-auto">
          <CompareTable />
        </FadeUp>

        <FadeUp delay={0.2} className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-small text-grey-700 dark:border-orange-700/40 dark:bg-orange-950/30 dark:text-grey-300">
          <p>
            <strong className="text-grey-900">10DLC compliance</strong> is required before you can start texting. A
            one-time 10DLC registration & setup fee of $20 plus $2/month ($20–$50 registration & $10/month for Pro
            Plus and Premium) is applied at checkout. See{' '}
            <Link to="/10dlc-and-what-it-means-for-texting" className="font-semibold text-alive5-orange hover:underline">
              our blog article
            </Link>{' '}
            for time frames and restrictions.
          </p>
        </FadeUp>
      </Section>

      {/* ===== BOOK A STRATEGY CALL + CALENDLY EMBED ===== */}
      <Section id="book-a-call" className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-body-lg text-grey-700">
            Get started today by booking a meeting with one of our team members.
          </p>
          <a
            href="https://calendly.com/rohit-consult"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-alive5-orange px-7 py-4 text-body font-semibold text-white shadow-orange transition-all hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
          >
            Book a Strategy Call
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeUp>

        {/* Calendly inline embed */}
        <FadeUp delay={0.1} className="mt-12">
          <CalendlyEmbed url="https://calendly.com/rohit-consult" />
        </FadeUp>
      </Section>

      {/* ===== FAQ ===== */}
      <Section className="bg-surface-soft">
        <div className="grid gap-12 lg:grid-cols-3">
          <FadeUp>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-legal font-semibold uppercase tracking-[0.15em] text-alive5-orange">
              <HelpCircle className="size-3" />
              Pricing FAQ
            </span>
            <h2 className="mt-5 text-h2 leading-[1.05] text-grey-900">
              Frequently asked{' '}
              <span className="text-alive5-orange">questions</span>
            </h2>
            <p className="mt-5 text-body text-grey-700">
              Can't find what you're looking for?{' '}
              <Link to="/how-pricing-works" className="font-semibold text-alive5-orange hover:underline">
                Read How Pricing Works →
              </Link>
            </p>
            <a
              href="tel:+18555518858"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-grey-200 bg-white px-4 py-3 text-small font-medium text-grey-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-grey-800"
            >
              <Phone className="size-4 text-alive5-orange" />
              Talk to sales — 855-551-8858
            </a>
          </FadeUp>

          <div className="space-y-3 lg:col-span-2">
            {FAQ.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
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
              <h2 className="mx-auto text-h2 text-white md:text-[3.25rem] md:leading-[1.05]">
                Ready to start texting?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Book a meeting with our team and we'll have you live in days.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/thank-you"
                  className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Book a strategy call
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:billing@alive5.com"
                  className="inline-flex min-h-[54px] items-center justify-center rounded border border-white/40 px-8 py-4 text-body font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Email billing
                </a>
              </div>
            </Container>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------- */

function BillingToggle({
  value,
  onChange,
}: {
  value: 'monthly' | 'yearly';
  onChange: (v: 'monthly' | 'yearly') => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full bg-white p-1 shadow-md ring-1 ring-grey-200 dark:bg-grey-800">
      {(['monthly', 'yearly'] as const).map((k) => {
        const active = value === k;
        return (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-small font-semibold capitalize transition-colors ${
              active ? 'text-white' : 'text-grey-700 hover:text-grey-900'
            }`}
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-alive5-orange to-orange-600 shadow-orange"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{k}</span>
            {k === 'yearly' && (
              <span
                className={`relative rounded-full px-2 py-0.5 text-legal font-bold ${
                  active ? 'bg-white/20 text-white' : 'bg-accent-green/15 text-accent-green'
                }`}
              >
                1 month free
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */

function PlanCard({
  plan,
  yearly,
  onSubscribe,
}: {
  plan: Plan;
  yearly: boolean;
  onSubscribe: () => void;
}) {
  // Yearly = monthly × 11 (alive5 gives one free month). Shown as the
  // annual TOTAL with a "per yr" label — matches alive5.com behaviour.
  const yearlyTotal = plan.monthly * 11;
  const displayPrice = yearly ? yearlyTotal : plan.monthly;
  const displayUnit = yearly ? 'per yr' : 'per mo';
  const savings = plan.monthly; // 1 month free

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={[
        'relative flex flex-col overflow-hidden rounded-3xl border bg-white p-7 md:p-8 dark:bg-grey-800',
        plan.bestValue
          ? 'border-alive5-orange/40 shadow-[0_30px_80px_-30px_rgba(235,81,36,0.55)] ring-1 ring-alive5-orange/30'
          : 'border-grey-200 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]',
      ].join(' ')}
    >
      {plan.bestValue && (
        <>
          <div className="pointer-events-none absolute -top-20 right-0 size-48 rounded-full bg-orange-200/60 blur-3xl" />
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-alive5-orange to-orange-600 px-2.5 py-1 text-legal font-bold uppercase tracking-wider text-white shadow-orange"
          >
            <Star className="size-3 fill-white" strokeWidth={0} />
            Best value
          </motion.span>
        </>
      )}

      <p className="relative text-legal font-bold uppercase tracking-[0.15em] text-grey-500">
        {plan.name}
      </p>

      <div className="relative mt-4 flex items-baseline gap-1.5">
        <span className="text-[2.75rem] font-bold leading-none tracking-tight text-grey-900">
          ${displayPrice.toLocaleString('en-US')}
        </span>
        <span className="text-small text-grey-500">{displayUnit}</span>
      </div>
      {yearly && (
        <p className="relative mt-1 text-legal font-semibold text-accent-green">
          Save ${savings} • 1 month free
        </p>
      )}

      <p className="relative mt-4 min-h-[3.5rem] text-small text-grey-700">{plan.blurb}</p>

      <p className="relative mt-3 text-legal text-grey-500">
        One-time setup: <span className="font-semibold text-grey-900">${plan.setup}</span>
      </p>

      <ul className="relative mt-5 space-y-2.5">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-small text-grey-800">
            <span className="mt-0.5 inline-flex size-4 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      {plan.inherits && (
        <p className="relative mt-4 text-legal italic text-grey-500">
          Includes everything in <span className="font-semibold text-grey-700">{plan.inherits}</span>
        </p>
      )}

      <div className="relative mt-auto pt-6">
        <button
          onClick={onSubscribe}
          className={[
            'group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-small font-semibold transition-all',
            plan.bestValue
              ? 'bg-gradient-to-r from-alive5-orange to-orange-600 text-white shadow-orange hover:-translate-y-0.5'
              : 'bg-grey-900 text-white hover:-translate-y-0.5 hover:bg-grey-800',
          ].join(' ')}
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">Subscribe</span>
          <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */

function NeedMoreCard({
  icon,
  tagline,
  title,
  bullets,
  cta,
  highlight,
}: {
  icon: React.ReactNode;
  tagline: string;
  title: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={[
        'relative overflow-hidden rounded-3xl border bg-white p-8 md:p-10 dark:bg-grey-800',
        highlight
          ? 'border-grey-900 bg-gradient-to-br from-grey-900 via-[#1c1c1f] to-grey-900 text-white'
          : 'border-grey-200 shadow-md',
      ].join(' ')}
    >
      {highlight && (
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-alive5-orange/25 blur-3xl" />
      )}

      <span
        className={`relative inline-flex size-12 items-center justify-center rounded-2xl ${
          highlight ? 'bg-alive5-orange/20 text-alive5-orange ring-1 ring-alive5-orange/40' : 'bg-orange-100 text-alive5-orange'
        }`}
      >
        {icon}
      </span>

      <p className={`relative mt-5 text-legal font-semibold uppercase tracking-wider ${highlight ? 'text-grey-400' : 'text-grey-500'}`}>
        {tagline}
      </p>
      <h3 className={`relative mt-2 text-h3 font-bold leading-[1.1] ${highlight ? 'text-white' : 'text-grey-900'}`}>
        {title}
      </h3>

      <ul className="relative mt-6 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2 text-body ${highlight ? 'text-grey-300' : 'text-grey-700'}`}>
            <span className="mt-0.5 inline-flex size-4 flex-none items-center justify-center rounded-md bg-accent-green/20 text-accent-green ring-1 ring-accent-green/30">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      <a
        href="https://calendly.com/rohit-consult"
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'group relative mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-small font-semibold transition-all',
          highlight
            // text-[#1a1a1a] (arbitrary color) is NOT touched by the global
            // .dark .text-grey-900 remap, so dark text stays visible on white bg
            ? 'bg-white text-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-lg'
            : 'bg-alive5-orange text-white shadow-orange hover:-translate-y-0.5',
        ].join(' ')}
      >
        📞 {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */

function CompareTable() {
  const planNames = PLANS.map((p) => p.name);
  return (
    <div className="overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-md dark:bg-grey-800">
      <table className="w-full min-w-[760px] text-left">
        <thead className="sticky top-0 bg-gradient-to-b from-surface-soft to-white dark:from-grey-800 dark:to-grey-800">
          <tr>
            <th className="p-4 text-small font-semibold text-grey-500"></th>
            {planNames.map((n, i) => (
              <th
                key={n}
                className={`p-4 text-center text-small font-bold text-grey-900 ${
                  i === 2 ? 'bg-orange-50/60 dark:bg-alive5-orange/10' : ''
                }`}
              >
                {n}
                <p className="mt-0.5 text-legal font-medium text-grey-500">
                  ${PLANS[i].monthly}/mo
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((g) => (
            <CompareGroup key={g.group} group={g} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareGroup({ group }: { group: (typeof COMPARE)[number] }) {
  return (
    <>
      <tr>
        <td
          colSpan={5}
          className="bg-grey-50 px-4 py-2.5 text-legal font-bold uppercase tracking-wider text-grey-500 dark:bg-grey-900/40"
        >
          {group.group}
        </td>
      </tr>
      {group.rows.map((row, ri) => (
        <tr
          key={row.label}
          className={`border-t border-grey-100 ${
            ri % 2 === 1 ? 'bg-grey-50/30 dark:bg-grey-900/20' : ''
          }`}
        >
          <td className="p-4 text-small text-grey-800">{row.label}</td>
          {row.values.map((v, vi) => (
            <td
              key={vi}
              className={`p-4 text-center text-small ${
                vi === 2 ? 'bg-orange-50/40 dark:bg-alive5-orange/10' : ''
              }`}
            >
              <CompareCell value={v} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CompareCell({ value }: { value: string }) {
  if (value === '✓') {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === '—') {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-grey-100 text-grey-400">
        <X className="size-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  return <span className="font-medium text-grey-800">{value}</span>;
}

/* ---------------------------------------------------------------- */

/**
 * Calendly inline widget — uses Calendly's official embed script so visitors
 * can pick a slot directly on the page (no full-page redirect). Script loads
 * once and renders into the data-url div.
 */
function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
    const STYLE_HREF = 'https://assets.calendly.com/assets/external/widget.css';

    // CSS once
    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }
    // JS once
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Calendly URL params:
  //   hide_gdpr_banner=1  → drop the "Cookie settings" link
  //   primary_color       → tint Calendly buttons in alive5 orange
  //   text_color          → readable on white
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    primary_color: 'eb5124',
    text_color: '1f1f20',
  });
  const finalUrl = `${url}?${params.toString()}`;

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-md dark:border-white/10 dark:bg-grey-800">
      {/* Height tuned so all 4 meeting types fit without inner scrolling on
        desktop. On phones the widget scales down its own layout so a
        smaller min-height keeps it tight. */}
      <div
        className="calendly-inline-widget h-[1100px] sm:h-[900px] md:h-[820px]"
        data-url={finalUrl}
        style={{ minWidth: '320px' }}
      />
      <noscript>
        <p className="p-6 text-center text-small text-grey-700">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-alive5-orange hover:underline"
          >
            Open Rohit's calendar in a new tab →
          </a>
        </p>
      </noscript>
    </div>
  );
}

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl border border-grey-200 bg-white shadow-sm dark:bg-grey-800"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-grey-50 dark:hover:bg-grey-900/40"
        aria-expanded={open}
      >
        <span className="text-body font-semibold text-grey-900">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-orange-100 text-alive5-orange"
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-body text-grey-700">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
