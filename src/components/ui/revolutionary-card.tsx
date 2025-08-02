import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevolutionaryCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'hero' | 'premium' | 'glass' | 'morphic' | 'quantum';
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  interactive?: boolean;
  floating?: boolean;
  glow?: boolean;
  particleEffect?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export const RevolutionaryCard: React.FC<RevolutionaryCardProps> = ({
  children,
  className,
  variant = 'glass',
  blur = 'lg',
  interactive = true,
  floating = false,
  glow = false,
  particleEffect = false,
  onHover,
  onLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    onLeave?.();
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    
    setIsHovered(true);
    onHover?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 shadow-2xl';
      case 'premium':
        return 'bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 border-secondary/40 shadow-2xl';
      case 'glass':
        return 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 shadow-xl';
      case 'morphic':
        return 'bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 border-primary/50 shadow-2xl';
      case 'quantum':
        return 'bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 border-accent/60 shadow-3xl';
      default:
        return 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 shadow-xl';
    }
  };

  const getBlurStyles = () => {
    switch (blur) {
      case 'sm': return 'backdrop-blur-sm';
      case 'md': return 'backdrop-blur-md';
      case 'lg': return 'backdrop-blur-lg';
      case 'xl': return 'backdrop-blur-xl';
      case '2xl': return 'backdrop-blur-2xl';
      default: return 'backdrop-blur-lg';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-all duration-500',
        getVariantStyles(),
        getBlurStyles(),
        floating && 'animate-float',
        glow && 'shadow-glow',
        interactive && 'cursor-pointer',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        scale: isInView ? 1 : 0.8,
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={interactive ? {
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
        animate={{
          background: [
            'linear-gradient(45deg, hsl(var(--primary)/0.05) 0%, hsl(var(--secondary)/0.05) 50%, hsl(var(--accent)/0.05) 100%)',
            'linear-gradient(45deg, hsl(var(--accent)/0.05) 0%, hsl(var(--primary)/0.05) 50%, hsl(var(--secondary)/0.05) 100%)',
            'linear-gradient(45deg, hsl(var(--secondary)/0.05) 0%, hsl(var(--accent)/0.05) 50%, hsl(var(--primary)/0.05) 100%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Interactive 3D transform */}
      {interactive && (
        <motion.div
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      )}

      {/* Particle effect overlay */}
      {particleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-secondary/40 rounded-full"
            animate={{
              x: [100, 0, 100],
              y: [50, 0, 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-accent/35 rounded-full"
            animate={{
              x: [50, -50, 50],
              y: [0, 100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2,
            }}
          />
        </div>
      )}

      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Shimmer effect on hover */}
      {interactive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            transform: 'translateX(-100%)',
          }}
          animate={{
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};