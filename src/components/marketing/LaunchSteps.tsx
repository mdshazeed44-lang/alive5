import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileCheck, Target, Lightbulb, MonitorSmartphone } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { FadeUp, Stagger, staggerItem } from '@/components/motion/FadeUp';

type Step = {
  title: string;
  body: string;
  Icon: typeof FileCheck;
};

const STEPS: Step[] = [
  {
    title: 'Add knowledge',
    body: 'Gather your support docs, PDFs, and web pages.',
    Icon: FileCheck,
  },
  {
    title: 'Train the A.I.',
    body: 'Ask questions internally to check accuracy and adjust content.',
    Icon: Target,
  },
  {
    title: 'Train your team',
    body: 'Set up a team training session to learn the ropes.',
    Icon: Lightbulb,
  },
  {
    title: 'Launch!',
    body: 'Deploy your chat widgets, links, QR codes, and SMS numbers.',
    Icon: MonitorSmartphone,
  },
];

/**
 * Illustrated "Launch in days, not weeks" steps section.
 *
 * Sits AFTER the FAQ in Home.tsx as the final pre-CTA push. Each step has
 * a peach illustration panel with a stylized icon + sparkle/star accents +
 * dashed motion line connecting the cards on lg+ screens. Single shared
 * "Book a Demo" CTA at the bottom. Fully responsive 1→2→4 grid.
 */
export function LaunchSteps() {
  return (
    <section
      id="launch-steps"
      aria-labelledby="launch-steps-title"
      className="relative overflow-hidden bg-gradient-to-b from-surface-page via-orange-50/50 to-surface-page py-24 dark:via-orange-950/15 md:py-28"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-orange-100/60 blur-3xl" />

      <Container className="relative">
        <FadeUp className="mx-auto max-w-4xl text-center">
          <h2
            id="launch-steps-title"
            className="text-h2 leading-[1.05] text-grey-900 md:text-[3rem]"
          >
            Launch in days, not weeks —{' '}
            <span className="bg-gradient-to-r from-alive5-orange via-orange-500 to-orange-600 bg-clip-text text-transparent">
              get results ASAP
            </span>
          </h2>
        </FadeUp>

        {/* peach card holding all four steps */}
        <FadeUp delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-200/70 via-orange-100/70 to-orange-200/70 p-8 shadow-[0_30px_80px_-30px_rgba(235,81,36,0.35)] ring-1 ring-orange-200/60 md:p-14">
            {/* dashed connector line across the top of the cards on lg+ */}
            <svg
              className="pointer-events-none absolute inset-x-12 top-[28%] hidden h-2 lg:block"
              viewBox="0 0 1000 8"
              preserveAspectRatio="none"
            >
              <path
                d="M0,4 Q250,-2 500,4 T1000,4"
                stroke="#eb5124"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                fill="none"
                opacity="0.4"
              />
            </svg>

            <Stagger className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
              {STEPS.map((s, i) => (
                <StepCard key={s.title} step={s} index={i} />
              ))}
            </Stagger>

            {/* CTA */}
            <FadeUp delay={0.5} className="mt-12 flex justify-center">
              <Link
                to="/thank-you"
                className="btn-orange group !px-10 !py-4 text-body shadow-orange hover:-translate-y-0.5"
              >
                Book a Demo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const { title, body, Icon } = step;
  return (
    <motion.div variants={staggerItem} className="group relative flex flex-col items-center text-center">
      {/* illustration panel */}
      <motion.div
        whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl border-2 border-grey-900 bg-orange-100 shadow-[6px_6px_0_0_rgba(31,31,32,0.92)]"
      >
        {/* sparkle stars */}
        <Sparkles index={index} />

        {/* dashed motion squiggle */}
        <svg
          className="pointer-events-none absolute inset-0 size-full opacity-50"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d={[
              'M10,15 Q30,5 50,20 T90,15',
              'M8,80 Q35,90 60,75 T95,80',
              'M85,20 Q70,40 80,60 T75,90',
              'M15,25 Q5,50 25,70 T15,90',
            ][index % 4]}
            stroke="#1f1f20"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            fill="none"
          />
        </svg>

        {/* central icon — large, with orange accent ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 -m-3 rounded-full bg-white shadow-md" />
            <Icon
              className="relative size-16 text-alive5-orange drop-shadow-[0_2px_0_rgba(31,31,32,0.92)]"
              strokeWidth={2.2}
            />
          </div>
        </div>
      </motion.div>

      <h3 className="mt-6 text-h4 font-bold text-grey-900">{title}</h3>
      <p className="mt-2 max-w-[16rem] text-body text-grey-700">{body}</p>
    </motion.div>
  );
}

function Sparkles({ index }: { index: number }) {
  // Different sparkle positions per card for visual variety
  const variants = [
    [{ x: 70, y: 20, s: 6 }, { x: 82, y: 35, s: 4 }, { x: 18, y: 80, s: 5 }],
    [{ x: 75, y: 18, s: 7 }, { x: 88, y: 30, s: 5 }, { x: 65, y: 12, s: 4 }],
    [{ x: 15, y: 18, s: 5 }, { x: 85, y: 25, s: 6 }, { x: 78, y: 85, s: 4 }],
    [{ x: 12, y: 15, s: 6 }, { x: 90, y: 18, s: 4 }, { x: 82, y: 78, s: 5 }, { x: 15, y: 82, s: 5 }],
  ];
  const pts = variants[index % 4];
  return (
    <>
      {pts.map((p, i) => (
        <motion.svg
          key={i}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s * 4, height: p.s * 4 }}
          viewBox="0 0 24 24"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          <path
            d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
            fill="#eb5124"
            stroke="#1f1f20"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </>
  );
}
