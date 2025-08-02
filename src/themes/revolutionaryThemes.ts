
export type ThemeName = 'aurora' | 'sunset' | 'ocean' | 'forest' | 'galaxy' | 'default';

export interface RevolutionaryTheme {
  id: ThemeName;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    hero: string;
    card: string;
    button: string;
  };
  effects: {
    glow: string;
    shadow: string;
    blur: string;
    particle: string;
  };
  animations: {
    duration: number;
    easing: string;
    floating: string;
    pulse: string;
  };
}

export const REVOLUTIONARY_THEMES: Record<ThemeName, RevolutionaryTheme> = {
  aurora: {
    id: 'aurora',
    name: 'Aurore',
    description: 'Inspiré des aurores boréales, ce thème offre des couleurs vives et dynamiques',
    colors: {
      primary: 'hsl(210, 100%, 56%)',
      secondary: 'hsl(300, 70%, 60%)',
      accent: 'hsl(180, 100%, 50%)',
      background: 'hsl(220, 20%, 8%)',
      surface: 'hsl(220, 20%, 12%)',
      text: 'hsl(220, 20%, 95%)',
      muted: 'hsl(220, 20%, 60%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(210, 100%, 56%) 0%, hsl(300, 70%, 60%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(300, 70%, 60%) 0%, hsl(180, 100%, 50%) 100%)',
      accent: 'linear-gradient(135deg, hsl(180, 100%, 50%) 0%, hsl(210, 100%, 56%) 100%)',
      hero: 'linear-gradient(135deg, hsl(210, 100%, 56%, 0.2) 0%, hsl(300, 70%, 60%, 0.2) 50%, hsl(180, 100%, 50%, 0.2) 100%)',
      card: 'linear-gradient(135deg, hsl(220, 20%, 12%, 0.8) 0%, hsl(220, 20%, 16%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(210, 100%, 56%) 0%, hsl(300, 70%, 60%) 100%)',
    },
    effects: {
      glow: '0 0 30px hsl(210, 100%, 56%, 0.3)',
      shadow: '0 8px 32px hsl(210, 100%, 56%, 0.1)',
      blur: 'blur(20px)',
      particle: 'hsl(210, 100%, 56%)',
    },
    animations: {
      duration: 0.3,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 6s ease-in-out infinite',
      pulse: 'pulse 2s ease-in-out infinite',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Coucher de soleil',
    description: 'Des tons chauds et apaisants inspirés des couchers de soleil',
    colors: {
      primary: 'hsl(25, 95%, 53%)',
      secondary: 'hsl(340, 82%, 52%)',
      accent: 'hsl(45, 100%, 60%)',
      background: 'hsl(20, 15%, 8%)',
      surface: 'hsl(20, 15%, 12%)',
      text: 'hsl(20, 15%, 95%)',
      muted: 'hsl(20, 15%, 60%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(340, 82%, 52%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(340, 82%, 52%) 0%, hsl(45, 100%, 60%) 100%)',
      accent: 'linear-gradient(135deg, hsl(45, 100%, 60%) 0%, hsl(25, 95%, 53%) 100%)',
      hero: 'linear-gradient(135deg, hsl(25, 95%, 53%, 0.2) 0%, hsl(340, 82%, 52%, 0.2) 50%, hsl(45, 100%, 60%, 0.2) 100%)',
      card: 'linear-gradient(135deg, hsl(20, 15%, 12%, 0.8) 0%, hsl(20, 15%, 16%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(25, 95%, 53%) 0%, hsl(340, 82%, 52%) 100%)',
    },
    effects: {
      glow: '0 0 30px hsl(25, 95%, 53%, 0.3)',
      shadow: '0 8px 32px hsl(25, 95%, 53%, 0.1)',
      blur: 'blur(20px)',
      particle: 'hsl(25, 95%, 53%)',
    },
    animations: {
      duration: 0.4,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 7s ease-in-out infinite',
      pulse: 'pulse 2.5s ease-in-out infinite',
    },
  },
  ocean: {
    id: 'ocean',
    name: 'Océan',
    description: 'Des bleus profonds et apaisants inspirés des profondeurs océaniques',
    colors: {
      primary: 'hsl(200, 100%, 50%)',
      secondary: 'hsl(220, 70%, 50%)',
      accent: 'hsl(180, 100%, 40%)',
      background: 'hsl(210, 25%, 8%)',
      surface: 'hsl(210, 25%, 12%)',
      text: 'hsl(210, 25%, 95%)',
      muted: 'hsl(210, 25%, 60%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(220, 70%, 50%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(220, 70%, 50%) 0%, hsl(180, 100%, 40%) 100%)',
      accent: 'linear-gradient(135deg, hsl(180, 100%, 40%) 0%, hsl(200, 100%, 50%) 100%)',
      hero: 'linear-gradient(135deg, hsl(200, 100%, 50%, 0.2) 0%, hsl(220, 70%, 50%, 0.2) 50%, hsl(180, 100%, 40%, 0.2) 100%)',
      card: 'linear-gradient(135deg, hsl(210, 25%, 12%, 0.8) 0%, hsl(210, 25%, 16%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(220, 70%, 50%) 100%)',
    },
    effects: {
      glow: '0 0 30px hsl(200, 100%, 50%, 0.3)',
      shadow: '0 8px 32px hsl(200, 100%, 50%, 0.1)',
      blur: 'blur(20px)',
      particle: 'hsl(200, 100%, 50%)',
    },
    animations: {
      duration: 0.5,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 8s ease-in-out infinite',
      pulse: 'pulse 3s ease-in-out infinite',
    },
  },
  forest: {
    id: 'forest',
    name: 'Forêt',
    description: 'Des verts naturels et organiques inspirés des forêts luxuriantes',
    colors: {
      primary: 'hsl(120, 60%, 50%)',
      secondary: 'hsl(80, 60%, 50%)',
      accent: 'hsl(160, 70%, 40%)',
      background: 'hsl(120, 15%, 8%)',
      surface: 'hsl(120, 15%, 12%)',
      text: 'hsl(120, 15%, 95%)',
      muted: 'hsl(120, 15%, 60%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(120, 60%, 50%) 0%, hsl(80, 60%, 50%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(80, 60%, 50%) 0%, hsl(160, 70%, 40%) 100%)',
      accent: 'linear-gradient(135deg, hsl(160, 70%, 40%) 0%, hsl(120, 60%, 50%) 100%)',
      hero: 'linear-gradient(135deg, hsl(120, 60%, 50%, 0.2) 0%, hsl(80, 60%, 50%, 0.2) 50%, hsl(160, 70%, 40%, 0.2) 100%)',
      card: 'linear-gradient(135deg, hsl(120, 15%, 12%, 0.8) 0%, hsl(120, 15%, 16%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(120, 60%, 50%) 0%, hsl(80, 60%, 50%) 100%)',
    },
    effects: {
      glow: '0 0 30px hsl(120, 60%, 50%, 0.3)',
      shadow: '0 8px 32px hsl(120, 60%, 50%, 0.1)',
      blur: 'blur(20px)',
      particle: 'hsl(120, 60%, 50%)',
    },
    animations: {
      duration: 0.6,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 9s ease-in-out infinite',
      pulse: 'pulse 3.5s ease-in-out infinite',
    },
  },
  galaxy: {
    id: 'galaxy',
    name: 'Galaxie',
    description: 'Des violets mystérieux et cosmiques inspirés des galaxies lointaines',
    colors: {
      primary: 'hsl(270, 100%, 60%)',
      secondary: 'hsl(320, 100%, 60%)',
      accent: 'hsl(240, 100%, 70%)',
      background: 'hsl(250, 20%, 8%)',
      surface: 'hsl(250, 20%, 12%)',
      text: 'hsl(250, 20%, 95%)',
      muted: 'hsl(250, 20%, 60%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(270, 100%, 60%) 0%, hsl(320, 100%, 60%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(320, 100%, 60%) 0%, hsl(240, 100%, 70%) 100%)',
      accent: 'linear-gradient(135deg, hsl(240, 100%, 70%) 0%, hsl(270, 100%, 60%) 100%)',
      hero: 'linear-gradient(135deg, hsl(270, 100%, 60%, 0.2) 0%, hsl(320, 100%, 60%, 0.2) 50%, hsl(240, 100%, 70%, 0.2) 100%)',
      card: 'linear-gradient(135deg, hsl(250, 20%, 12%, 0.8) 0%, hsl(250, 20%, 16%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(270, 100%, 60%) 0%, hsl(320, 100%, 60%) 100%)',
    },
    effects: {
      glow: '0 0 30px hsl(270, 100%, 60%, 0.3)',
      shadow: '0 8px 32px hsl(270, 100%, 60%, 0.1)',
      blur: 'blur(20px)',
      particle: 'hsl(270, 100%, 60%)',
    },
    animations: {
      duration: 0.7,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 10s ease-in-out infinite',
      pulse: 'pulse 4s ease-in-out infinite',
    },
  },
  default: {
    id: 'default',
    name: 'Classique',
    description: 'Le thème par défaut avec des couleurs équilibrées et professionnelles',
    colors: {
      primary: 'hsl(221.2, 83.2%, 53.3%)',
      secondary: 'hsl(210, 40%, 96%)',
      accent: 'hsl(210, 40%, 96%)',
      background: 'hsl(0, 0%, 100%)',
      surface: 'hsl(0, 0%, 100%)',
      text: 'hsl(222.2, 84%, 4.9%)',
      muted: 'hsl(215.4, 16.3%, 46.9%)',
    },
    gradients: {
      primary: 'linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(210, 40%, 96%) 100%)',
      secondary: 'linear-gradient(135deg, hsl(210, 40%, 96%) 0%, hsl(210, 40%, 96%) 100%)',
      accent: 'linear-gradient(135deg, hsl(210, 40%, 96%) 0%, hsl(221.2, 83.2%, 53.3%) 100%)',
      hero: 'linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%, 0.1) 0%, hsl(210, 40%, 96%, 0.1) 50%, hsl(210, 40%, 96%, 0.1) 100%)',
      card: 'linear-gradient(135deg, hsl(0, 0%, 100%, 0.8) 0%, hsl(0, 0%, 100%, 0.8) 100%)',
      button: 'linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(210, 40%, 96%) 100%)',
    },
    effects: {
      glow: '0 0 20px hsl(221.2, 83.2%, 53.3%, 0.2)',
      shadow: '0 4px 16px hsl(221.2, 83.2%, 53.3%, 0.1)',
      blur: 'blur(10px)',
      particle: 'hsl(221.2, 83.2%, 53.3%)',
    },
    animations: {
      duration: 0.3,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      floating: 'float 5s ease-in-out infinite',
      pulse: 'pulse 2s ease-in-out infinite',
    },
  },
};

export const getThemeCSS = (theme: RevolutionaryTheme): string => {
  return `
    :root {
      --theme-primary: ${theme.colors.primary};
      --theme-secondary: ${theme.colors.secondary};
      --theme-accent: ${theme.colors.accent};
      --theme-background: ${theme.colors.background};
      --theme-surface: ${theme.colors.surface};
      --theme-text: ${theme.colors.text};
      --theme-muted: ${theme.colors.muted};
      
      --theme-gradient-primary: ${theme.gradients.primary};
      --theme-gradient-secondary: ${theme.gradients.secondary};
      --theme-gradient-accent: ${theme.gradients.accent};
      --theme-gradient-hero: ${theme.gradients.hero};
      --theme-gradient-card: ${theme.gradients.card};
      --theme-gradient-button: ${theme.gradients.button};
      
      --theme-glow: ${theme.effects.glow};
      --theme-shadow: ${theme.effects.shadow};
      --theme-blur: ${theme.effects.blur};
      --theme-particle: ${theme.effects.particle};
      
      --theme-animation-duration: ${theme.animations.duration}s;
      --theme-animation-easing: ${theme.animations.easing};
      --theme-animation-floating: ${theme.animations.floating};
      --theme-animation-pulse: ${theme.animations.pulse};
    }
  `;
};

export const applyTheme = (themeName: ThemeName): void => {
  const theme = REVOLUTIONARY_THEMES[themeName];
  if (!theme) return;

  const style = document.createElement('style');
  style.id = 'revolutionary-theme';
  style.textContent = getThemeCSS(theme);
  
  const existingStyle = document.getElementById('revolutionary-theme');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  document.head.appendChild(style);
  
  // Apply theme class to body
  document.body.className = document.body.className
    .split(' ')
    .filter(cls => !cls.startsWith('theme-'))
    .join(' ') + ` theme-${themeName}`;
};
