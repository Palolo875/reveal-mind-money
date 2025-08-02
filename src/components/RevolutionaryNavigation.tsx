import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { RevolutionaryCard } from '@/components/ui/revolutionary-card';
import { RevolutionaryButton } from '@/components/ui/revolutionary-button';
import { 
  Menu, 
  X, 
  Home, 
  Brain, 
  TrendingUp, 
  Settings, 
  BarChart3, 
  Target,
  Sparkles,
  Zap,
  Shield,
  Users,
  Award,
  Globe,
  ChevronRight,
  Play,
  BookOpen,
  Lightbulb,
  Heart,
  Star
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
  isNew?: boolean;
}

interface RevolutionaryNavigationProps {
  currentStep: string;
  onNavigate: (step: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  progress: number;
  theme: string;
  onThemeChange: (theme: string) => void;
}

export const RevolutionaryNavigation: React.FC<RevolutionaryNavigationProps> = ({
  currentStep,
  onNavigate,
  onToggleSidebar,
  isSidebarOpen,
  progress,
  theme,
  onThemeChange,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Accueil',
      icon: <Home className="w-5 h-5" />,
      description: 'Tableau de bord principal',
      color: 'from-blue-500 to-purple-600',
      badge: '10K+'
    },
    {
      id: 'exploration',
      label: 'Exploration IA',
      icon: <Brain className="w-5 h-5" />,
      description: 'Analyse neuroscientifique',
      color: 'from-purple-500 to-pink-600',
      isNew: true
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <Lightbulb className="w-5 h-5" />,
      description: 'Révélations financières',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Données avancées',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'goals',
      label: 'Objectifs',
      icon: <Target className="w-5 h-5" />,
      description: 'Suivi des objectifs',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'simulator',
      label: 'Simulateur',
      icon: <Play className="w-5 h-5" />,
      description: 'Scénarios "What if"',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'learn',
      label: 'Apprentissage',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Ressources éducatives',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const themes = [
    { id: 'aurora', name: 'Aurore', color: 'from-blue-500 to-purple-600' },
    { id: 'sunset', name: 'Coucher de soleil', color: 'from-orange-500 to-red-600' },
    { id: 'ocean', name: 'Océan', color: 'from-cyan-500 to-blue-600' },
    { id: 'forest', name: 'Forêt', color: 'from-green-500 to-emerald-600' },
    { id: 'galaxy', name: 'Galaxie', color: 'from-purple-500 to-pink-600' }
  ];

  const stats = [
    { label: 'Utilisateurs', value: '10K+', icon: <Users className="w-4 h-4" /> },
    { label: 'Précision', value: '99.7%', icon: <Award className="w-4 h-4" /> },
    { label: 'Zero Data', value: '100%', icon: <Shield className="w-4 h-4" /> },
    { label: 'Insights', value: '∞', icon: <Sparkles className="w-4 h-4" /> }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        onClick={onToggleSidebar}
        className="fixed top-6 left-6 z-50 lg:hidden p-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleSidebar}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-r border-white/20 dark:border-white/10 z-50 overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <motion.div
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="p-6 border-b border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-8 h-8 text-primary" />
                      </motion.div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Rivela
                      </h1>
                    </div>
                    
                    <RevolutionaryButton
                      variant="glass"
                      size="sm"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      icon={<ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />}
                    />
                  </div>

                  {/* Progress indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progression</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Navigation items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {navigationItems.map((item) => (
                    <motion.div
                      key={item.id}
                      onHoverStart={() => setHoveredItem(item.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RevolutionaryCard
                        variant={currentStep === item.id ? 'quantum' : 'glass'}
                        blur="md"
                        glow={currentStep === item.id}
                        className={`p-4 cursor-pointer transition-all duration-200 ${
                          currentStep === item.id ? 'ring-2 ring-primary/50' : ''
                        }`}
                        onClick={() => onNavigate(item.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                            {item.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm truncate">{item.label}</h3>
                              {item.isNew && (
                                <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                                  Nouveau
                                </span>
                              )}
                              {item.badge && (
                                <span className="px-2 py-0.5 text-xs bg-secondary/20 text-secondary-foreground rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          </div>
                        </div>
                      </RevolutionaryCard>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="p-4 border-t border-white/10 space-y-4"
                >
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                      >
                        {stat.icon}
                        <div>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-sm font-semibold">{stat.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Theme selector */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Thème</p>
                    <div className="flex gap-2">
                      {themes.map((themeOption) => (
                        <motion.button
                          key={themeOption.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onThemeChange(themeOption.id)}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeOption.color} ${
                            theme === themeOption.id ? 'ring-2 ring-white/50' : ''
                          }`}
                          title={themeOption.name}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar (always visible) */}
      <motion.div
        className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-r border-white/20 dark:border-white/10 z-30 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <motion.div
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="p-6 border-b border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Rivela
                </h1>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RevolutionaryCard
                  variant={currentStep === item.id ? 'quantum' : 'glass'}
                  blur="md"
                  glow={currentStep === item.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    currentStep === item.id ? 'ring-2 ring-primary/50' : ''
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm truncate">{item.label}</h3>
                        {item.isNew && (
                          <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                            Nouveau
                          </span>
                        )}
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-secondary/20 text-secondary-foreground rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                  </div>
                </RevolutionaryCard>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="p-4 border-t border-white/10 space-y-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                >
                  {stat.icon}
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-sm font-semibold">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Theme selector */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Thème</p>
              <div className="flex gap-2">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onThemeChange(themeOption.id)}
                    className={`w-8 h-8 rounded-lg bg-gradient-to-r ${themeOption.color} ${
                      theme === themeOption.id ? 'ring-2 ring-white/50' : ''
                    }`}
                    title={themeOption.name}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};