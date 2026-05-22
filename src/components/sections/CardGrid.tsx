import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Stagger, staggerItem } from '@/components/motion/FadeUp';
import { SectionHeading } from './SectionHeading';
import { cn } from '@/lib/utils';

export interface Card {
  image?: string;
  title: string;
  body?: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cards: Card[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function CardGrid({ eyebrow, title, subtitle, cards, columns = 3, className }: Props) {
  return (
    <Section className={className}>
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <Stagger className={cn('mt-14 grid gap-6', COLS[columns])}>
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl border border-grey-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-grey-800"
          >
            {c.image && (
              <div className="mb-5 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-surface-soft">
                <img src={c.image} alt="" loading="lazy" className="max-h-24 w-auto object-contain" />
              </div>
            )}
            <h3 className="text-h4 text-grey-900">{c.title}</h3>
            {c.body && <p className="mt-3 text-body text-grey-700">{c.body}</p>}
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
