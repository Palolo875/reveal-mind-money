import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Palette, 
  Volume2, 
  Eye, 
  Globe, 
  Shield,
  Brain,
  Zap,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { AIConfigPanel } from './AIConfigPanel';

export const SettingsPanel = () => {
  const { preferences, updatePreferences, theme, setTheme } = useStore();
  const [activeTab, setActiveTab] = useState('general');

  const themes = [
    { id: 'neural', name: 'Neural', icon: <Brain className="w-4 h-4" /> },
    { id: 'cosmic', name: 'Cosmic', icon: <Moon className="w-4 h-4" /> },
    { id: 'quantum', name: 'Quantum', icon: <Zap className="w-4 h-4" /> },
    { id: 'solar', name: 'Solar', icon: <Sun className="w-4 h-4" /> },
    { id: 'cyber', name: 'Cyber', icon: <Monitor className="w-4 h-4" /> }
  ];

  const handlePreferenceChange = (key: keyof typeof preferences, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Settings className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Personnalisez votre expérience Rivela
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            IA
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Apparence
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Confidentialité
          </TabsTrigger>
        </TabsList>

        {/* Contenu des tabs */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Préférences générales</h3>
            
            <div className="space-y-4">
              {/* Langue */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Langue</p>
                    <p className="text-sm text-muted-foreground">Interface utilisateur</p>
                  </div>
                </div>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              {/* Devise */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">€</span>
                  <div>
                    <p className="font-medium">Devise</p>
                    <p className="text-sm text-muted-foreground">Affichage des montants</p>
                  </div>
                </div>
                <select
                  value={preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              {/* Sauvegarde automatique */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Sauvegarde automatique</p>
                    <p className="text-sm text-muted-foreground">Sauvegarder automatiquement vos données</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.autoSave}
                  onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Configuration IA */}
        <TabsContent value="ai" className="space-y-6">
          <AIConfigPanel />
        </TabsContent>

        {/* Apparence */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Thèmes et effets</h3>
            
            <div className="space-y-6">
              {/* Thèmes */}
              <div>
                <h4 className="font-medium mb-3">Thème visuel</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {themes.map((themeOption) => (
                    <motion.div
                      key={themeOption.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer transition-all ${
                          theme === themeOption.id
                            ? 'ring-2 ring-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setTheme(themeOption.id as any)}
                      >
                        <div className="flex items-center gap-3">
                          {themeOption.icon}
                          <span className="font-medium">{themeOption.name}</span>
                          {theme === themeOption.id && (
                            <Badge variant="secondary" className="ml-auto">
                              Actif
                            </Badge>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Effets visuels */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Glassmorphism</p>
                      <p className="text-sm text-muted-foreground">Effets de verre et transparence</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.glassmorphism}
                    onCheckedChange={(checked) => handlePreferenceChange('glassmorphism', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Particules interactives</p>
                      <p className="text-sm text-muted-foreground">Effets de particules animées</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.particleEffects}
                    onCheckedChange={(checked) => handlePreferenceChange('particleEffects', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Animations</p>
                      <p className="text-sm text-muted-foreground">Transitions et micro-animations</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.animationsEnabled}
                    onCheckedChange={(checked) => handlePreferenceChange('animationsEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Sons</p>
                      <p className="text-sm text-muted-foreground">Effets sonores et feedback</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.soundEnabled}
                    onCheckedChange={(checked) => handlePreferenceChange('soundEnabled', checked)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Confidentialité */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Confidentialité et sécurité</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Mode privé</p>
                    <p className="text-sm text-muted-foreground">Masquer les données sensibles</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.privacyMode}
                  onCheckedChange={(checked) => handlePreferenceChange('privacyMode', checked)}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Stockage local</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Toutes vos données sont stockées localement dans votre navigateur. 
                  Aucune donnée n'est envoyée à des serveurs externes.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Données 100% privées</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-medium mb-2 text-amber-800">IA externe</h4>
                <p className="text-sm text-amber-700 mb-3">
                  L'utilisation d'IA externes (Hugging Face, Cohere) peut impliquer 
                  l'envoi de données à des serveurs tiers. Utilisez Ollama pour 
                  une confidentialité maximale.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Ollama recommandé pour la confidentialité</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};