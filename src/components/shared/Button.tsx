import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'orange' | 'grey' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  orange: 'bg-alive5-orange text-white hover:bg-orange-600 hover:shadow-orange',
  grey: 'bg-alive5-grey text-white hover:bg-grey-800 hover:shadow-lg',
  ghost: 'bg-transparent text-alive5-grey border-[1.5px] border-alive5-grey hover:bg-alive5-grey hover:text-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-small min-h-[40px]',
  md: 'px-6 py-3.5 text-small min-h-[44px]',
  lg: 'px-8 py-4 text-body min-h-[52px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'orange', size = 'md', showArrow, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded font-semibold tracking-wide transition-all duration-200',
        'hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alive5-orange focus-visible:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
});
