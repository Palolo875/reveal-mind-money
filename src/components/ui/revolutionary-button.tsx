import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface RevolutionaryButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'glass' | 'quantum' | 'morphic';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  fullWidth?: boolean;
  floating?: boolean;
  glow?: boolean;
  particleEffect?: boolean;
  ripple?: boolean;
}

export const RevolutionaryButton: React.FC<RevolutionaryButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick,
  fullWidth = false,
  floating = false,
  glow = false,
  particleEffect = false,
  ripple = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-secondary-foreground shadow-lg hover:shadow-xl';
      case 'accent':
        return 'bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-xl';
      case 'glass':
        return 'bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 backdrop-blur-md hover:bg-white/20 dark:hover:bg-black/20 shadow-lg hover:shadow-xl';
      case 'quantum':
        return 'bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white shadow-2xl hover:shadow-3xl';
      case 'morphic':
        return 'bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 border border-primary/30 backdrop-blur-md hover:from-primary/60 hover:via-secondary/60 hover:to-accent/60 shadow-xl hover:shadow-2xl';
      default:
        return 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      case 'xl':
        return 'px-8 py-4 text-xl';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-xl font-medium transition-all duration-300 transform-gpu',
        getVariantStyles(),
        getSizeStyles(),
        fullWidth && 'w-full',
        floating && 'animate-float',
        glow && 'shadow-glow',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={!disabled ? {
        scale: 1.05,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled ? {
        scale: 0.95,
        transition: { duration: 0.1 }
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* 3D transform container */}
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {icon}
              </motion.div>
            )}
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {children}
            </motion.span>
            
            {icon && iconPosition === 'right' && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {icon}
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 4,
            top: ripple.y - 4,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Particle effects */}
      {particleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
            animate={{
              x: [20, 0, 20],
              y: [20, 0, 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </div>
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          transform: 'translateX(-100%)',
        }}
        whileHover={{
          x: '100%',
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />

      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
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
    </motion.button>
  );
};