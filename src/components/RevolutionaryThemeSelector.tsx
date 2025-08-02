
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { REVOLUTIONARY_THEMES, ThemeName } from '@/themes/revolutionaryThemes';
import { Palette, Sparkles, Eye } from 'lucide-react';
import { useState } from 'react';

export const RevolutionaryThemeSelector = () => {
  const { theme, setTheme } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeName | null>(null);

  const handleThemeSelect = (themeName: ThemeName) => {
    setTheme(themeName);
    setIsOpen(false);
    setPreviewTheme(null);
  };

  const handlePreview = (themeName: ThemeName) => {
    setPreviewTheme(themeName);
    // Temporarily apply theme for preview
    const themeConfig = REVOLUTIONARY_THEMES[themeName];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', themeConfig.primary);
    root.style.setProperty('--theme-secondary', themeConfig.secondary);
    root.style.setProperty('--theme-accent', themeConfig.accent);
  };

  const stopPreview = () => {
    if (previewTheme) {
      setPreviewTheme(null);
      // Restore current theme
      setTheme(theme);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 hover:from-primary/20 hover:to-secondary/20"
      >
        <Palette className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">{REVOLUTIONARY_THEMES[theme].name}</span>
        <Sparkles className="w-3 h-3 ml-2" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 z-50"
          >
            <Card className="p-4 bg-background/95 backdrop-blur-lg border shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Thèmes Révolutionnaires</h3>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {Object.entries(REVOLUTIONARY_THEMES).map(([key, themeConfig]) => {
                  const themeName = key as ThemeName;
                  const isActive = theme === themeName;
                  const isPreviewing = previewTheme === themeName;
                  
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg cursor-pointer border transition-all ${
                        isActive ? 'border-primary bg-primary/5' : 
                        isPreviewing ? 'border-secondary bg-secondary/5' :
                        'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleThemeSelect(themeName)}
                      onMouseEnter={() => handlePreview(themeName)}
                      onMouseLeave={stopPreview}
                    >
                      <div className="flex items-center gap-3">
                        {/* Preview gradient */}
                        <div 
                          className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0"
                          style={{ background: themeConfig.gradient }}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{themeConfig.name}</h4>
                            {isActive && (
                              <Badge className="bg-primary text-white text-xs">
                                Actuel
                              </Badge>
                            )}
                            {isPreviewing && (
                              <Badge variant="outline" className="text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                Aperçu
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {themeConfig.description}
                          </p>
                          
                          <div className="flex items-center gap-1 mt-2">
                            {/* Color palette preview */}
                            <div 
                              className="w-3 h-3 rounded-full border border-white/30" 
                              style={{ backgroundColor: themeConfig.primary }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full border border-white/30" 
                              style={{ backgroundColor: themeConfig.secondary }}
                            />
                            <div 
                              className="w-3 h-3 rounded-full border border-white/30" 
                              style={{ backgroundColor: themeConfig.accent }}
                            />
                            
                            <span className="text-xs text-muted-foreground ml-2">
                              {themeConfig.particles.count} particules
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {previewTheme && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-secondary text-sm">
                    <Eye className="w-4 h-4" />
                    <span>Aperçu: {REVOLUTIONARY_THEMES[previewTheme].name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Cliquez pour appliquer définitivement
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false);
            stopPreview();
          }}
        />
      )}
    </div>
  );
};
