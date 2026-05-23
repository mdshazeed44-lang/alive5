import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from './storylane-config.json';

/**
 * Self-hosted replica of the Alive5 Storylane interactive walkthrough.
 *
 * Uses the exact same metadata Storylane's player consumes (extracted from
 * the original embed): page order, hotspot offsets, tooltip alignment, CTA
 * copy. Renders a pulsing beacon, animated cursor click, and a Storylane-
 * style tooltip with a Next button. Auto-advances and loops.
 *
 * Assets in /public/storylane/frame-XX.png (the 20 page screenshots).
 */

type Step = {
  idx: number;
  kind: 'popup' | 'hotspot';
  cta: string | null;
  htmlText: string;
  plainText: string;
  image: string;
  offset: { x: number; y: number } | null;
  alignment: string;
  frameWidth: number;
};

const STEPS = config as Step[];
const STEP_MS = 3600;          // dwell on each step
const CURSOR_TRAVEL_MS = 900;  // cursor glide time
const CLICK_PULSE_MS = 400;    // click ripple duration

// Convert Storylane alignment codes (e.g. "bc", "lc", "rc", "tc", "br") to
// translation offsets so the tooltip sits next to the hotspot, just like
// the real Storylane player.
function alignmentTransform(align: string) {
  // First char: vertical anchor (t/c/b), Second char: horizontal (l/c/r)
  // anchor refers to the hotspot's edge the tooltip attaches to
  const v = align[0]; // t, c, b
  const h = align[1]; // l, c, r
  let tx = '-50%';
  let ty = '-50%';
  if (h === 'l') tx = '-100%';
  if (h === 'r') tx = '0%';
  if (v === 't') ty = '-100%';
  if (v === 'b') ty = '0%';
  // small gap from beacon
  const gapX = h === 'l' ? -10 : h === 'r' ? 10 : 0;
  const gapY = v === 't' ? -10 : v === 'b' ? 10 : 0;
  return { transform: `translate(${tx}, ${ty})`, marginLeft: gapX, marginTop: gapY };
}

