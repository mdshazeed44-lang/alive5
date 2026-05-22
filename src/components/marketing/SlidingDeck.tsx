import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Bell, BarChart3, MessageSquare, Smartphone, Facebook, Mail } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const AV = (n: string) => `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/${n}`;

const COPY = [
  {
    eyebrow: 'Real-time alerts',
    title: 'Know what matters, when it matters',
    body: 'Critical questions reach the right person before leads go cold and opportunities slip by.',
  },
  {
    eyebrow: 'Conversation intelligence',
    title: 'See the patterns across your week',
    body: "What's answered, what's stuck, and where revenue is at risk — surfaced automatically.",
  },
  {
    eyebrow: 'Unified inbox',
    title: 'Connect every channel',
    body: 'Alive5 listens across web chat, SMS, and social, capturing every signal in one place.',
  },
];

/** Twine-style scroll-pinned deck: device stays pinned while its screen swaps between slides. */
export function SlidingDeck() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // crossfade windows for 3 slides
  const op0 = useTransform(scrollYProgress, [0, 0.05, 0.28, 0.34], [1, 1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.3, 0.37, 0.6, 0.67], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.63, 0.7, 1], [0, 1, 1]);
  const y0 = useTransform(scrollYProgress, [0, 0.34], [0, -40]);
  const y1 = useTransform(scrollYProgress, [0.3, 0.67], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0.63, 1], [40, 0]);
  const ops = [op0, op1, op2];
  const ys = [y0, y1, y2];
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (reduce) {
    return (
      <section className="bg-surface-soft py-20">
        <Container className="space-y-16">
          {COPY.map((c, i) => (
            <div key={i} className="grid items-center gap-10 lg:grid-cols-2">
              <Device slide={i} />
              <CopyBlock {...c} />
            </div>
          ))}
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-surface-soft" style={{ height: '320vh' }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* pinned device with stacked, crossfading screens */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* progress rail */}
            <div className="absolute -left-6 top-1/2 hidden h-40 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-grey-200 lg:block">
              <motion.div className="w-full rounded-full bg-alive5-orange" style={{ height: fill }} />
            </div>

            <div className="relative rounded-[2rem] border border-grey-200 bg-grey-900 p-2.5 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} className="absolute inset-0" style={{ opacity: ops[i], y: ys[i] }}>
                    <Screen slide={i} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* floating notification — only over slide 0 */}
            <motion.div
              style={{ opacity: op0 }}
              className="absolute left-4 top-6 w-72 max-w-[80%]"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-start gap-3 rounded-2xl border border-white/40 bg-grey-900/80 px-4 py-3 text-white shadow-xl backdrop-blur"
              >
                <span className="mt-0.5 inline-flex size-7 flex-none items-center justify-center rounded-md bg-alive5-orange">
                  <Bell className="size-3.5" />
                </span>
                <div className="leading-snug">
                  <p className="flex items-center justify-between gap-3 text-small font-semibold">
                    VIP lead waiting <span className="text-legal font-normal text-grey-300">now</span>
                  </p>
                  <p className="text-legal text-grey-300">Is the suite available this Saturday?</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* crossfading copy */}
          <div className="relative min-h-[180px]">
            {COPY.map((c, i) => (
              <motion.div key={i} style={{ opacity: ops[i], y: ys[i] }} className="absolute inset-0">
                <CopyBlock {...c} />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

function CopyBlock({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-md">
      <p className="mb-3 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">{eyebrow}</p>
      <h2 className="text-h3 text-grey-900 md:text-h2">{title}</h2>
      <p className="mt-5 text-body-lg text-grey-700">{body}</p>
    </div>
  );
}

/* device wrapper used only in the reduced-motion fallback */
function Device({ slide }: { slide: number }) {
  return (
    <div className="relative rounded-[2rem] border border-grey-200 bg-grey-900 p-2.5 shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
        <Screen slide={slide} />
      </div>
    </div>
  );
}

function Screen({ slide }: { slide: number }) {
  if (slide === 0) return <ScreenAlert />;
  if (slide === 1) return <ScreenDashboard />;
  return <ScreenConnect />;
}

function ScreenAlert() {
  return (
    <div className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-orange-100 via-surface-cream to-accent-light-blue/30 p-6">
      <div className="space-y-3">
        <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-alive5-orange px-4 py-2.5 text-small text-white shadow">
          Is the VIP suite available this Saturday?
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-small text-grey-700 shadow">
          Yes — suite 204 is open. I've flagged this to your events team and they'll text you to confirm. ✓
        </div>
      </div>
    </div>
  );
}

function ScreenDashboard() {
  const blockers = [
    ['Pricing & contract questions', '38 chats'],
    ['Suite & group availability', '24 chats'],
    ['Parking and entry info', '17 chats'],
  ];
  return (
    <div className="h-full w-full bg-white p-6">
      <div className="flex items-center gap-2 text-grey-400">
        <BarChart3 className="size-4 text-alive5-orange" />
        <span className="text-legal font-medium uppercase tracking-wider">Week of Jul 14</span>
      </div>
      <h3 className="mt-2 text-h4 font-bold text-grey-900">Conversation intelligence</h3>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          ['1,284', 'conversations'],
          ['92%', 'A.I. resolved'],
          ['$4.2M', 'pipeline value'],
        ].map(([n, l]) => (
          <div key={l} className="rounded-xl bg-surface-soft p-3">
            <p className="text-h4 font-bold text-grey-900">{n}</p>
            <p className="text-legal text-grey-500">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-legal font-semibold uppercase tracking-wider text-grey-400">Top questions</p>
      <div className="mt-2 space-y-2">
        {blockers.map(([q, c]) => (
          <div key={q} className="flex items-center justify-between rounded-lg border border-grey-100 px-3 py-2">
            <span className="text-small text-grey-700">{q}</span>
            <span className="text-legal font-medium text-alive5-orange">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenConnect() {
  const people = ['man-2-68w.png', 'woman3-68w.png', 'man-3-68w.png', 'woman2-68w.png'];
  const tiles = [
    { icon: <MessageSquare className="size-4" />, c: 'bg-accent-teal', pos: 'left-6 top-8' },
    { icon: <Smartphone className="size-4" />, c: 'bg-alive5-orange', pos: 'right-10 top-6' },
    { icon: <Facebook className="size-4" />, c: 'bg-accent-navy', pos: 'left-16 top-24' },
    { icon: <Mail className="size-4" />, c: 'bg-accent-purple', pos: 'right-6 top-28' },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-white to-surface-soft">
      {/* scattered avatars */}
      {people.map((p, i) => (
        <motion.img
          key={p}
          src={AV(p)}
          alt=""
          animate={{ y: [0, i % 2 ? -8 : 8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute size-12 rounded-xl border-2 border-white object-cover shadow-md"
          style={{ left: `${18 + i * 20}%`, top: `${14 + (i % 2) * 18}%` }}
        />
      ))}
      {/* channel tiles */}
      {tiles.map((t, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inline-flex size-9 items-center justify-center rounded-xl text-white shadow-md ${t.c} ${t.pos}`}
        >
          {t.icon}
        </motion.span>
      ))}
      {/* converging rays + center mark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-alive5-orange/15 blur-2xl" />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-grey-900 text-h4 font-bold text-white shadow-xl">
          a5
        </span>
      </div>
    </div>
  );
}
