
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'premium' | 'hero' | 'floating';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', blur = 'md', glow = false, interactive = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-background/40 border-border/20",
      premium: "bg-gradient-to-br from-background/60 to-background/20 border-primary/20 shadow-2xl",
      hero: "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.3)]",
      floating: "bg-background/80 border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
    };

    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md", 
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl"
    };

    const baseClass = cn(
      "rounded-xl border backdrop-saturate-150 transition-all duration-300",
      blurClasses[blur],
      variants[variant],
      glow && "shadow-[0_0_30px_var(--theme-primary,hsl(var(--primary)))] shadow-primary/20",
      interactive && "hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
      className
    );

    // Extract only the event handlers that actually exist on React HTMLDivElement props
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      draggable,
      onAnimationStart,
      onAnimationEnd,
      onAnimationIteration,
      onTransitionEnd,
      ...safeProps
    } = props;

    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={baseClass}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          {...safeProps}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClass} {...props}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
