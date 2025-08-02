
import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { getThemeConfig } from './ThemeSystem';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface AdvancedParticleSystemProps {
  count?: number;
  interactive?: boolean;
  constellation?: boolean;
  className?: string;
}

const THEME_COLORS = {
  aurora: ['#3b82f6', '#8b5cf6', '#06b6d4'],
  sunset: ['#f97316', '#ec4899', '#fbbf24'],
  ocean: ['#0ea5e9', '#3b82f6', '#06b6d4'],
  forest: ['#22c55e', '#84cc16', '#10b981'],
  galaxy: ['#a855f7', '#d946ef', '#8b5cf6'],
  neural: ['#FF4081', '#FF5722', '#9C27B0'],
  cloudscape: ['#40A4FF', '#26C6DA', '#66BB6A'],
  liquidMetal: ['#333333', '#666666', '#999999'],
  mysticRose: ['#FF69B4', '#FF8A65', '#BA68C8'],
  cosmicFire: ['#FF5722', '#2196F3', '#FFC107']
};

// Default fallback colors
const DEFAULT_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4'];

export const AdvancedParticleSystem = ({ 
  count = 50, 
  interactive = true, 
  constellation = false,
  className = ""
}: AdvancedParticleSystemProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, preferences } = useStore();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!preferences.animationsEnabled) return;

    const containerRef = canvasRef.current?.parentElement;
    if (!containerRef) return;

    const particles: Particle[] = [];
    // Fix: Ensure colors is always an array
    const themeColors = THEME_COLORS[theme as keyof typeof THEME_COLORS];
    const colors = themeColors || DEFAULT_COLORS;

    // Create particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * containerRef.offsetWidth,
        y: Math.random() * containerRef.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = containerRef.offsetWidth;
    canvas.height = containerRef.offsetHeight;
    containerRef.appendChild(canvas);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections for constellation mode
        if (constellation) {
          particles.forEach(otherParticle => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            if (distance < 100 && distance > 0) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (100 - distance) / 100 * 0.3;
              ctx.stroke();
            }
          });
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [count, interactive, constellation, theme, preferences.animationsEnabled]);

  if (!preferences.animationsEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};
