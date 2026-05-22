import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeUp } from '@/components/motion/FadeUp';

interface Props {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function CTASection({
  title,
  subtitle,
  primaryLabel = 'Schedule a live demo',
  primaryTo = '/thank-you',
  secondaryLabel,
  secondaryTo = '/',
}: Props) {
  return (
    <Section bleed className="!py-0 pb-24">
      <Container>
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-alive5-orange px-8 py-16 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-6 size-56 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative mx-auto max-w-3xl text-h2 text-white">{title}</h2>
            {subtitle && <p className="relative mx-auto mt-5 max-w-xl text-body-lg text-white/90">{subtitle}</p>}
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  to={primaryTo}
                  className="inline-flex min-h-[52px] items-center justify-center rounded bg-white px-8 py-4 text-body font-semibold text-alive5-orange shadow-lg transition-shadow hover:shadow-xl"
                >
                  {primaryLabel}
                </Link>
              </motion.div>
              {secondaryLabel && (
                <Link
                  to={secondaryTo}
                  className="inline-flex min-h-[52px] items-center justify-center rounded border border-white/40 px-8 py-4 text-body font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
