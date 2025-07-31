
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

const THEME_CONFIGS = {
  aurora: {
    primary: 'hsl(210, 100%, 56%)',
    secondary: 'hsl(300, 70%, 60%)',
    accent: 'hsl(180, 100%, 50%)',
    gradient: 'linear-gradient(135deg, hsl(210, 100%, 56%) 0%, hsl(300, 70%, 60%) 50%, hsl(180, 100%, 50%) 100%)',
    particles: { color: '#3b82f6', count: 50 }
  },
  sunset: {
    primary: 'hsl(25, 95%, 53%)',
    secondary: 'hsl(340, 82%, 52%)',
    accent: 'hsl(45, 100%, 60%)',
    gradient: 'linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(340, 82%, 52%) 50%, hsl(45, 100%, 60%) 100%)',
    particles: { color: '#f97316', count: 40 }
  },
  ocean: {
    primary: 'hsl(200, 100%, 50%)',
    secondary: 'hsl(220, 70%, 50%)',
    accent: 'hsl(180, 100%, 40%)',
    gradient: 'linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(220, 70%, 50%) 50%, hsl(180, 100%, 40%) 100%)',
    particles: { color: '#0ea5e9', count: 60 }
  },
  forest: {
    primary: 'hsl(120, 60%, 50%)',
    secondary: 'hsl(80, 60%, 50%)',
    accent: 'hsl(160, 70%, 40%)',
    gradient: 'linear-gradient(135deg, hsl(120, 60%, 50%) 0%, hsl(80, 60%, 50%) 50%, hsl(160, 70%, 40%) 100%)',
    particles: { color: '#22c55e', count: 45 }
  },
  galaxy: {
    primary: 'hsl(270, 100%, 60%)',
    secondary: 'hsl(320, 100%, 60%)',
    accent: 'hsl(240, 100%, 70%)',
    gradient: 'linear-gradient(135deg, hsl(270, 100%, 60%) 0%, hsl(320, 100%, 60%) 50%, hsl(240, 100%, 70%) 100%)',
    particles: { color: '#a855f7', count: 80 }
  }
};

export const ThemeSystem = () => {
  const { theme } = useStore();

  useEffect(() => {
    const config = THEME_CONFIGS[theme];
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', config.primary);
    root.style.setProperty('--theme-secondary', config.secondary);
    root.style.setProperty('--theme-accent', config.accent);
    root.style.setProperty('--theme-gradient', config.gradient);
    
    // Update body class
    document.body.className = `theme-${theme}`;
    
    // Store particle config for use by ParticleSystem
    window.themeConfig = config;
    
  }, [theme]);

  return null;
};
