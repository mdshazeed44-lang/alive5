import { Bell, BarChart3, MessageSquare, Smartphone, Facebook, Mail } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const AV = (n: string) => `https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/${n}`;

type Slide = { eyebrow: string; title: string; body: string };

const SLIDES: Slide[] = [
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

/**
 * Scroll-stacked card deck — reverse-engineered from healthylongevity.clinic.
 *
 * The trick is dead-simple:
 *   1. All cards share the SAME `position: sticky; top: 6rem`.
 *   2. Each card has a fixed min-height (32rem) so it produces enough
 *      natural document-flow scroll travel before the next card reaches
 *      its sticky position.
 *   3. Parent is `flex flex-col` with a small gap. NO transforms anywhere
 *      (transforms on ancestors break sticky). DOM order makes later
 *      cards naturally render on top of earlier ones, so no z-index hack.
 */
export function SlidingDeck() {
  // NOTE: we deliberately do NOT branch on `useReducedMotion()` here.
  // The stacking effect is pure CSS `position: sticky` — it is layout, not
  // animation, so it does not violate prefers-reduced-motion. Previously
  // the reduce-motion fallback rendered a plain vertical stack with no
  // sticky, which made the cards appear separate on systems where the OS
  // had reduced motion enabled.
  return (
    <section className="bg-surface-soft py-20">
      <Container>
        <div className="flex flex-col gap-8">
          {SLIDES.map((c, i) => (
            <div
              key={i}
              className="min-h-[32rem] overflow-hidden rounded-[2rem] border border-grey-200 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-grey-800"
              style={{ position: 'sticky', top: '6rem' }}
            >
              <StackCard slide={i} copy={c} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StackCard({ slide, copy }: { slide: number; copy: Slide }) {
  return (
    <div className="relative h-full p-6 md:p-10">
      <div className="grid h-full items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Device slide={slide} />
        <CopyBlock {...copy} />
      </div>
    </div>
  );
}

function CopyBlock({ eyebrow, title, body }: Slide) {
  return (
    <div className="max-w-md">
      <p className="mb-3 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">
        {eyebrow}
      </p>
      <h2 className="text-h3 text-grey-900 md:text-h2">{title}</h2>
      <p className="mt-5 text-body-lg text-grey-700">{body}</p>
    </div>
  );
}

function Device({ slide }: { slide: number }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative rounded-[1.75rem] border border-grey-200 bg-grey-900 p-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-white dark:bg-grey-900">
          <Screen slide={slide} />
        </div>

        {/* twine-style floating notification — only on the real-time-alerts slide */}
        {slide === 0 && (
          <div className="absolute -top-5 left-6 right-6 mx-auto max-w-md">
            <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-grey-900/90 px-4 py-3 shadow-2xl backdrop-blur-md">
              <div className="flex -space-x-2">
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-white/30 bg-alive5-orange shadow-md">
                  <Bell className="size-4 text-white" />
                </span>
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-white/30 bg-[#4A154B] shadow-md">
                  <span className="text-legal font-bold text-white">#</span>
                </span>
              </div>
              <div className="min-w-0 flex-1 leading-snug text-white">
                <p className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-small font-semibold">New rival emerging in EMEA</span>
                  <span className="flex-none text-legal font-normal text-grey-400">now</span>
                </p>
                <p className="mt-0.5 text-legal text-grey-300">
                  3 prospects framed them as the stronger option.
                </p>
              </div>
            </div>
          </div>
        )}
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
    <div className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-orange-100 via-surface-cream to-accent-light-blue/30 p-7">
      <div className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-alive5-orange/20 blur-3xl" />
      <div className="space-y-3">
        <div className="ml-auto max-w-[72%] rounded-2xl rounded-br-md bg-alive5-orange px-5 py-3 text-small font-medium text-white shadow-md">
          Is the VIP suite available this Saturday?
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-5 py-3 text-small text-grey-700 shadow-md dark:bg-grey-800">
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
    <div className="h-full w-full bg-white p-7 dark:bg-grey-900">
      <div className="flex items-center gap-2 text-grey-400">
        <BarChart3 className="size-4 text-alive5-orange" />
        <span className="text-legal font-medium uppercase tracking-wider">Week of Jul 14</span>
      </div>
      <h3 className="mt-2 text-h4 font-bold text-grey-900">Conversation intelligence</h3>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ['1,284', 'conversations'],
          ['92%', 'A.I. resolved'],
          ['$4.2M', 'pipeline value'],
        ].map(([n, l]) => (
          <div
            key={l}
            className="rounded-xl bg-gradient-to-br from-surface-soft to-orange-50 p-3 ring-1 ring-black/[0.03] dark:from-grey-800 dark:to-grey-800 dark:ring-white/10"
          >
            <p className="text-h4 font-bold text-grey-900">{n}</p>
            <p className="text-legal text-grey-500">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-legal font-semibold uppercase tracking-wider text-grey-400">Top questions</p>
      <div className="mt-2 space-y-2">
        {blockers.map(([q, c]) => (
          <div
            key={q}
            className="flex items-center justify-between rounded-lg border border-grey-100 bg-white px-3 py-2 shadow-sm dark:bg-grey-800"
          >
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-white via-surface-soft to-orange-50/40">
      <svg
        className="pointer-events-none absolute inset-0 size-full opacity-[0.18]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="15" y1="20" x2="50" y2="80" stroke="#eb5124" strokeWidth="0.3" strokeDasharray="1 1.5" />
        <line x1="80" y1="15" x2="50" y2="80" stroke="#eb5124" strokeWidth="0.3" strokeDasharray="1 1.5" />
        <line x1="25" y1="50" x2="50" y2="80" stroke="#eb5124" strokeWidth="0.3" strokeDasharray="1 1.5" />
        <line x1="75" y1="45" x2="50" y2="80" stroke="#eb5124" strokeWidth="0.3" strokeDasharray="1 1.5" />
      </svg>
      {people.map((p, i) => (
        <img
          key={p}
          src={AV(p)}
          alt=""
          className="absolute size-12 rounded-xl border-2 border-white object-cover shadow-md"
          style={{ left: `${18 + i * 20}%`, top: `${14 + (i % 2) * 18}%` }}
        />
      ))}
      {tiles.map((t, i) => (
        <span
          key={i}
          className={`absolute inline-flex size-10 items-center justify-center rounded-xl text-white shadow-lg ${t.c} ${t.pos}`}
        >
          {t.icon}
        </span>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-alive5-orange/20 blur-2xl" />
        <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-grey-900 text-h4 font-bold text-white shadow-xl">
          a5
        </span>
      </div>
    </div>
  );
}
