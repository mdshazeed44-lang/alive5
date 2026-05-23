import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';
import { SEOHead } from '@/components/seo/SEOHead';

export type IndustryUseCase = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

export type IndustryStat = { value: string; label: string };

interface IndustryPageProps {
  /** Slug for canonical URL — e.g. "sports", "gov" */
  slug: string;
  /** Eyebrow chip text (e.g. "INDUSTRIES • SPORTS") */
  eyebrow: string;
  /** Page hero heading — second half goes inside orange highlight */
  titleStart: string;
  titleHighlight: string;
  /** Hero sub-paragraph */
  intro: string;
  /** Path to local hero illustration (transparent PNG ideally) */
  heroImage: string;
  /** SEO title + description */
  seoTitle: string;
  seoDescription: string;
  /** Use-case cards */
  useCases: IndustryUseCase[];
  /** Stat tiles */
  stats: IndustryStat[];
  /** 4-5 short benefit bullets shown beside the secondary illustration */
  benefits: string[];
  /** Quote / testimonial */
  testimonial: { quote: string; name: string; role: string };
}

/**
 * Reusable polished landing page for an Industry (Sports / Higher Ed / Government).
 * Mirrors the look-and-feel of the BusinessSMS page but with industry-specific
 * copy, icons, and stats. Renders an SEO-friendly H1, FAQ-free hero + use-cases +
 * benefits + stats + testimonial + final CTA. Theme-aware throughout.
 */
export function IndustryPage({
  slug,
  eyebrow,
  titleStart,
  titleHighlight,
  intro,
  heroImage,
  seoTitle,
  seoDescription,
  useCases,
  stats,
  benefits,
  testimonial,
}: IndustryPageProps) {
  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://www.alive5.com/${slug}`}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-32 pb-20 dark:from-[#2a1b14] dark:via-grey-900 dark:to-grey-900 md:pt-40 md:pb-24">
        <div className="pointer-events-none absolute -left-32 top-12 size-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-900/30" />
        <div className="pointer-events-none absolute right-0 top-40 size-96 rounded-full bg-accent-light-blue/30 blur-3xl dark:bg-accent-teal/20" />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur dark:border-orange-700/40 dark:bg-white/10">
                <Sparkles className="size-3.5" />
                {eyebrow}
              </span>
              <h1 className="mt-6 text-h1 leading-[1.05] text-grey-900 md:text-[3.5rem]">
                {titleStart}{' '}
                <span className="bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              </h1>
              <p className="mt-5 text-body-lg text-grey-700">{intro}</p>
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
                <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-orange-200/30 blur-3xl dark:bg-orange-900/25" />
                <motion.img
                  src={heroImage}
                  alt={`${titleStart} ${titleHighlight} illustration`}
                  loading="eager"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="w-full drop-shadow-[0_20px_40px_rgba(31,31,32,0.18)]"
                />
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <Section>
        <Stagger className="grid gap-6 sm:grid-cols-3" stagger={0.1}>
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-grey-200 bg-gradient-to-br from-orange-50 to-white p-7 text-center shadow-sm dark:border-white/10 dark:from-grey-800 dark:to-grey-900"
            >
              <p className="text-[2.75rem] font-bold leading-none text-alive5-orange">{s.value}</p>
              <p className="mt-3 text-body text-grey-700">{s.label}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ===== USE CASES ===== */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Real-world impact
          </p>
          <h2 className="mt-3 text-h2 text-grey-900">
            Built for your{' '}
            <span className="text-alive5-orange">use cases</span>
          </h2>
        </FadeUp>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {useCases.map((u) => (
            <motion.div
              key={u.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-grey-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:bg-grey-800"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange-100 text-alive5-orange">
                <u.Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-h4 text-grey-900">{u.title}</h3>
              <p className="mt-3 text-small text-grey-700">{u.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ===== BENEFITS ===== */}
      <Section>
        <FadeUp className="mx-auto max-w-3xl rounded-3xl border border-grey-200 bg-white p-8 shadow-sm dark:bg-grey-800 md:p-12">
          <p className="text-legal font-semibold uppercase tracking-[0.18em] text-alive5-orange">
            Why teams choose Alive5
          </p>
          <h2 className="mt-3 text-h3 text-grey-900">
            Everything you need —{' '}
            <span className="text-alive5-orange">nothing you don't</span>
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-body text-grey-800">
                <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green ring-1 ring-accent-green/20">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </FadeUp>
      </Section>

      {/* ===== TESTIMONIAL ===== */}
      <Section className="bg-surface-soft">
        <FadeUp className="mx-auto max-w-4xl rounded-3xl border border-grey-200 bg-white p-8 shadow-md dark:bg-grey-800 md:p-12">
          <span className="text-[3rem] leading-none text-alive5-orange">"</span>
          <blockquote className="-mt-4 text-h4 leading-snug text-grey-900 md:text-h3">
            {testimonial.quote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-alive5-orange to-orange-600 text-body font-bold text-white shadow-orange">
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <div>
              <p className="text-body font-bold text-grey-900">{testimonial.name}</p>
              <p className="text-small text-grey-700">{testimonial.role}</p>
            </div>
          </div>
        </FadeUp>
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
              <h2 className="mx-auto text-h2 text-white md:text-[3rem] md:leading-[1.05]">
                Ready to engage {titleHighlight.toLowerCase()}?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/90">
                Book a 30-minute call and we'll map your use case + show a live demo.
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
