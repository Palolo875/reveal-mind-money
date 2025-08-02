
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useAdvancedFinancialEngine } from '@/hooks/useAdvancedFinancialEngine';
import { RevolutionaryHero } from '@/components/RevolutionaryHero';
import { RevolutionaryNavigation } from '@/components/RevolutionaryNavigation';
import { ConversationalInterface } from '@/components/ConversationalInterface';
import { LazyRevolutionaryDashboard } from '@/components/LazyComponents';
import { FinancialDataForm } from '@/components/FinancialDataForm';
import { AdvancedParticleSystem } from '@/components/AdvancedParticleSystem';
import { RevolutionaryCard } from '@/components/ui/revolutionary-card';
import { RevolutionaryButton } from '@/components/ui/revolutionary-button';
import { RevolutionaryInput } from '@/components/ui/revolutionary-input';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Brain, 
  Sparkles, 
  Target,
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  Globe,
  Star,
  Play,
  BookOpen,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { FinancialData, Exploration } from '@/store/useStore';

const Index = () => {
  const { 
    currentStep, 
    currentExploration, 
    isAnalyzing,
    setCurrentStep, 
    setCurrentExploration,
    addExploration,
    theme,
    setTheme
  } = useStore();
  
  const { insight, calculateAdvancedInsight } = useAdvancedFinancialEngine();
  const [question, setQuestion] = useState('');
  const [analysisStage, setAnalysisStage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

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
    setCurrentPage('exploration');
  };

  const handleQuickQuestion = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('data');
    setCurrentPage('exploration');
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
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'exploration') {
      setCurrentStep('question');
    }
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

  const renderHomePage = () => (
    <RevolutionaryHero
      onStartExploration={() => {
        setCurrentPage('exploration');
        setCurrentStep('question');
      }}
      onQuickQuestion={handleQuickQuestion}
    />
  );

  const renderExplorationPage = () => (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedParticleSystem count={30} />
      
      <div className="container max-w-4xl mx-auto px-6 py-8 relative z-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <RevolutionaryCard variant="hero" blur="xl" className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <RevolutionaryButton 
                variant="glass" 
                size="sm" 
                onClick={() => setCurrentPage('home')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Retour
              </RevolutionaryButton>
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
          </RevolutionaryCard>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <RevolutionaryCard variant="premium" blur="lg" className="p-8 text-center">
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
          </RevolutionaryCard>
          
          <FinancialDataForm onDataSubmit={handleDataSubmit} />
        </motion.div>
      </div>
    </div>
  );

  const renderRevelationPage = () => (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedParticleSystem count={50} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        {insight && currentExploration && (
          <LazyRevolutionaryDashboard 
            insight={insight} 
            question={question} 
            onNewExploration={handleNewExploration}
            financialData={currentExploration.data}
          />
        )}
      </div>
    </div>
  );

  const renderAnalyticsPage = () => (
    <div className="min-h-screen relative overflow-hidden lg:ml-80">
      <AdvancedParticleSystem count={40} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <RevolutionaryCard variant="hero" blur="xl" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Analytics Avancés
              </h1>
            </div>
            <p className="text-muted-foreground">
              Analysez vos données financières avec des outils d'intelligence artificielle avancés.
            </p>
          </RevolutionaryCard>

          <div className="grid lg:grid-cols-2 gap-6">
            <RevolutionaryCard variant="quantum" blur="lg" className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Tendances Financières
              </h3>
              <p className="text-muted-foreground">
                Visualisez vos patterns de dépenses et d'épargne sur le temps.
              </p>
            </RevolutionaryCard>

            <RevolutionaryCard variant="morphic" blur="lg" className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Objectifs & Projections
              </h3>
              <p className="text-muted-foreground">
                Suivez vos objectifs financiers et projetez votre avenir.
              </p>
            </RevolutionaryCard>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderGoalsPage = () => (
    <div className="min-h-screen relative overflow-hidden lg:ml-80">
      <AdvancedParticleSystem count={35} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <RevolutionaryCard variant="hero" blur="xl" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Objectifs Financiers
              </h1>
            </div>
            <p className="text-muted-foreground">
              Définissez et suivez vos objectifs financiers avec l'aide de l'IA.
            </p>
          </RevolutionaryCard>

          <div className="grid lg:grid-cols-3 gap-6">
            <RevolutionaryCard variant="glass" blur="md" className="p-6">
              <h3 className="text-lg font-semibold mb-3">Épargne</h3>
              <p className="text-muted-foreground text-sm">
                Objectifs d'épargne à court et long terme
              </p>
            </RevolutionaryCard>

            <RevolutionaryCard variant="glass" blur="md" className="p-6">
              <h3 className="text-lg font-semibold mb-3">Investissement</h3>
              <p className="text-muted-foreground text-sm">
                Stratégies d'investissement personnalisées
              </p>
            </RevolutionaryCard>

            <RevolutionaryCard variant="glass" blur="md" className="p-6">
              <h3 className="text-lg font-semibold mb-3">Retraite</h3>
              <p className="text-muted-foreground text-sm">
                Planification de la retraite optimisée
              </p>
            </RevolutionaryCard>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderSimulatorPage = () => (
    <div className="min-h-screen relative overflow-hidden lg:ml-80">
      <AdvancedParticleSystem count={45} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <RevolutionaryCard variant="hero" blur="xl" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Play className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Simulateur "What If"
              </h1>
            </div>
            <p className="text-muted-foreground">
              Testez différents scénarios financiers et découvrez leurs impacts.
            </p>
          </RevolutionaryCard>

          <RevolutionaryCard variant="quantum" blur="lg" className="p-8">
            <h3 className="text-xl font-semibold mb-4">Scénarios Disponibles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <RevolutionaryButton variant="glass" size="lg" fullWidth>
                Augmentation de salaire
              </RevolutionaryButton>
              <RevolutionaryButton variant="glass" size="lg" fullWidth>
                Nouvel investissement
              </RevolutionaryButton>
              <RevolutionaryButton variant="glass" size="lg" fullWidth>
                Achat immobilier
              </RevolutionaryButton>
              <RevolutionaryButton variant="glass" size="lg" fullWidth>
                Changement de carrière
              </RevolutionaryButton>
            </div>
          </RevolutionaryCard>
        </motion.div>
      </div>
    </div>
  );

  const renderLearnPage = () => (
    <div className="min-h-screen relative overflow-hidden lg:ml-80">
      <AdvancedParticleSystem count={30} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <RevolutionaryCard variant="hero" blur="xl" className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Centre d'Apprentissage
              </h1>
            </div>
            <p className="text-muted-foreground">
              Développez vos compétences financières avec nos ressources éducatives.
            </p>
          </RevolutionaryCard>

          <div className="grid lg:grid-cols-2 gap-6">
            <RevolutionaryCard variant="morphic" blur="lg" className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Concepts de Base
              </h3>
              <p className="text-muted-foreground">
                Apprenez les fondamentaux de la gestion financière personnelle.
              </p>
            </RevolutionaryCard>

            <RevolutionaryCard variant="quantum" blur="lg" className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Stratégies Avancées
              </h3>
              <p className="text-muted-foreground">
                Découvrez des stratégies d'investissement et d'optimisation fiscale.
              </p>
            </RevolutionaryCard>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'exploration':
        return renderExplorationPage();
      case 'analytics':
        return renderAnalyticsPage();
      case 'goals':
        return renderGoalsPage();
      case 'simulator':
        return renderSimulatorPage();
      case 'learn':
        return renderLearnPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <>
      <RevolutionaryNavigation
        currentStep={currentPage}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        progress={getStepProgress()}
        theme={theme}
        onThemeChange={setTheme}
      />

      <AnimatePresence mode="wait">
        {currentStep === 'question' && currentPage === 'exploration' && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen relative overflow-hidden lg:ml-80"
          >
            <AdvancedParticleSystem count={40} />
            <div className="container mx-auto px-6 py-8 relative z-10">
              <ConversationalInterface onQuestionSubmit={handleQuestionSubmit} />
            </div>
          </motion.div>
        )}

        {currentStep === 'revelation' && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderRevelationPage()}
          </motion.div>
        )}

        {currentStep !== 'question' && currentStep !== 'revelation' && (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderCurrentPage()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
