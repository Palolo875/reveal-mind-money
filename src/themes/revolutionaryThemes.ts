
export const REVOLUTIONARY_THEMES = {
  neural: {
    name: "Neural Mind",
    primary: 'hsl(340, 82%, 60%)', // Rose vibrant de la première image
    secondary: 'hsl(25, 95%, 55%)', // Orange doré
    accent: 'hsl(270, 100%, 70%)', // Violet neural
    background: 'hsl(230, 15%, 8%)', // Noir profond
    surface: 'hsl(230, 15%, 12%)',
    glass: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 40px rgba(255, 64, 129, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(340, 82%, 60%) 0%, hsl(25, 95%, 55%) 50%, hsl(270, 100%, 70%) 100%)',
    particles: { color: '#FF4081', count: 100, size: 2 },
    description: "Inspiration cybernétique avec des tons roses et oranges organiques"
  },

  cloudscape: {
    name: "Cloud Dreamer", 
    primary: 'hsl(200, 100%, 70%)', // Bleu nuage de la deuxième image
    secondary: 'hsl(180, 60%, 65%)', // Cyan doux
    accent: 'hsl(160, 40%, 60%)', // Vert menthe
    background: 'hsl(140, 20%, 85%)', // Vert doux background
    surface: 'hsl(140, 20%, 90%)',
    glass: 'rgba(255, 255, 255, 0.6)',
    glow: '0 0 30px rgba(64, 164, 255, 0.3)',
    gradient: 'linear-gradient(135deg, hsl(200, 100%, 70%) 0%, hsl(180, 60%, 65%) 50%, hsl(160, 40%, 60%) 100%)',
    particles: { color: '#40A4FF', count: 60, size: 3 },
    description: "Ambiance rêveuse avec des nuages bleus apaisants"
  },

  liquidMetal: {
    name: "Liquid Chrome",
    primary: 'hsl(0, 0%, 20%)', // Gris métallique de la troisième image
    secondary: 'hsl(0, 0%, 40%)',
    accent: 'hsl(0, 0%, 60%)',
    background: 'hsl(0, 0%, 95%)',
    surface: 'hsl(0, 0%, 98%)',
    glass: 'rgba(0, 0, 0, 0.05)',
    glow: '0 0 25px rgba(0, 0, 0, 0.2)',
    gradient: 'linear-gradient(135deg, hsl(0, 0%, 20%) 0%, hsl(0, 0%, 40%) 50%, hsl(0, 0%, 60%) 100%)',
    particles: { color: '#333333', count: 40, size: 1.5 },
    description: "Élégance minimaliste avec des reflets métalliques fluides"
  },

  mysticRose: {
    name: "Mystic Rose",
    primary: 'hsl(350, 70%, 60%)', // Rose mystique de la quatrième image
    secondary: 'hsl(20, 80%, 65%)', // Pêche douce
    accent: 'hsl(320, 60%, 70%)', // Rose lavande
    background: 'hsl(330, 20%, 95%)',
    surface: 'hsl(330, 20%, 98%)',
    glass: 'rgba(255, 192, 203, 0.15)',
    glow: '0 0 35px rgba(255, 105, 180, 0.3)',
    gradient: 'linear-gradient(135deg, hsl(350, 70%, 60%) 0%, hsl(20, 80%, 65%) 50%, hsl(320, 60%, 70%) 100%)',
    particles: { color: '#FF69B4', count: 70, size: 2.5 },
    description: "Mystère romantique avec des nuances roses envoûtantes"
  },

  cosmicFire: {
    name: "Cosmic Fire",
    primary: 'hsl(15, 90%, 60%)', // Orange cosmique de la cinquième image
    secondary: 'hsl(200, 80%, 50%)', // Bleu spatial
    accent: 'hsl(45, 100%, 55%)', // Jaune stellaire
    background: 'hsl(220, 30%, 10%)',
    surface: 'hsl(220, 30%, 15%)',
    glass: 'rgba(255, 87, 34, 0.1)',
    glow: '0 0 45px rgba(255, 87, 34, 0.4)',
    gradient: 'linear-gradient(135deg, hsl(15, 90%, 60%) 0%, hsl(200, 80%, 50%) 50%, hsl(45, 100%, 55%) 100%)',
    particles: { color: '#FF5722', count: 120, size: 3 },
    description: "Énergie cosmique avec des flammes oranges et des accents stellaires"
  }
};

export type ThemeName = keyof typeof REVOLUTIONARY_THEMES;

export const getTheme = (themeName: ThemeName) => REVOLUTIONARY_THEMES[themeName];
