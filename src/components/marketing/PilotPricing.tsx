import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  Sparkles,
  Rocket,
  Zap,
  TrendingUp,
  Star,
  Shield,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';

const PILOT_FEATURES = ['Support via Zoom calls', 'Chatbot & A.I. training', 'A.I. reporting'];
const GOLIVE_FEATURES = ['1 user license included', 'Ongoing optimization', 'Scheduled reports'];
const ADDONS = ['User license $30/mo', 'SMS $0.03/credit'];

const TRUST_BADGES = [
  { Icon: Shield, label: '60-day money back' },
  { Icon: Clock, label: 'Live in 14 days' },
  { Icon: Star, label: '4.9★ G2 rating' },
];

/**
 * "Try our Do It For You unlimited pilot" pricing section — premium edition.
 *
 * Left:  hero feature card with animated revenue chart, floating spark dots,
 *        rocket badge, and a live-activity indicator.
 * Right: two pricing cards — 60-day pilot ($500) and Go Live ($1/conv) —
 *        with glowing "MOST POPULAR" pill, star ratings, animated checks,
 *        add-ons sub-card, and shimmer CTA buttons.
 */
export function PilotPricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden bg-gradient-to-b from-surface-page via-orange-50/40 to-surface-page py-24 md:py-32"
    >
      {/* === decorative backdrops === */}
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-accent-light-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 size-80 rounded-full bg-orange-100/50 blur-3xl" />
      {/* dotted grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(72,72,74,0.25) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
        }}
      />

      <Container className="relative">
        {/* === header === */}
        <FadeUp className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-4 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur">
            <Sparkles className="size-3.5" />
            Done-for-you launch
          </span>
          <h2
            id="pricing-title"
            className="mt-6 text-h2 leading-[1.05] text-grey-900 md:text-[3.25rem]"
          >
            Try our <span className="italic font-display">"Do It For You"</span>
            <br />
            <span className="bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
              unlimited pilot
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-grey-700">
            We launch your knowledge chatbot, train your team, and stay on hand for success.
            Flat-rate first, then pay-as-you-go.
          </p>

          {/* trust strip */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
        </FadeUp>

        {/* === 3-card grid === */}
        <Stagger className="mt-14 grid items-stretch gap-6 lg:grid-cols-3" stagger={0.12}>
          <HeroFeatureCard />

          <PricingCard
            kind="60 day pilot"
            kindDotClass="bg-alive5-orange"
            kindIcon={<Zap className="size-3.5 text-alive5-orange" />}
            price="$500"
            priceUnit="one-time"
            blurb="Do-it-for-you launch, team training, and usage analysis for your first 30 days — regardless of volume."
            features={PILOT_FEATURES}
            cta="Get started"
          />

          <PricingCard
            kind="Go live"
            kindDotClass="bg-accent-green"
            kindIcon={<TrendingUp className="size-3.5 text-accent-green" />}
            price="$1"
            priceUnit="/ A.I. conversation"
            blurb="Flexible pricing based on usage and team size. $500 monthly minimum, with automatic volume discounts."
            features={GOLIVE_FEATURES}
            addons={ADDONS}
            cta="Get started"
            highlight
          />
        </Stagger>

        {/* tiny footnote */}
        <FadeUp delay={0.4} className="mt-8 text-center">
          <p className="text-small text-grey-500">
            All plans include privacy-first A.I. training, SOC 2 Type 2, and GDPR compliance.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function HeroFeatureCard() {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border border-grey-900/10 bg-gradient-to-br from-grey-900 via-[#1c1c1f] to-grey-900 p-8 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] md:p-10"
    >
      {/* === backdrop layers === */}
      {/* radial glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-alive5-orange/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-accent-purple/20 blur-3xl" />

      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* animated revenue chart */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 w-full"
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-chart-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-chart-orange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eb5124" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#eb5124" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* green growth area */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          d="M0,200 L40,180 L80,190 L120,150 L160,165 L200,120 L240,140 L280,90 L320,110 L360,55 L400,80"
          stroke="#34d399"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M0,200 L40,180 L80,190 L120,150 L160,165 L200,120 L240,140 L280,90 L320,110 L360,55 L400,80 L400,240 L0,240 Z"
          fill="url(#hero-chart-green)"
        />
        {/* orange comparison line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
          d="M0,225 L40,215 L80,218 L120,205 L160,210 L200,195 L240,200 L280,180 L320,185 L360,160 L400,170"
          stroke="#eb5124"
          strokeWidth="2"
          fill="none"
        />
        {/* tracking dot at end of green line */}
        <motion.circle
          cx="400"
          cy="80"
          r="4"
          fill="#34d399"
          initial={{ scale: 0 }}
          whileInView={{ scale: [0, 1.4, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.8 }}
        />
        <motion.circle
          cx="400"
          cy="80"
          r="10"
          fill="#34d399"
          opacity="0.3"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        />
      </svg>

      {/* floating spark particles */}
      {[
        { x: 78, y: 18, d: 0 },
        { x: 12, y: 60, d: 0.8 },
        { x: 90, y: 45, d: 1.6 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: p.d }}
        >
          <Sparkles className="size-3 text-alive5-orange" />
        </motion.span>
      ))}

      {/* === content === */}
      <div className="relative flex h-full flex-col justify-between gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-alive5-orange/20 text-alive5-orange ring-1 ring-alive5-orange/40">
              <Rocket className="size-6" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-legal font-semibold uppercase tracking-wider text-grey-300 backdrop-blur">
              Featured
            </span>
          </div>

          <h3 className="mt-7 text-[2rem] font-bold leading-[1.05] tracking-tight md:text-[2.5rem]">
            The fully managed
            <br />
            <span className="bg-gradient-to-r from-alive5-orange via-orange-400 to-orange-600 bg-clip-text text-transparent">
              A.I. solution
            </span>
          </h3>
          <p className="mt-5 max-w-xs text-body text-grey-300">
            We'll help launch your knowledge chatbot, train your team, and ensure customer success
            along the way.
          </p>

          {/* mini-stat row */}
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-xs">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <p className="text-h4 font-bold text-white">90%+</p>
              <p className="text-legal text-grey-400">A.I. resolved</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <p className="text-h4 font-bold text-white">5×</p>
              <p className="text-legal text-grey-400">ROI</p>
            </div>
          </div>
        </div>

        {/* live activity indicator */}
        <div className="flex items-center gap-2 text-small text-grey-400">
          <span className="relative inline-flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent-green opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-green" />
          </span>
          Real customer launches in 14 days
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */

function PricingCard({
  kind,
  kindDotClass,
  kindIcon,
  price,
  priceUnit,
  blurb,
  features,
  addons,
  cta,
  highlight,
}: {
  kind: string;
  kindDotClass: string;
  kindIcon: React.ReactNode;
  price: string;
  priceUnit: string;
  blurb: string;
  features: string[];
  addons?: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={[
        'relative flex flex-col overflow-hidden rounded-3xl border bg-white p-8 md:p-10 dark:bg-grey-800',
        highlight
          ? 'border-alive5-orange/40 shadow-[0_30px_80px_-30px_rgba(235,81,36,0.55)] ring-1 ring-alive5-orange/30'
          : 'border-grey-200 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]',
      ].join(' ')}
    >
      {/* highlight glow background */}
      {highlight && (
        <>
          <div className="pointer-events-none absolute -top-20 right-0 size-48 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 size-48 rounded-full bg-orange-100/80 blur-3xl" />
        </>
      )}

      {/* MOST POPULAR badge */}
      {highlight && (
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-alive5-orange to-orange-600 px-3 py-1 text-legal font-bold uppercase tracking-wider text-white shadow-orange"
        >
          <Star className="size-3 fill-white" strokeWidth={0} />
          Most popular
        </motion.span>
      )}

      {/* kind chip */}
      <div className="relative inline-flex items-center gap-2 self-start rounded-full bg-surface-soft px-3 py-1.5">
        <span className={`inline-block size-2 rounded-full ${kindDotClass}`} />
        <span className="inline-flex items-center gap-1 text-legal font-semibold uppercase tracking-wider text-grey-700">
          {kindIcon}
          {kind}
        </span>
      </div>

      {/* price */}
      <div className="relative mt-6 flex items-baseline gap-2">
        <span className="text-[3.25rem] font-bold leading-none tracking-tight text-grey-900 md:text-[3.75rem]">
          {price}
        </span>
        <span className="text-body text-grey-500">{priceUnit}</span>
      </div>

      <p className="relative mt-5 text-body text-grey-700">{blurb}</p>

      {/* features */}
      <ul className="relative mt-7 space-y-3">
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            className="flex items-start gap-2.5 text-body text-grey-800"
          >
            <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {f}
          </motion.li>
        ))}
      </ul>

      {/* add-ons */}
      {addons && (
        <div className="relative mt-6 rounded-2xl border border-grey-200/80 bg-gradient-to-br from-surface-soft/80 to-white p-4 shadow-inner">
          <p className="text-legal font-bold uppercase tracking-wider text-grey-500">Add-ons</p>
          <ul className="mt-2.5 space-y-2">
            {addons.map((a) => (
              <li key={a} className="flex items-center gap-2 text-small text-grey-700">
                <span className="inline-block size-1.5 rounded-full bg-alive5-orange" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA pinned to bottom */}
      <div className="relative mt-auto pt-8">
        <Link
          to="/thank-you"
          className={[
            'group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-body font-semibold transition-all',
            highlight
              ? 'bg-gradient-to-r from-alive5-orange to-orange-600 text-white shadow-orange hover:-translate-y-0.5 hover:shadow-lg'
              : 'bg-grey-900 text-white hover:-translate-y-0.5 hover:bg-grey-800 hover:shadow-lg',
          ].join(' ')}
        >
          {/* shimmer */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative">{cta}</span>
          <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
