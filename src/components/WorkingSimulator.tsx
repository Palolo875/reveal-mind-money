import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Home,
  Car,
  GraduationCap,
  Plane,
  Heart,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'income' | 'expense' | 'investment' | 'lifestyle';
  impact: {
    income?: number;
    expenses?: number;
    savings?: number;
  };
  color: string;
}

interface WorkingSimulatorProps {
  currentData: any;
  onSimulationComplete: (result: any) => void;
}

const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'salary-increase',
    name: 'Augmentation de salaire',
    description: 'Simuler une augmentation de revenus',
    icon: TrendingUp,
    category: 'income',
    impact: { income: 500 },
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'new-job',
    name: 'Nouveau travail',
    description: 'Changement de carrière avec meilleur salaire',
    icon: Zap,
    category: 'income',
    impact: { income: 1000 },
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'house-purchase',
    name: 'Achat immobilier',
    description: 'Acquisition d\'une résidence principale',
    icon: Home,
    category: 'expense',
    impact: { expenses: 800, savings: -50000 },
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'car-purchase',
    name: 'Achat de voiture',
    description: 'Acquisition d\'un véhicule',
    icon: Car,
    category: 'expense',
    impact: { expenses: 300, savings: -15000 },
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'education',
    name: 'Formation professionnelle',
    description: 'Investissement dans l\'éducation',
    icon: GraduationCap,
    category: 'investment',
    impact: { expenses: 200, income: 300 },
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'vacation',
    name: 'Voyage de rêve',
    description: 'Dépense pour un voyage exceptionnel',
    icon: Plane,
    category: 'lifestyle',
    impact: { expenses: 1000, savings: -5000 },
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'investment',
    name: 'Investissement boursier',
    description: 'Placement en actions/fonds',
    icon: Target,
    category: 'investment',
    impact: { savings: -2000, income: 100 },
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 'health-insurance',
    name: 'Assurance santé premium',
    description: 'Protection santé renforcée',
    icon: Heart,
    category: 'expense',
    impact: { expenses: 150 },
    color: 'from-red-500 to-pink-500'
  }
];

