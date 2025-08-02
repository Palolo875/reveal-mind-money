
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { REVOLUTIONARY_THEMES } from '@/themes/revolutionaryThemes';

// Legacy theme configurations for backward compatibility
const LEGACY_THEME_CONFIGS = {
  aurora: {
    name: "Aurora Legacy",
    primary: 'hsl(210, 100%, 56%)',
    secondary: 'hsl(300, 70%, 60%)',
    accent: 'hsl(180, 100%, 50%)',
    background: 'hsl(230, 15%, 8%)',
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(59, 130, 246, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(210, 100%, 56%) 0%, hsl(300, 70%, 60%) 50%, hsl(180, 100%, 50%) 100%)',
    particles: { color: '#3b82f6', count: 50, size: 2 },
    description: "Legacy aurora theme"
  },
  sunset: {
    name: "Sunset Legacy",
    primary: 'hsl(25, 95%, 53%)',
    secondary: 'hsl(340, 82%, 52%)',
    accent: 'hsl(45, 100%, 60%)',
    background: 'hsl(230, 15%, 8%)',
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(249, 115, 22, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(340, 82%, 52%) 50%, hsl(45, 100%, 60%) 100%)',
    particles: { color: '#f97316', count: 40, size: 2 },
    description: "Legacy sunset theme"
  },
  ocean: {
    name: "Ocean Legacy",
    primary: 'hsl(200, 100%, 50%)',
    secondary: 'hsl(220, 70%, 50%)',
    accent: 'hsl(180, 100%, 40%)',
    background: 'hsl(230, 15%, 8%)',
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(14, 165, 233, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(220, 70%, 50%) 50%, hsl(180, 100%, 40%) 100%)',
    particles: { color: '#0ea5e9', count: 60, size: 2 },
    description: "Legacy ocean theme"
  },
  forest: {
    name: "Forest Legacy",
    primary: 'hsl(120, 60%, 50%)',
    secondary: 'hsl(80, 60%, 50%)',
    accent: 'hsl(160, 70%, 40%)',
    background: 'hsl(230, 15%, 8%)',
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(34, 197, 94, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(120, 60%, 50%) 0%, hsl(80, 60%, 50%) 50%, hsl(160, 70%, 40%) 100%)',
    particles: { color: '#22c55e', count: 45, size: 2 },
    description: "Legacy forest theme"
  },
  galaxy: {
    name: "Galaxy Legacy",
    primary: 'hsl(270, 100%, 60%)',
    secondary: 'hsl(320, 100%, 60%)',
    accent: 'hsl(240, 100%, 70%)',
    background: 'hsl(230, 15%, 8%)',
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(168, 85, 247, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(270, 100%, 60%) 0%, hsl(320, 100%, 60%) 50%, hsl(240, 100%, 70%) 100%)',
    particles: { color: '#a855f7', count: 80, size: 2 },
    description: "Legacy galaxy theme"
  }
};

export const ThemeSystem = () => {
  const { theme } = useStore();

  useEffect(() => {
    // Try revolutionary themes first
    let config = REVOLUTIONARY_THEMES[theme as keyof typeof REVOLUTIONARY_THEMES];
    
    // Fallback to legacy themes if revolutionary theme not found
    if (!config) {
      config = LEGACY_THEME_CONFIGS[theme as keyof typeof LEGACY_THEME_CONFIGS];
    }
    
    // Final fallback to neural theme
    if (!config) {
      config = REVOLUTIONARY_THEMES.neural;
    }
    
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', config.primary);
    root.style.setProperty('--theme-secondary', config.secondary);
    root.style.setProperty('--theme-accent', config.accent);
    root.style.setProperty('--theme-background', config.background);
    root.style.setProperty('--theme-surface', config.surface);
    root.style.setProperty('--theme-glass', config.glass);
    root.style.setProperty('--theme-glow', config.glow);
    root.style.setProperty('--theme-gradient', config.gradient);
    
    // Update body class
    document.body.className = `theme-${theme}`;
    
  }, [theme]);

  return null;
};

export const getThemeConfig = (theme: string) => {
  // Try revolutionary themes first
  let config = REVOLUTIONARY_THEMES[theme as keyof typeof REVOLUTIONARY_THEMES];
  
  // Fallback to legacy themes
  if (!config) {
    config = LEGACY_THEME_CONFIGS[theme as keyof typeof LEGACY_THEME_CONFIGS];
  }
  
  // Final fallback
  return config || REVOLUTIONARY_THEMES.neural;
};
