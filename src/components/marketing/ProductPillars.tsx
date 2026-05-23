import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  PieChart,
  BarChart3,
  TrendingUp,
  FileText,
  Lock,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Download,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';

const IMG = {
  retrain: '/features/retrain-382c8e81-652w.png',
  feedback: '/features/sms-reporting-7314c56a-566h.png',
  partners: '/features/logo_aws-84d4533b-662w.png',
};

/**
 * Three product-pillar sections lifted from alive5.com:
 *   1. Easy to train and maintain  (one-click A.I. training)
 *   2. Discover what your users really need  (A.I. feedback loop)
 *   3. Enterprise ready  (compliance + Anthropic/AWS Bedrock partners)
 *
 * Designed for AEO/GEO: each section has a clear question-answer pattern,
 * semantic h2 + descriptive paragraph + bullet list of concrete capabilities.
 * Pure CSS visuals — no remote image dependencies that could break.
 */
export function ProductPillars() {
  return (
    <>
      {/* === 1. Easy to train and maintain === */}
      <section
        id="train-maintain"
        aria-labelledby="train-maintain-title"
        className="bg-white py-24 dark:bg-grey-900 md:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-legal font-semibold uppercase tracking-[0.15em] text-alive5-orange">
                <Sparkles className="size-3" />
                One-click A.I. training
              </span>
              <h2
                id="train-maintain-title"
                className="mt-5 text-h2 leading-[1.05] text-grey-900"
              >
                Easy to train{' '}
                <span className="text-alive5-orange">and maintain</span>
              </h2>
              <p className="mt-5 text-body-lg text-grey-700">
                Skip manual content prep — use your existing website, FAQs, and PDFs as-is to train
                A.I. in seconds. Add new promotions and procedures instantly, and remove outdated
                information with one click.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Re-train from a URL or PDF in under 60 seconds',
                  'Version history with one-click rollback',
                  'Sync schedule keeps A.I. always current',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-body text-grey-800">
                    <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green">
                      <RefreshCw className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </FadeUp>

            {/* Keyboard "RETRAIN" key illustration */}
            <FadeUp delay={0.1}>
              <RetrainVisual />
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* === 2. Discover what your users really need === */}
      <section
        id="user-insights"
        aria-labelledby="user-insights-title"
        className="bg-surface-soft py-24 md:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Feedback loop visual (left on lg) */}
            <FadeUp className="order-2 lg:order-1">
              <FeedbackLoopVisual />
            </FadeUp>

            <FadeUp delay={0.1} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-legal font-semibold uppercase tracking-[0.15em] text-alive5-orange">
                <BarChart3 className="size-3" />
                A.I. feedback loop
              </span>
              <h2
                id="user-insights-title"
                className="mt-5 text-h2 leading-[1.05] text-grey-900"
              >
                Discover what your{' '}
                <span className="text-alive5-orange">users really need</span>
              </h2>
              <p className="mt-5 text-body-lg text-grey-700">
                Every conversation becomes data. View transcripts and feedback reports to uncover
                knowledge gaps, refine your website content, and turn missed answers into closed
                deals.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Weekly digest of top unresolved questions',
                  'Sentiment tagging on every interaction',
                  'Export to CSV or pipe into your CRM',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-body text-grey-800">
                    <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-md bg-accent-green/15 text-accent-green">
                      <TrendingUp className="size-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* === 3. Enterprise ready === */}
      <section
        id="enterprise-ready"
        aria-labelledby="enterprise-ready-title"
        className="bg-white py-24 dark:bg-grey-900 md:py-28"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeUp>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-legal font-semibold uppercase tracking-[0.15em] text-alive5-orange">
                <ShieldCheck className="size-3" />
                Scales with confidence
              </span>
              <h2
                id="enterprise-ready-title"
                className="mt-5 text-h2 leading-[1.05] text-grey-900"
              >
                Enterprise{' '}
                <span className="text-alive5-orange">ready</span>
              </h2>
              <p className="mt-5 text-body-lg text-grey-700">
                A.I. safety comes first with comprehensive privacy, security, and compliance built
                by design — including SOC 2 Type 2 and GDPR compliance.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Lock, label: 'SOC 2 Type 2' },
                  { icon: ShieldCheck, label: 'GDPR compliant' },
                  { icon: FileText, label: 'BAA available' },
                  { icon: PieChart, label: 'Zero data retention' },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-grey-200 bg-white px-3.5 py-2.5 text-small font-medium text-grey-800 shadow-sm dark:border-white/10 dark:bg-grey-800 dark:text-grey-200"
                  >
                    <Icon className="size-4 text-alive5-orange" />
                    {label}
                  </li>
                ))}
              </ul>
              <Link
                to="/security-overview"
                className="btn-orange group mt-8 !px-7 !py-4 text-body"
              >
                <Download className="size-4" />
                Download A.I. Safety & Compliance guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>

            <FadeUp delay={0.1}>
              <PartnersVisual />
            </FadeUp>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ---------- Visual sub-components (pure CSS/SVG) ---------- */

/** Reusable framed-image visual: blurred halo + soft shadow + gentle float. */
function FeatureImage({
  src,
  alt,
  tilt = 0,
  haloClass = 'bg-orange-300/40',
}: {
  src: string;
  alt: string;
  tilt?: number;
  haloClass?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className={`pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] blur-3xl ${haloClass}`}
      />
      <motion.div
        initial={{ rotate: tilt, y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        style={{ transformOrigin: 'center' }}
        className="relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] ring-1 ring-grey-200 dark:ring-white/10"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={652}
          height={500}
          className="block size-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function RetrainVisual() {
  return (
    <FeatureImage
      src={IMG.retrain}
      alt="A blue 'RETRAIN' key on a white keyboard — illustrating one-click A.I. retraining in Alive5."
      tilt={-1.5}
      haloClass="bg-accent-light-blue/35"
    />
  );
}

function FeedbackLoopVisual() {
  return (
    <FeatureImage
      src={IMG.feedback}
      alt="A.I. feedback loop diagram with charts, transcripts, and trend reports — surfacing what users really need."
      tilt={1.5}
      haloClass="bg-orange-300/40"
    />
  );
}

function PartnersVisual() {
  return (
    <FeatureImage
      src={IMG.partners}
      alt="Alive5 enterprise stack — built on Amazon Bedrock and Anthropic Claude with zero data retention."
      tilt={-1}
      haloClass="bg-accent-purple/25"
    />
  );
}
