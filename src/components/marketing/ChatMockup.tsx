import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AVATAR = 'https://lirp.cdn-website.com/519d3ac1/dms3rep/multi/opt/woman2-68w.png';
const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type Msg = { from: 'user' | 'ai'; text: string };
const MESSAGES: Msg[] = [
  { from: 'user', text: 'Can I still redeem your promo code from the newsletter?' },
  { from: 'ai', text: 'Yes — the SUMMER20 code is valid through Friday. Want me to apply it to your cart?' },
  { from: 'user', text: 'Please! And do you ship to Canada?' },
  { from: 'ai', text: 'Done ✓ Canada shipping is 3–5 business days. Anything else I can help with?' },
];

export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 0.2, 0.4].map((d) => (
        <span
          key={d}
          className="inline-block size-1.5 rounded-full bg-grey-400 animate-typing-dot"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </span>
  );
}

export function ChatMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-grey-100 bg-white shadow-2xl ring-1 ring-grey-900/5 dark:border-white/10 dark:bg-grey-800 dark:ring-white/5">
      {/* window header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-surface-cream px-4 py-3.5 dark:from-grey-900 dark:to-grey-800">
        <span className="relative">
          <img src={AVATAR} alt="" className="size-9 rounded-full object-cover ring-2 ring-white" />
          <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-accent-green" />
        </span>
        <div className="flex-1 leading-tight">
          <p className="text-small font-semibold text-grey-900">Alive5 Assistant</p>
          <p className="text-legal text-grey-500">Typically replies instantly</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-legal font-semibold text-alive5-orange">
          <Sparkles className="size-3" /> A.I.
        </span>
      </div>

      <div className="space-y-3 p-4">
        {MESSAGES.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.6 + i * 0.5, ease: EASE }}
            className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                m.from === 'user'
                  ? 'max-w-[80%] rounded-lg rounded-br-sm bg-alive5-orange px-4 py-2.5 text-small text-white'
                  : 'max-w-[80%] rounded-lg rounded-bl-sm bg-grey-50 px-4 py-2.5 text-small text-grey-700 dark:bg-grey-900 dark:text-grey-300'
              }
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + MESSAGES.length * 0.5 }}
          className="flex justify-start"
        >
          <div className="rounded-lg rounded-bl-sm bg-grey-50 px-4 py-3 dark:bg-grey-900">
            <TypingDots />
          </div>
        </motion.div>
      </div>

      <div className="mx-4 mb-4 flex items-center gap-2 rounded-md border border-grey-100 bg-surface-soft px-3 py-2.5 dark:border-white/10">
        <span className="flex-1 text-small text-grey-400">Type a message…</span>
        <span className="inline-flex size-7 items-center justify-center rounded bg-alive5-orange text-white">→</span>
      </div>
    </div>
  );
}
