import { FadeUp } from '@/components/motion/FadeUp';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }: Props) {
  return (
    <FadeUp className={cn(align === 'center' && 'mx-auto max-w-3xl text-center', 'max-w-3xl', className)}>
      {eyebrow && (
        <p className="mb-4 text-small font-semibold uppercase tracking-[0.18em] text-alive5-orange">{eyebrow}</p>
      )}
      <h2 className="text-h2 text-grey-900">{title}</h2>
      {subtitle && <p className="mt-5 text-body-lg text-grey-700">{subtitle}</p>}
    </FadeUp>
  );
}
