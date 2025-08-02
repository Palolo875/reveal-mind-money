
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium' | 'hero';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  interactive?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'md', glow = false, interactive = false, children, ...props }, ref) => {
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl'
    };

    const variantClasses = {
      default: 'bg-white/10 border-white/20',
      premium: 'bg-gradient-to-br from-white/20 to-white/10 border-white/30 shadow-xl',
      hero: 'bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 border-purple-500/30 shadow-2xl'
    };

    const glowClasses = glow ? 'shadow-purple-500/25 shadow-2xl' : '';

    const Component = interactive ? motion.div : 'div';
    const motionProps = interactive ? {
      whileHover: { 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      },
      whileTap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-2xl border backdrop-blur-xl transition-all duration-300',
          blurClasses[blur],
          variantClasses[variant],
          glowClasses,
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
