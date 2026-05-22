import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Stagger, staggerItem } from '@/components/motion/FadeUp';
import { SectionHeading } from './SectionHeading';

export interface Step {
  image?: string;
  title: string;
  body: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: Step[];
  className?: string;
}

export function StepProcess({ eyebrow, title, subtitle, steps, className }: Props) {
  return (
    <Section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div key={s.title} variants={staggerItem} className="relative">
            <span className="mb-5 inline-flex size-11 items-center justify-center rounded-full bg-alive5-orange text-body font-bold text-white shadow-orange">
              {i + 1}
            </span>
            {s.image && (
              <div className="mb-5 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-surface-soft">
                <img src={s.image} alt="" loading="lazy" className="max-h-28 w-auto object-contain" />
              </div>
            )}
            <h3 className="text-h4 text-grey-900">{s.title}</h3>
            <p className="mt-2 text-body text-grey-700">{s.body}</p>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
