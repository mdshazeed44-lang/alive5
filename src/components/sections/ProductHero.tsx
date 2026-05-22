import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  image?: string;
  imageAlt?: string;
}

export function ProductHero({
  eyebrow,
  title,
  subtitle,
  primaryLabel = 'Book a demo',
  primaryTo = '/thank-you',
  secondaryLabel = 'Talk to sales',
  secondaryTo = '/contact-us',
  image,
  imageAlt = '',
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-surface-cream to-surface-page pt-36 pb-20 md:pt-44">
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-alive5-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent-teal/10 blur-3xl" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeUp>
              <p className="mb-4 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="text-h1 text-grey-900 md:text-display">{title}</h1>
            </FadeUp>
            {subtitle && (
              <FadeUp delay={0.1}>
                <p className="mt-6 max-w-xl text-body-lg text-grey-700">{subtitle}</p>
              </FadeUp>
            )}
            <FadeUp delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={primaryTo} className="btn-orange !px-7 !py-4 text-body">
                  {primaryLabel}
                </Link>
                {secondaryLabel && (
                  <Link to={secondaryTo} className="btn-ghost !px-7 !py-4 text-body">
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </FadeUp>
          </div>

          {image && (
            <FadeUp delay={0.1} y={40}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="overflow-hidden rounded-3xl border border-grey-100 bg-white shadow-xl"
              >
                <img src={image} alt={imageAlt} className="block w-full object-contain" />
              </motion.div>
            </FadeUp>
          )}
        </div>
      </Container>
    </section>
  );
}
