import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  {
    id: 'surreal',
    name: 'Surréaliste',
    description: 'Rose corail & Bleu profond',
    gradient: 'linear-gradient(45deg, hsl(340 82% 52%), hsl(200 98% 39%))',
    preview: '🎨'
  },
  {
    id: 'ethereal',
    name: 'Éthéré',
    description: 'Violet & Bleu ciel',
    gradient: 'linear-gradient(45deg, hsl(260 84% 65%), hsl(197 71% 73%))',
    preview: '☁️'
  },
  {
    id: 'cosmic',
    name: 'Cosmique',
    description: 'Magenta & Cyan',
    gradient: 'linear-gradient(45deg, hsl(280 100% 70%), hsl(220 100% 50%))',
    preview: '🌌'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Nuances de gris',
    gradient: 'linear-gradient(45deg, hsl(0 0% 50%), hsl(0 0% 70%))',
    preview: '⚫'
  }
];

export const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="btn-ghost-glow">
          <Palette className="w-4 h-4 mr-2" />
          Thème
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 glass-card">
        <div className="p-2">
          <div className="text-sm font-medium mb-3 text-muted-foreground">
            Choisir un thème visuel
          </div>
          {themes.map((theme) => (
            <DropdownMenuItem 
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                selectedTheme === theme.id 
                  ? 'bg-primary/20 border border-primary/30' 
                  : 'hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                  style={{ background: theme.gradient }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{theme.name}</span>
                    <span className="text-lg">{theme.preview}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {theme.description}
                  </div>
                </div>
              </div>
              {selectedTheme === theme.id && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};