export function StorylaneDemo() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [clickPulse, setClickPulse] = useState(false);
  const timers = useRef<number[]>([]);

  const current = STEPS[step];

  // Preload all images on first mount
  useEffect(() => {
    STEPS.forEach((s) => {
      if (!s.image) return;
      const i = new Image();
      i.src = s.image;
    });
  }, []);

  // Auto-advance with a click animation right before transition
  useEffect(() => {
    if (paused) return;
    const ts = timers.current;
    ts.forEach((t) => clearTimeout(t));
    ts.length = 0;

    // Phase 1: show cursor moving to hotspot (only for hotspots)
    if (current.kind === 'hotspot' && current.offset) {
      setShowCursor(false);
      ts.push(window.setTimeout(() => setShowCursor(true), 50));
      // Phase 2: click pulse
      ts.push(
        window.setTimeout(() => {
          setClickPulse(true);
          ts.push(window.setTimeout(() => setClickPulse(false), CLICK_PULSE_MS));
        }, STEP_MS - CURSOR_TRAVEL_MS),
      );
    } else {
      setShowCursor(false);
      setClickPulse(false);
    }

    // Advance to next step
    ts.push(
      window.setTimeout(() => {
        setStep((s) => (s + 1) % STEPS.length);
      }, STEP_MS),
    );

    return () => {
      ts.forEach((t) => clearTimeout(t));
    };
  }, [step, paused, current]);

  // Cursor target for animation (current beacon position)
  const cursorTarget = current.offset
    ? { left: `${current.offset.x}%`, top: `${current.offset.y}%` }
    : { left: '50%', top: '50%' };

  // Cursor starting position: previous step's offset (or off-screen for first)
  const prevStep = STEPS[(step - 1 + STEPS.length) % STEPS.length];
  const cursorFrom = prevStep.offset
    ? { left: `${prevStep.offset.x}%`, top: `${prevStep.offset.y}%` }
    : { left: '50%', top: '110%' };

  const align = alignmentTransform(current.alignment);

  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Browser chrome wrapper */}
      <div className="relative overflow-hidden rounded-xl border border-grey-200 bg-white shadow-2xl ring-1 ring-black/5 dark:border-grey-700 dark:bg-grey-900">
        {/* faux mac titlebar */}
        <div className="flex items-center gap-1.5 border-b border-grey-200 bg-grey-50 px-3 py-2 dark:border-grey-700 dark:bg-grey-800">
          <span className="size-3 rounded-full bg-[#FF5F57]" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" />
          <span className="size-3 rounded-full bg-[#28C840]" />
          <div className="ml-3 hidden text-legal text-grey-500 sm:block">app.alive5.com/sms</div>
        </div>

        {/* Image stage — native frame ratio is 2560×1448 ≈ 1.768:1.
           object-contain keeps the full screen visible (no crop) on every
           viewport, with white letterboxing only on extreme aspect ratios. */}
        <div className="relative w-full bg-white dark:bg-grey-900" style={{ aspectRatio: '2560 / 1448' }}>
          <AnimatePresence mode="sync">
            <motion.img
              key={`img-${step}`}
              src={current.image}
              alt={`Step ${step + 1}: ${current.plainText}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 size-full object-contain object-top"
              draggable={false}
            />
          </AnimatePresence>

          {/* Popup (centered modal-style intro) */}
          {current.kind === 'popup' && (
            <motion.div
              key={`popup-${step}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-grey-200 bg-white px-6 py-5 text-center shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-grey-800"
              style={{ width: 'min(80%, 360px)' }}
            >
              <div
                className="text-h4 leading-tight text-grey-900"
                dangerouslySetInnerHTML={{ __html: current.htmlText }}
              />
              <button
                onClick={() => setStep((s) => (s + 1) % STEPS.length)}
                className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-alive5-orange px-4 text-small font-semibold text-white shadow-md transition-transform hover:scale-105"
              >
                {current.cta || "Let's Go!"}
              </button>
            </motion.div>
          )}

          {/* Hotspot beacon + tooltip */}
          {current.kind === 'hotspot' && current.offset && (
            <>
              {/* Pulsing beacon at click coords */}
              <div
                className="pointer-events-none absolute z-10"
                style={{ left: `${current.offset.x}%`, top: `${current.offset.y}%` }}
              >
                <span className="relative -ml-2 -mt-2 inline-flex size-4">
                  <motion.span
                    className="absolute inline-flex size-full rounded-full bg-alive5-orange opacity-60"
                    animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <span className="relative inline-flex size-4 rounded-full bg-alive5-orange shadow-md ring-2 ring-white" />
                </span>
              </div>

              {/* Tooltip */}
              <motion.div
                key={`tip-${step}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="absolute z-20 rounded-lg border border-grey-200 bg-white p-3 text-grey-900 shadow-xl dark:border-white/10 dark:bg-grey-800"
                style={{
                  left: `${current.offset.x}%`,
                  top: `${current.offset.y}%`,
                  width: 'min(60%, 260px)',
                  ...align,
                }}
              >
                <div
                  className="text-small leading-snug [&_h3]:text-[13px] [&_h3]:font-semibold [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: current.htmlText }}
                />
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="text-legal text-grey-400">
                    {step + 1} / {STEPS.length}
                  </span>
                  <button
                    onClick={() => setStep((s) => (s + 1) % STEPS.length)}
                    className="inline-flex h-7 items-center justify-center rounded-md bg-alive5-orange px-3 text-legal font-semibold text-white shadow-sm transition-transform hover:scale-105"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>

              {/* Animated cursor moving to hotspot, then click ripple */}
              {showCursor && (
                <motion.div
                  key={`cursor-${step}`}
                  className="pointer-events-none absolute z-30"
                  initial={cursorFrom}
                  animate={cursorTarget}
                  transition={{ duration: CURSOR_TRAVEL_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="relative -ml-1 -mt-1">
                    {/* macOS-style cursor */}
                    <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-md">
                      <path
                        d="M5 3 L5 17 L8.5 13.5 L11 19 L13.5 18 L11 12.5 L16 12 Z"
                        fill="#fff"
                        stroke="#1a1348"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Click ripple */}
                    {clickPulse && (
                      <motion.span
                        className="absolute -left-2 -top-2 size-6 rounded-full border-2 border-alive5-orange"
                        initial={{ scale: 0.3, opacity: 1 }}
                        animate={{ scale: 2.4, opacity: 0 }}
                        transition={{ duration: CLICK_PULSE_MS / 1000, ease: 'easeOut' }}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
          <motion.div
            key={`bar-${step}`}
            className="h-full bg-alive5-orange"
            initial={{ width: '0%' }}
            animate={{ width: paused ? `${((step + 1) / STEPS.length) * 100}%` : '100%' }}
            transition={{ duration: paused ? 0.2 : STEP_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Step indicator dots */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {STEPS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to step ${i + 1}`}
            onClick={() => setStep(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? 'w-6 bg-alive5-orange' : 'w-1.5 bg-grey-300 hover:bg-grey-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

