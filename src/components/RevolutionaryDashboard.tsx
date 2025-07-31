import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { useSoundSystem } from '@/hooks/useSoundSystem';
import { AdvancedParticleSystem } from '@/components/AdvancedParticleSystem';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Heart,
  Download,
  Share,
  Settings,
  Sparkles,
  Eye,
  Lightbulb
} from 'lucide-react';

interface RevolutionaryDashboardProps {
  insight: any;
  question: string;
  onNewExploration: () => void;
  financialData?: any;
}

export const RevolutionaryDashboard = ({ 
  insight, 
  question, 
  onNewExploration,
  financialData 
}: RevolutionaryDashboardProps) => {
  const { theme, activeTab, setActiveTab, preferences } = useStore();
  const { playSound, playHaptic } = useSoundSystem();
  const [isRevealing, setIsRevealing] = useState(true);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    if (isRevealing) {
      const timer = setInterval(() => {
        setRevealProgress(prev => {
          if (prev >= 100) {
            setIsRevealing(false);
            playSound('reveal');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isRevealing, playSound]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    playSound('transition');
    playHaptic('light');
  };

  const tabs = [
    { id: 'revelation', label: 'Révélation', icon: Sparkles, color: 'from-primary to-secondary' },
    { id: 'insights', label: 'Insights IA', icon: Brain, color: 'from-secondary to-accent' },
    { id: 'predictions', label: 'Prédictions', icon: Eye, color: 'from-accent to-primary' },
    { id: 'simulations', label: 'Simulations', icon: Target, color: 'from-primary to-accent' },
    { id: 'optimization', label: 'Optimisation', icon: Zap, color: 'from-secondary to-primary' },
    { id: 'social', label: 'Comparaisons', icon: Users, color: 'from-accent to-secondary' },
    { id: 'emotional', label: 'Émotionnel', icon: Heart, color: 'from-primary to-secondary' },
    { id: 'learning', label: 'Apprentissage', icon: Lightbulb, color: 'from-secondary to-accent' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedParticleSystem count={60} interactive constellation />
      
      {/* Revolutionary Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <GlassCard variant="hero" blur="xl" glow className="p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Révélation Financière Ultime
                </h1>
                <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 animate-pulse">
                  IA Quantique
                </Badge>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-xl mb-4"
              >
                Question analysée : "{question}"
              </motion.p>
              
              {isRevealing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Brain className="w-4 h-4 animate-spin" />
                    <span>Analyse neuronale en cours...</span>
                  </div>
                  <Progress value={revealProgress} className="h-3" />
                </motion.div>
              )}
              
              {!isRevealing && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 mt-4"
                >
                  <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                    Score Santé: {insight?.healthScore || 85}/100
                  </Badge>
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10">
                    Fiabilité IA: 94%
                  </Badge>
                  <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/10">
                    Profil: {insight?.behavioralPatterns?.spendingPersonality || 'Analysé'}
                  </Badge>
                </motion.div>
              )}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button 
                variant="outline" 
                onClick={() => {
                  playSound('click');
                  onNewExploration();
                }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 hover:from-primary/20 hover:to-secondary/20"
              >
                <Zap className="w-4 h-4 mr-2" />
                Nouvelle Exploration
              </Button>
              
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Premium
              </Button>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Revolutionary Tab System */}
      <div className="relative z-10 px-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2 bg-transparent p-2 h-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    relative p-4 h-auto flex flex-col items-center gap-2 
                    data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.color}
                    data-[state=active]:text-white data-[state=active]:shadow-lg
                    rounded-xl transition-all duration-300 hover:scale-105
                    bg-background/20 backdrop-blur-sm border border-border/20
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-xl"
                      style={{ background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))` }}
                    />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <AnimatePresence mode="wait">
            {!isRevealing && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <TabsContent value="revelation" className="space-y-6">
                  <GlassCard variant="premium" blur="lg" className="p-8">
                    <div className="text-center space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="text-8xl"
                      >
                        🔮
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {insight?.equation || "Votre Équation Financière"}
                        </h2>
                        
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                          {insight?.insight || "Analyse en cours de votre profil financier unique..."}
                        </p>
                        
                        <div className="text-lg text-primary font-medium">
                          {insight?.comparison || "Comparaison en préparation..."}
                        </div>
                      </motion.div>
                    </div>
                  </GlassCard>
                  
                  {/* Projections Ultra-Premium */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Mensuel', value: insight?.projections?.monthly || 0, color: 'from-primary to-secondary' },
                      { label: 'Annuel', value: insight?.projections?.yearly || 0, color: 'from-secondary to-accent' },
                      { label: '5 ans', value: insight?.projections?.fiveYear || 0, color: 'from-accent to-primary' }
                    ].map((projection, index) => (
                      <motion.div
                        key={projection.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * (index + 1) }}
                      >
                        <GlassCard variant="floating" className="p-6 text-center group hover:scale-105 transition-all">
                          <div className="text-sm text-muted-foreground mb-2">{projection.label}</div>
                          <div className={`text-4xl font-bold bg-gradient-to-r ${projection.color} bg-clip-text text-transparent`}>
                            {projection.value >= 0 ? '+' : ''}{Math.round(projection.value).toLocaleString()}€
                          </div>
                          <Progress value={Math.min(100, Math.abs(projection.value) / 100)} className="mt-4 h-2" />
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Other tabs would be implemented similarly with advanced features */}
                <TabsContent value="insights">
                  <GlassCard variant="premium" className="p-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      🧠 Insights IA Avancés
                    </h3>
                    <div className="space-y-4">
                      <p>Analyses comportementales poussées...</p>
                      <p>Détection de patterns cachés...</p>
                      <p>Recommandations personnalisées...</p>
                    </div>
                  </GlassCard>
                </TabsContent>

                {tabs.slice(2).map(tab => (
                  <TabsContent key={tab.id} value={tab.id}>
                    <GlassCard variant="premium" className="p-8">
                      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        <tab.icon className="w-6 h-6 inline mr-2" />
                        {tab.label} - Version Révolutionnaire
                      </h3>
                      <div className="space-y-4">
                        <p>Fonctionnalités ultra-avancées en développement...</p>
                        <p>Interface immersive et interactive...</p>
                        <p>IA de pointe pour des insights révolutionnaires...</p>
                      </div>
                    </GlassCard>
                  </TabsContent>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Floating Action Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-20 space-y-3"
      >
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-primary to-secondary shadow-2xl hover:scale-110 transition-transform"
          onClick={() => {
            playSound('click');
            playHaptic('medium');
          }}
        >
          <Share className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};
