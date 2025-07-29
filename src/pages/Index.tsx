import { useState } from 'react';
import { QuestionInput } from '@/components/QuestionInput';
import { FinancialDataForm } from '@/components/FinancialDataForm';
import { EnhancedDashboard } from '@/components/EnhancedDashboard';
import { ParticleSystem } from '@/components/ParticleSystem';
import { useFinancialEngine } from '@/hooks/useFinancialEngine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

interface FinancialData {
  income: FinancialItem[];
  fixedExpenses: FinancialItem[];
  variableExpenses: FinancialItem[];
  debts: FinancialItem[];
  mood: number;
  emotionalTags: string[];
}

type Step = 'question' | 'data' | 'revelation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('question');
  const [question, setQuestion] = useState('');
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const { insight, isCalculating, calculateInsight } = useFinancialEngine();

  const handleQuestionSubmit = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('data');
  };

  const handleDataSubmit = async (data: FinancialData) => {
    setFinancialData(data);
    setCurrentStep('revelation');
    await calculateInsight(data);
  };

  const handleNewExploration = () => {
    setCurrentStep('question');
    setQuestion('');
    setFinancialData(null);
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
      case 'question': return 'Quelle est votre question ?';
      case 'data': return 'Cartographie financière';
      case 'revelation': return 'Votre révélation';
      default: return '';
    }
  };

  if (currentStep === 'question') {
    return <QuestionInput onQuestionSubmit={handleQuestionSubmit} />;
  }

  if (currentStep === 'revelation' && insight) {
    return <EnhancedDashboard insight={insight} question={question} onNewExploration={handleNewExploration} financialData={financialData} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleSystem count={15} />
      
      <div className="container max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentStep('question')}
              className="btn-ghost-glow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">{getStepTitle()}</h1>
              <p className="text-muted-foreground text-sm">
                Question : "{question}"
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progression</span>
              <span>{getStepProgress()}%</span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>
        </div>

        {/* Data Collection Step */}
        {currentStep === 'data' && (
          <div className="space-y-6">
            <Card className="card-premium">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  💾 Cartographie Financière Modulaire
                </h2>
                <p className="text-muted-foreground">
                  Ajoutez vos données pour révéler votre équation financière personnalisée
                </p>
              </div>
            </Card>
            
            <FinancialDataForm onDataSubmit={handleDataSubmit} />
          </div>
        )}

        {/* Loading State */}
        {currentStep === 'revelation' && isCalculating && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="card-premium text-center max-w-lg">
              <div className="space-y-6">
                <div className="text-6xl animate-pulse">🔮</div>
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-2">
                    Analyse en cours...
                  </h2>
                  <p className="text-muted-foreground">
                    Nos algorithmes neuroscientifiques révèlent votre équation financière
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm">Analyse des patterns comportementaux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-300" />
                    <span className="text-sm">Corrélation émotions-dépenses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse delay-700" />
                    <span className="text-sm">Génération des insights personnalisés</span>
                  </div>
                </div>
                
                <Progress value={75} className="h-2" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;