import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { FadeUp } from '@/components/motion/FadeUp';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  body?: string | string[];
  bullets?: string[];
  image: string;
  imageAlt?: string;
  reverse?: boolean;
  className?: string;
}

/** Alternating image + copy section — the workhorse layout for product pages. */
export function FeatureSplit({ eyebrow, title, body, bullets, image, imageAlt = '', reverse, className }: Props) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  return (
    <Section className={className}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeUp className={cn(reverse && 'lg:order-2')}>
          {eyebrow && (
            <p className="mb-4 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">{eyebrow}</p>
          )}
          <h2 className="text-h3 text-grey-900 md:text-h2">{title}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-5 text-body-lg leading-relaxed text-grey-700">
              {p}
            </p>
          ))}
          {bullets && (
            <ul className="mt-7 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-body text-grey-800">
                  <span className="mt-0.5 inline-flex size-6 flex-none items-center justify-center rounded-full bg-orange-100 text-alive5-orange">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </FadeUp>

        <FadeUp className={cn(reverse && 'lg:order-1')} y={40}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden rounded-2xl border border-grey-100 bg-surface-soft shadow-lg"
          >
            <img src={image} alt={imageAlt} loading="lazy" className="block w-full object-contain" />
          </motion.div>
        </FadeUp>
      </div>
    </Section>
  );
}
