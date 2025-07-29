import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TrendChartProps {}

export const TrendChart = ({}: TrendChartProps) => {
  const [timeframe, setTimeframe] = useState('6months');

  // Mock data for demonstration
  const trends = [
    { month: 'Jan', balance: 150, mood: 6 },
    { month: 'Fév', balance: -50, mood: 4 },
    { month: 'Mar', balance: 200, mood: 7 },
    { month: 'Avr', balance: -100, mood: 5 },
    { month: 'Mai', balance: 300, mood: 8 },
    { month: 'Juin', balance: 50, mood: 6 },
  ];

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary">📈 Voyant des Tendances</h2>
          <div className="flex gap-2">
            {['3months', '6months', '1year'].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
                className={timeframe === period ? "btn-hero" : "btn-ghost-glow"}
              >
                {period === '3months' ? '3M' : period === '6months' ? '6M' : '1A'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="font-medium w-12">{trend.month}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Humeur:</span>
                  <Badge variant="outline" className="text-xs">
                    {trend.mood}/10
                  </Badge>
                </div>
              </div>
              <div className={`text-lg font-bold ${trend.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                {trend.balance >= 0 ? '+' : ''}{trend.balance}€
              </div>
            </div>
          ))}
        </div>

        <Alert className="mt-6 border-warning/20 bg-warning/10">
          <AlertDescription>
            💡 <strong>Corrélation détectée :</strong> Votre humeur élevée (&ge;7) correspond à +60% d'économies en moyenne.
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
};

interface WhatIfSimulatorProps {}

export const WhatIfSimulator = ({}: WhatIfSimulatorProps) => {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Augmentation salaire +10%', impact: 320, active: false },
    { id: 2, name: 'Réduction abonnements -20%', impact: 65, active: false },
    { id: 3, name: 'Moins de livraisons -50%', impact: 120, active: false },
  ]);

  const [customScenario, setCustomScenario] = useState({ name: '', amount: 0 });

  const toggleScenario = (id: number) => {
    setScenarios(prev => 
      prev.map(s => s.id === id ? { ...s, active: !s.active } : s)
    );
  };

  const totalImpact = scenarios
    .filter(s => s.active)
    .reduce((sum, s) => sum + s.impact, 0);

  const addCustomScenario = () => {
    if (customScenario.name && customScenario.amount) {
      const newScenario = {
        id: Date.now(),
        name: customScenario.name,
        impact: customScenario.amount,
        active: false
      };
      setScenarios([...scenarios, newScenario]);
      setCustomScenario({ name: '', amount: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <h2 className="text-xl font-semibold text-primary mb-6">🎯 Mode "Et si ?"</h2>
        
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover-lift ${
                scenario.active 
                  ? 'bg-primary/10 border-primary/30' 
                  : 'bg-muted/30 border-border/30'
              }`}
              onClick={() => toggleScenario(scenario.id)}
            >
              <div className="flex justify-between items-center">
                <span className={scenario.active ? 'text-primary font-medium' : ''}>
                  {scenario.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${scenario.impact > 0 ? 'text-success' : 'text-danger'}`}>
                    {scenario.impact > 0 ? '+' : ''}{scenario.impact}€
                  </span>
                  <div className={`w-4 h-4 rounded border-2 ${
                    scenario.active 
                      ? 'bg-primary border-primary' 
                      : 'border-muted-foreground'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
          <h3 className="font-medium mb-3">Créer un scénario personnalisé</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Ex: Freelance le weekend"
              value={customScenario.name}
              onChange={(e) => setCustomScenario(prev => ({ ...prev, name: e.target.value }))}
              className="input-premium flex-1"
            />
            <Input
              type="number"
              placeholder="€/mois"
              value={customScenario.amount || ''}
              onChange={(e) => setCustomScenario(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              className="input-premium w-32"
            />
            <Button onClick={addCustomScenario} className="btn-hero">
              Ajouter
            </Button>
          </div>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Impact total des changements</div>
            <div className={`text-3xl font-bold ${totalImpact >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalImpact >= 0 ? '+' : ''}{totalImpact}€/mois
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Soit {Math.abs(totalImpact * 12)}€ sur 12 mois
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface HiddenCostsDetectorProps {
  hiddenCosts: string[];
}

export const HiddenCostsDetector = ({ hiddenCosts }: HiddenCostsDetectorProps) => {
  const [selectedCost, setSelectedCost] = useState<string | null>(null);

  const detectedIssues = [
    {
      category: "Abonnements oubliés",
      items: ["Netflix (non utilisé depuis 3 mois)", "Salle de sport (1 visite/mois)", "Premium Spotify (doublons famille)"],
      savings: 45,
      severity: "medium"
    },
    {
      category: "Frais bancaires récurrents",
      items: ["Virements SEPA", "Tenue de compte", "Assurance carte"],
      savings: 12,
      severity: "low"
    },
    {
      category: "Coûts d'opportunité",
      items: ["Livrets A sous-rémunérés", "Liquidités excédentaires", "Investissements non diversifiés"],
      savings: 180,
      severity: "high"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-danger border-danger/30 bg-danger/10';
      case 'medium': return 'text-warning border-warning/30 bg-warning/10';
      case 'low': return 'text-success border-success/30 bg-success/10';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Critique';
      case 'medium': return 'Modéré';
      case 'low': return 'Faible';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <h2 className="text-xl font-semibold text-primary mb-6">🕵️ Détective des Frais Cachés</h2>
        
        {hiddenCosts.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-warning mb-3">⚠️ Alertes de votre analyse</h3>
            <div className="space-y-2">
              {hiddenCosts.map((cost, index) => (
                <Alert key={index} className="border-warning/20 bg-warning/10">
                  <AlertDescription>{cost}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {detectedIssues.map((issue, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all hover-lift ${
                selectedCost === issue.category ? 'ring-2 ring-primary/30' : ''
              }`}
              onClick={() => setSelectedCost(selectedCost === issue.category ? null : issue.category)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-primary">{issue.category}</h3>
                    <Badge className={`mt-1 text-xs ${getSeverityColor(issue.severity)}`} variant="outline">
                      {getSeverityLabel(issue.severity)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">-{issue.savings}€</div>
                    <div className="text-xs text-muted-foreground">économies potentielles</div>
                  </div>
                </div>

                {selectedCost === issue.category && (
                  <div className="mt-4 space-y-2 border-t border-border/30 pt-4">
                    {issue.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                        <span>{item}</span>
                        <Button variant="outline" size="sm" className="text-xs">
                          Optimiser
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-success/10 to-secondary/10 rounded-lg border border-success/20">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">💰 Économies totales identifiées</div>
            <div className="text-3xl font-bold text-success">
              -{detectedIssues.reduce((sum, issue) => sum + issue.savings, 0)}€/mois
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Soit {detectedIssues.reduce((sum, issue) => sum + issue.savings, 0) * 12}€ récupérés sur 12 mois
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};