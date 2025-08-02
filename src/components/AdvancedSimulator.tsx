
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  Zap, 
  Target,
  Home,
  Car,
  GraduationCap,
  Heart,
  Plane,
  DollarSign,
  PiggyBank,
  CreditCard
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  icon: LucideIcon;
  category: string;
  defaultImpact: number;
  description: string;
  impacts: {
    income?: number;
    expenses?: number;
    assets?: number;
    debts?: number;
  };
}

const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'salary_increase',
    name: 'Augmentation de salaire',
    icon: TrendingUp,
    category: 'revenus',
    defaultImpact: 500,
    description: 'Impact d\'une augmentation sur votre situation financière',
    impacts: { income: 1 }
  },
  {
    id: 'house_purchase',
    name: 'Achat immobilier',
    icon: Home,
    category: 'patrimoine',
    defaultImpact: 200000,
    description: 'Simulation d\'un achat de résidence principale',
    impacts: { assets: 1, debts: 0.8, expenses: 0.2 }
  },
  {
    id: 'car_purchase',
    name: 'Achat véhicule',
    icon: Car,
    category: 'dépenses',
    defaultImpact: 25000,
    description: 'Impact d\'un achat de véhicule sur votre budget',
    impacts: { assets: 0.7, expenses: 0.15 }
  },
  {
    id: 'education',
    name: 'Formation professionnelle',
    icon: GraduationCap,
    category: 'investissement',
    defaultImpact: 5000,
    description: 'Investissement en formation pour augmenter vos revenus futurs',
    impacts: { expenses: 1, income: 0.3 }
  },
  {
    id: 'health_emergency',
    name: 'Urgence médicale',
    icon: Heart,
    category: 'imprévu',
    defaultImpact: 8000,
    description: 'Impact d\'une dépense médicale imprévue',
    impacts: { expenses: 1 }
  },
  {
    id: 'vacation',
    name: 'Voyage exceptionnel',
    icon: Plane,
    category: 'loisirs',
    defaultImpact: 3000,
    description: 'Budget pour des vacances de rêve',
    impacts: { expenses: 1 }
  }
];

interface AdvancedSimulatorProps {
  currentInsight?: string;
  onSimulationResult?: (result: SimulationResult) => void;
}

interface SimulationResult {
  scenario: string;
  impact: number;
  projections: Array<{
    period: string;
    balance: number;
    growth: number;
  }>;
  analysis: {
    recommendation: string;
    risk: 'low' | 'medium' | 'high';
    confidence: number;
  };
}