export const WorkingSimulator = ({ currentData, onSimulationComplete }: WorkingSimulatorProps) => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [customValues, setCustomValues] = useState({
    income: 0,
    expenses: 0,
    savings: 0
  });
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCurrentBalance = () => {
    const totalIncome = currentData.income.reduce((sum: number, item: any) => sum + item.amount, 0);
    const totalExpenses = currentData.fixedExpenses.reduce((sum: number, item: any) => sum + item.amount, 0) +
                         currentData.variableExpenses.reduce((sum: number, item: any) => sum + item.amount, 0) +
                         currentData.debts.reduce((sum: number, item: any) => sum + item.amount, 0);
    return totalIncome - totalExpenses;
  };

  const runSimulation = async () => {
    if (!selectedScenario) return;

    setIsCalculating(true);

    // Simuler le calcul
    await new Promise(resolve => setTimeout(resolve, 2000));

    const currentBalance = calculateCurrentBalance();
    const scenarioImpact = selectedScenario.impact;

    const newBalance = currentBalance + 
      (scenarioImpact.income || 0) - 
      (scenarioImpact.expenses || 0) + 
      (scenarioImpact.savings || 0);

    const result = {
      scenario: selectedScenario,
      currentBalance,
      newBalance,
      difference: newBalance - currentBalance,
      impact: scenarioImpact,
      timestamp: new Date(),
      insights: generateInsights(selectedScenario, currentBalance, newBalance)
    };

    setSimulationResult(result);
    setIsCalculating(false);
    onSimulationComplete(result);
  };

  const generateInsights = (scenario: SimulationScenario, current: number, future: number) => {
    const insights = [];
    const difference = future - current;

    if (difference > 0) {
      insights.push(`✅ Impact positif : +${difference.toFixed(0)}€/mois`);
      insights.push(`🎯 Objectif atteignable avec cette modification`);
    } else {
      insights.push(`⚠️ Impact négatif : ${difference.toFixed(0)}€/mois`);
      insights.push(`💡 Considérez des ajustements complémentaires`);
    }

    if (scenario.category === 'income') {
      insights.push(`📈 Augmentation de revenus = plus de flexibilité financière`);
    } else if (scenario.category === 'expense') {
      insights.push(`🏠 Investissement long terme = patrimoine en construction`);
    } else if (scenario.category === 'investment') {
      insights.push(`💎 Investissement = potentiel de croissance future`);
    }

    return insights;
  };

  const resetSimulation = () => {
    setSelectedScenario(null);
    setCustomValues({ income: 0, expenses: 0, savings: 0 });
    setSimulationResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-8 h-8 text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Simulateur "Et si ?"</h2>
            <p className="text-gray-300">Explorez l'impact de changements financiers</p>
          </div>
        </div>
      </Card>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SIMULATION_SCENARIOS.map((scenario) => (
          <motion.div
            key={scenario.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Card 
              className={`p-4 border-2 transition-all duration-300 ${
                selectedScenario?.id === scenario.id 
                  ? 'border-purple-500 bg-purple-500/20' 
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
              }`}
              onClick={() => setSelectedScenario(scenario)}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${scenario.color} p-3 mb-3`}>
                <scenario.icon className="w-full h-full text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">{scenario.name}</h3>
              <p className="text-sm text-gray-400">{scenario.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Custom Values */}
      {selectedScenario && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card className="p-6 bg-white/10 border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ajuster les valeurs pour {selectedScenario.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Impact sur revenus (€/mois)</Label>
                <Input
                  type="number"
                  value={customValues.income}
                  onChange={(e) => setCustomValues(prev => ({ ...prev, income: Number(e.target.value) }))}
                  className="mt-2 bg-white/10 border-white/20 text-white"
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Impact sur dépenses (€/mois)</Label>
                <Input
                  type="number"
                  value={customValues.expenses}
                  onChange={(e) => setCustomValues(prev => ({ ...prev, expenses: Number(e.target.value) }))}
                  className="mt-2 bg-white/10 border-white/20 text-white"
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label className="text-gray-300">Impact sur épargne (€)</Label>
                <Input
                  type="number"
                  value={customValues.savings}
                  onChange={(e) => setCustomValues(prev => ({ ...prev, savings: Number(e.target.value) }))}
                  className="mt-2 bg-white/10 border-white/20 text-white"
                  placeholder="0"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={runSimulation}
              disabled={isCalculating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isCalculating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                  </motion.div>
                  Calcul en cours...
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Lancer la simulation
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={resetSimulation}
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-xl backdrop-blur-xl"
            >
              Réinitialiser
            </Button>
          </div>
        </motion.div>
      )}

      {/* Simulation Results */}
      <AnimatePresence>
        {simulationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                Résultats de la simulation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300">Situation actuelle</div>
                  <div className="text-3xl font-bold text-white mt-2">
                    {simulationResult.currentBalance.toFixed(0)}€
                  </div>
                  <div className="text-sm text-gray-400">Balance mensuelle</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300">Après changement</div>
                  <div className={`text-3xl font-bold mt-2 ${
                    simulationResult.newBalance >= simulationResult.currentBalance 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {simulationResult.newBalance.toFixed(0)}€
                  </div>
                  <div className="text-sm text-gray-400">Balance mensuelle</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-300">Différence</div>
                  <div className={`text-3xl font-bold mt-2 ${
                    simulationResult.difference >= 0 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {simulationResult.difference >= 0 ? '+' : ''}{simulationResult.difference.toFixed(0)}€
                  </div>
                  <div className="text-sm text-gray-400">Impact mensuel</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Insights générés :</h4>
                {simulationResult.insights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-gray-300">{insight}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};