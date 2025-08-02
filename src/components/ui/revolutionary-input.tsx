import React, { useState, useRef, forwardRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Search, Eye, EyeOff, Sparkles } from 'lucide-react';

interface RevolutionaryInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  className?: string;
  variant?: 'glass' | 'premium' | 'quantum' | 'morphic';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  floating?: boolean;
  glow?: boolean;
  particleEffect?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export const RevolutionaryInput = forwardRef<HTMLInputElement, RevolutionaryInputProps>(({
  value = '',
  onChange,
  placeholder,
  type = 'text',
  className,
  variant = 'glass',
  size = 'md',
  disabled = false,
  error = false,
  success = false,
  icon,
  iconPosition = 'left',
  floating = false,
  glow = false,
  particleEffect = false,
  autoFocus = false,
  required = false,
  name,
  id,
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const springConfig = { damping: 25, stiffness: 400 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
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
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 backdrop-blur-md';
      case 'premium':
        return 'bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/30 backdrop-blur-lg';
      case 'quantum':
        return 'bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-accent/40 backdrop-blur-xl';
      case 'morphic':
        return 'bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 border-primary/25 backdrop-blur-lg';
      default:
        return 'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 backdrop-blur-md';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-3 text-base';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const getStateStyles = () => {
    if (error) return 'border-destructive/50 shadow-destructive/20';
    if (success) return 'border-green-500/50 shadow-green-500/20';
    if (isFocused) return 'border-primary/50 shadow-primary/20 ring-2 ring-primary/20';
    return '';
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <motion.div
      className={cn(
        'relative group',
        floating && 'animate-float',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn(
          'relative overflow-hidden rounded-xl border transition-all duration-300',
          getVariantStyles(),
          getStateStyles(),
          floating && 'animate-float',
          glow && 'shadow-glow',
          disabled && 'opacity-50 cursor-not-allowed',
          isHovered && !disabled && 'scale-[1.02]',
          isFocused && 'scale-[1.02]'
        )}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        animate={{
          scale: isFocused ? 1.02 : 1,
          transition: { duration: 0.2 }
        }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"
          animate={{
            background: isFocused ? [
              'linear-gradient(45deg, hsl(var(--primary)/0.1) 0%, hsl(var(--secondary)/0.1) 50%, hsl(var(--accent)/0.1) 100%)',
              'linear-gradient(45deg, hsl(var(--accent)/0.1) 0%, hsl(var(--primary)/0.1) 50%, hsl(var(--secondary)/0.1) 100%)',
            ] : [
              'linear-gradient(45deg, hsl(var(--primary)/0.05) 0%, hsl(var(--secondary)/0.05) 50%, hsl(var(--accent)/0.05) 100%)',
            ]
          }}
          transition={{
            duration: isFocused ? 2 : 0.5,
            repeat: isFocused ? Infinity : 0,
            ease: "linear"
          }}
        />

        {/* 3D transform container */}
        <motion.div
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 flex items-center"
        >
          {/* Left icon */}
          {icon && iconPosition === 'left' && (
            <motion.div
              className="pl-4 pr-2 text-muted-foreground"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              {icon}
            </motion.div>
          )}

          {/* Search icon for search type */}
          {type === 'search' && !icon && (
            <motion.div
              className="pl-4 pr-2 text-muted-foreground"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <Search className="w-4 h-4" />
            </motion.div>
          )}

          {/* Input field */}
          <input
            ref={ref || inputRef}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            required={required}
            name={name}
            id={id}
            className={cn(
              'flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground/60',
              getSizeStyles(),
              icon && iconPosition === 'left' && 'pl-2',
              icon && iconPosition === 'right' && 'pr-2',
              type === 'search' && !icon && 'pl-2',
              type === 'password' && 'pr-12'
            )}
          />

          {/* Right icon or password toggle */}
          <div className="flex items-center pr-4 pl-2">
            {type === 'password' && (
              <motion.button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
            )}
            
            {icon && iconPosition === 'right' && (
              <motion.div
                className="text-muted-foreground"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {icon}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Particle effects */}
        {particleEffect && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0,
              }}
            />
            <motion.div
              className="absolute w-0.5 h-0.5 bg-secondary/50 rounded-full"
              animate={{
                x: [20, 0, 20],
                y: [20, 0, 20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </div>
        )}

        {/* Focus indicator */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Shimmer effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              transform: 'translateX(-100%)',
            }}
            animate={{
              x: '100%',
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Success/Error indicators */}
        {success && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <Sparkles className="w-4 h-4 text-green-500" />
          </motion.div>
        )}

        {error && (
          <motion.div
            className="absolute top-2 right-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            <div className="w-4 h-4 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});

RevolutionaryInput.displayName = 'RevolutionaryInput';