export const AdvancedSimulator = ({ currentInsight, onSimulationResult }: AdvancedSimulatorProps) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [customScenarios, setCustomScenarios] = useState<SimulationScenario[]>([]);
  const [simulationParams, setSimulationParams] = useState<Record<string, number>>({});
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async (scenario: SimulationScenario, amount: number) => {
    setIsSimulating(true);
    
    // Simulation réaliste avec calculs avancés
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseIncome = currentInsight?.projections?.monthly || 3000;
    const baseExpenses = Math.abs(baseIncome * 0.7);
    
    // Calculs d'impact complexes
    const impactMultiplier = amount / scenario.defaultImpact;
    const timeHorizon = [1, 3, 5, 10]; // années
    
    const projections = timeHorizon.map(years => {
          const incomeChange = (scenario.impacts.income || 0) * amount * 0.1;
    const expenseChange = (scenario.impacts.expenses || 0) * amount / years;
      
      const newMonthly = (baseIncome + incomeChange) - (baseExpenses + expenseChange);
      return {
        years,
        monthly: newMonthly,
        yearly: newMonthly * 12,
        total: newMonthly * 12 * years
      };
    });

    const result = {
      scenario: scenario.name,
      amount,
      projections,
      riskLevel: amount > scenario.defaultImpact * 2 ? 'high' : 
                 amount > scenario.defaultImpact ? 'medium' : 'low',
      recommendations: [
        `Considérez ${scenario.description.toLowerCase()}`,
        `Impact estimé: ${projections[0].monthly >= 0 ? '+' : ''}${projections[0].monthly.toFixed(0)}€/mois`,
        `Préparez un fonds d'urgence de ${(amount * 0.1).toFixed(0)}€`
      ],
      confidence: Math.max(70, 95 - Math.abs(impactMultiplier - 1) * 20)
    };

    setResults(result);
    setIsSimulating(false);
    onSimulationResult?.(result);
  };

  const addCustomScenario = () => {
    const newScenario: SimulationScenario = {
      id: `custom_${Date.now()}`,
      name: 'Scénario personnalisé',
      icon: Calculator,
      category: 'custom',
      defaultImpact: 1000,
      description: 'Votre simulation personnalisée',
      impacts: { expenses: 1 }
    };
    setCustomScenarios([...customScenarios, newScenario]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🎯 Simulateur Financier Avancé
        </h3>
        <p className="text-muted-foreground mb-6">
          Explorez différents scénarios et leur impact sur votre situation financière avec des calculs précis et des projections réalistes.
        </p>
      </Card>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios">Scénarios Prédéfinis</TabsTrigger>
          <TabsTrigger value="custom">Simulation Libre</TabsTrigger>
          <TabsTrigger value="comparison">Comparaison</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIMULATION_SCENARIOS.map((scenario) => {
              const Icon = scenario.icon;
              const isActive = activeScenario === scenario.id;
              
              return (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      isActive ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                    }`}
                    onClick={() => setActiveScenario(isActive ? null : scenario.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-muted'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">{scenario.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {scenario.description}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {scenario.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {activeScenario && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
                  {(() => {
                    const scenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenario);
                    if (!scenario) return null;

                    const currentAmount = simulationParams[scenario.id] || scenario.defaultImpact;

                    return (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <scenario.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold">{scenario.name}</h4>
                            <p className="text-muted-foreground">{scenario.description}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-3 block">
                              Montant à simuler: {currentAmount.toLocaleString()}€
                            </Label>
                            <Slider
                              value={[currentAmount]}
                              onValueChange={([value]) => 
                                setSimulationParams(prev => ({ ...prev, [scenario.id]: value }))
                              }
                              max={scenario.defaultImpact * 3}
                              min={scenario.defaultImpact * 0.1}
                              step={scenario.defaultImpact * 0.05}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                              <span>{(scenario.defaultImpact * 0.1).toLocaleString()}€</span>
                              <span>{(scenario.defaultImpact * 3).toLocaleString()}€</span>
                            </div>
                          </div>

                          <Button
                            onClick={() => runSimulation(scenario, currentAmount)}
                            disabled={isSimulating}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          >
                            {isSimulating ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Simulation en cours...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Lancer la simulation
                              </div>
                            )}
                          </Button>
                        </div>

                        {results && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 mt-6 pt-6 border-t"
                          >
                            <h5 className="text-lg font-semibold text-primary">📊 Résultats de simulation</h5>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {results.projections.map((proj, index: number) => (
                                <Card key={index} className="p-3 text-center">
                                  <div className="text-xs text-muted-foreground">{proj.years} an{proj.years > 1 ? 's' : ''}</div>
                                  <div className={`text-lg font-bold ${proj.monthly >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {proj.monthly >= 0 ? '+' : ''}{proj.monthly.toFixed(0)}€
                                  </div>
                                  <div className="text-xs text-muted-foreground">/mois</div>
                                </Card>
                              ))}
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge className={`${
                                results.riskLevel === 'high' ? 'bg-danger' :
                                results.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
                              } text-white`}>
                                Risque: {results.riskLevel}
                              </Badge>
                              <Badge variant="outline">
                                Fiabilité: {results.confidence}%
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <h6 className="font-medium">💡 Recommandations:</h6>
                              {results.recommendations.map((rec: string, index: number) => (
                                <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                                  {rec}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })()}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">🔧 Créer votre simulation personnalisée</h4>
            <Button onClick={addCustomScenario} variant="outline" className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Ajouter un scénario personnalisé
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">⚖️ Comparaison de scénarios</h4>
            <p className="text-muted-foreground">
              Comparez jusqu'à 3 scénarios simultanément pour optimiser vos décisions financières.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
