import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Continuous horizontal scroll that pauses on hover. Content is duplicated for a seamless loop. */
export function Marquee({
  children,
  className,
  speed = 'slow',
}: {
  children: ReactNode;
  className?: string;
  speed?: 'normal' | 'slow';
}) {
  return (
    <div className={cn('group relative flex w-full overflow-hidden', className)}>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-page to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-page to-transparent" />
      <div
        className={cn(
          'flex shrink-0 items-center gap-16 pr-16',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
