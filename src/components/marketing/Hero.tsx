import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, MessageCircle, Smartphone, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ChatMockup } from './ChatMockup';

const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const HEADLINE = 'Personalized answers powered by your knowledge, 24/7';

const AVATARS = [
  'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-2-68w.png',
  'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman3-68w.png',
  'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/man-3-68w.png',
];

export function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE.split(' ');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-36 pb-20 md:pt-44 md:pb-28">
      {/* layered backdrop */}
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
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 size-96 rounded-full bg-accent-light-blue/30 blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3.5 py-1.5 text-small font-semibold text-alive5-orange shadow-sm backdrop-blur">
              <Sparkles className="size-3.5" />
              A.I. trained only on your business
            </span>
          </motion.div>

          {/* Word-stagger headline */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
            className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight text-grey-900 sm:text-[56px] lg:text-h1"
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '110%', opacity: 0 },
                    show: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  {w}
                  {i < words.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-6 max-w-xl text-body-lg text-grey-700"
          >
            A shared inbox where every customer question gets answered — by your team or A.I. that knows your
            business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/thank-you" className="btn-orange group !px-7 !py-4 text-body">
              Schedule a live demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="btn-ghost !px-7 !py-4 text-body">
              See how it works
            </a>
          </motion.div>

          {/* trust cluster */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-9 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {AVATARS.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="size-9 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>
            <p className="text-small text-grey-600">
              <span className="font-semibold text-grey-900">90%+</span> answered by A.I. ·{' '}
              <span className="font-semibold text-grey-900">5× ROI</span> · 60-day pilot
            </p>
          </motion.div>
        </div>

        {/* Floating chat mockup with channel chips */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-gradient-to-tr from-alive5-orange/25 via-orange-200/30 to-accent-light-blue/25 blur-2xl" />

          <div className={reduce ? '' : 'animate-float'}>
            <ChatMockup />
          </div>

          {/* floating glass chips */}
          {!reduce && (
            <>
              <FloatingChip
                className="-left-6 top-10 sm:-left-12"
                delay={0}
                icon={<MessageCircle className="size-3.5 text-accent-teal" />}
                label="Live chat"
                sub="Routed to an agent"
                dot="bg-accent-green"
              />
              <FloatingChip
                className="-right-4 bottom-24 sm:-right-10"
                delay={1.2}
                icon={<Smartphone className="size-3.5 text-alive5-orange" />}
                label="SMS"
                sub="New text reply"
              />
            </>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function FloatingChip({
  className,
  delay,
  icon,
  label,
  sub,
  dot,
}: {
  className: string;
  delay: number;
  icon: React.ReactNode;
  label: string;
  sub: string;
  dot?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute hidden items-center gap-2.5 rounded-xl border border-grey-100 bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur sm:flex ${className}`}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-surface-soft">{icon}</span>
      <div className="leading-tight">
        <p className="flex items-center gap-1.5 text-small font-semibold text-grey-900">
          {dot && <span className={`inline-block size-1.5 rounded-full ${dot}`} />}
          {label}
        </p>
        <p className="text-legal text-grey-500">{sub}</p>
      </div>
    </motion.div>
  );
}
