import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Render without the inner Container (for full-bleed sections). */
  bleed?: boolean;
  id?: string;
}

export function Section({ children, className, containerClassName, bleed, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
