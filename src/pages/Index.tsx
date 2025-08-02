
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useAdvancedFinancialEngine } from '@/hooks/useAdvancedFinancialEngine';
import { ConversationalInterface } from '@/components/ConversationalInterface';
import { LazyRevolutionaryDashboard } from '@/components/LazyComponents';
import { FinancialDataForm } from '@/components/FinancialDataForm';
import { AdvancedParticleSystem } from '@/components/AdvancedParticleSystem';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { FinancialData, Exploration } from '@/store/useStore';

const Index = () => {
  const { 
    currentStep, 
    currentExploration, 
    isAnalyzing,
    setCurrentStep, 
    setCurrentExploration,
    addExploration,
    theme
  } = useStore();
  
  const { insight, calculateAdvancedInsight } = useAdvancedFinancialEngine();
  const [question, setQuestion] = useState('');
  const [analysisStage, setAnalysisStage] = useState('');

  useEffect(() => {
    if (isAnalyzing) {
      const stages = [
        'Analyse des patterns comportementaux...',
        'Corrélation émotions-dépenses...',
        'Modélisation prédictive avancée...',
        'Génération des insights personnalisés...',
        'Finalisation de votre révélation...'
      ];
      
      let stageIndex = 0;
      const interval = setInterval(() => {
        if (stageIndex < stages.length) {
          setAnalysisStage(stages[stageIndex]);
          stageIndex++;
        }
      }, 700);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const handleQuestionSubmit = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('data');
  };

  const handleDataSubmit = async (data: FinancialData) => {
    setCurrentStep('revelation');
    
    const newInsight = await calculateAdvancedInsight(data, question);
    
    const exploration: Exploration = {
      id: Date.now().toString(),
      question,
      data,
      insights: newInsight,
      timestamp: Date.now(),
      theme
    };
    
    setCurrentExploration(exploration);
    addExploration(exploration);
  };

  const handleNewExploration = () => {
    setCurrentStep('question');
    setCurrentExploration(null);
    setQuestion('');
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'question': return 0;
      case 'data': return 33;
      case 'revelation': return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'question': return 'Quelle est votre question financière ?';
      case 'data': return 'Cartographie financière intelligente';
      case 'revelation': return 'Votre révélation financière';
      default: return '';
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {currentStep === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ConversationalInterface onQuestionSubmit={handleQuestionSubmit} />
          </motion.div>
        )}

        {currentStep === 'revelation' && insight && currentExploration && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LazyRevolutionaryDashboard 
              insight={insight} 
              question={question} 
              onNewExploration={handleNewExploration}
              financialData={currentExploration.data}
            />
          </motion.div>
        )}

        {currentStep === 'data' && (
          <motion.div
            key="data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative overflow-hidden"
          >
            <AdvancedParticleSystem count={30} />
            
            <div className="container max-w-4xl mx-auto px-6 py-8 relative z-10">
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
              >
                <GlassCard variant="hero" blur="xl" className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setCurrentStep('question')}
                      className="bg-background/20 hover:bg-background/40 backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour
                    </Button>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        {getStepTitle()}
                      </h1>
                      <p className="text-muted-foreground text-sm mt-1">
                        Question : "{question}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progression de l'analyse</span>
                      <span>{getStepProgress()}%</span>
                    </div>
                    <Progress value={getStepProgress()} className="h-3" />
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <GlassCard variant="premium" blur="lg" className="p-8 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Cartographie Financière Quantique
                    </h2>
                    <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Notre IA va analyser vos données pour révéler des insights financiers impossibles à détecter humainement. 
                    Chaque information compte pour créer votre équation financière personnalisée.
                  </p>
                </GlassCard>
                
                <FinancialDataForm onDataSubmit={handleDataSubmit} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === 'revelation' && isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <AdvancedParticleSystem count={80} interactive constellation />
            
            <GlassCard variant="hero" blur="xl" glow className="max-w-2xl mx-6 p-12 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-8"
              >
                🧠
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Analyse Quantique en Cours
              </h2>
              
              <motion.p 
                key={analysisStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl text-muted-foreground mb-8"
              >
                {analysisStage}
              </motion.p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { icon: '🎯', label: 'Patterns détectés', value: '47' },
                    { icon: '🧮', label: 'Corrélations', value: '23' },
                    { icon: '🔮', label: 'Prédictions', value: '12' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="space-y-2"
                    >
                      <div className="text-3xl">{stat.icon}</div>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <Progress value={85} className="h-4" />
                
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Brain className="w-4 h-4 animate-pulse" />
                  <span>IA Neuronale Rivela v3.0 • Fiabilité: 94%</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
