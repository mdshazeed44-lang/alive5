import { useEffect, useState } from 'react';

interface TypewriterProps {
  /** Words to cycle through */
  words: string[];
  /** ms between adding each char while typing */
  typeSpeed?: number;
  /** ms between removing each char while deleting */
  deleteSpeed?: number;
  /** ms to pause on a fully-typed word before deleting */
  hold?: number;
  /** Tailwind classes for the underlying span (color, gradient, etc) */
  className?: string;
}

/**
 * Minimal type-and-delete cycling text — used in the BusinessSMS hero so
 * the headline reads "Business SMS, [automated. / simplified. / elevated.]".
 * Pure React state + setTimeout; no extra deps.
 */
export function Typewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 55,
  hold = 1600,
  className = '',
}: TypewriterProps) {
  const [index, setIndex] = useState(0); // which word
  const [sub, setSub] = useState(''); // what's currently shown
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');

  useEffect(() => {
    const current = words[index % words.length];

    if (phase === 'typing') {
      if (sub.length < current.length) {
        const t = setTimeout(() => setSub(current.slice(0, sub.length + 1)), typeSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('deleting'), hold);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (sub.length > 0) {
        const t = setTimeout(() => setSub(current.slice(0, sub.length - 1)), deleteSpeed);
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % words.length);
      setPhase('typing');
    }
  }, [sub, phase, index, words, typeSpeed, deleteSpeed, hold]);

  return (
    <span className={className} aria-live="polite">
      {sub}
      <span className="ml-0.5 inline-block h-[0.85em] w-[2px] -translate-y-[-0.05em] animate-pulse bg-alive5-orange align-middle" />
    </span>
  );
}
