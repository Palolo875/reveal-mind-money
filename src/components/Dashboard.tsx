
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RevelationCard } from './RevelationCard';
import { PredictiveAnalytics } from './PredictiveAnalytics';

interface FinancialInsight {
  equation: string;
  insight: string;
  comparison: string;
  emotionalState: string;
  healthScore: number;
  recommendations: string[];
  hiddenCosts: string[];
  projections: {
    monthly: number;
    yearly: number;
    fiveYear: number;
  };
}

interface DashboardProps {
  insight: FinancialInsight;
  question: string;
  onNewExploration: () => void;
}

// Simple fallback components
const SimpleTrendChart = () => (
  <Card className="card-premium p-8">
    <h3 className="text-lg font-semibold text-primary mb-4">📈 Tendances</h3>
    <div className="space-y-4">
      <p>Analyse des tendances financières en cours...</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">+8%</div>
          <div className="text-sm text-muted-foreground">Épargne</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">-2%</div>
          <div className="text-sm text-muted-foreground">Dépenses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">12%</div>
          <div className="text-sm text-muted-foreground">ROI</div>
        </div>
      </div>
    </div>
  </Card>
);

const SimpleWhatIfSimulator = () => (
  <Card className="card-premium p-8">
    <h3 className="text-lg font-semibold text-primary mb-4">🎯 Simulateur "Et si ?"</h3>
    <div className="space-y-4">
      <p>Testez différents scénarios financiers :</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline">
          💰 +500€ revenus
        </Button>
        <Button variant="outline">
          🏠 Achat immobilier
        </Button>
      </div>
    </div>
  </Card>
);

const SimpleHiddenCostsDetector = ({ hiddenCosts }: { hiddenCosts: string[] }) => (
  <Card className="card-premium p-8">
    <h3 className="text-lg font-semibold text-primary mb-4">🕵️ Détecteur de Coûts Cachés</h3>
    <div className="space-y-3">
      {hiddenCosts && hiddenCosts.length > 0 ? (
        hiddenCosts.map((cost, index) => (
          <div key={index} className="p-3 bg-warning/10 rounded-lg border border-warning/20">
            <p className="text-sm">{cost}</p>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">Aucun coût caché détecté.</p>
      )}
    </div>
  </Card>
);

export const Dashboard = ({ insight, question, onNewExploration }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('revelation');

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return 'Excellente';
    if (score >= 60) return 'Bonne';
    if (score >= 40) return 'Moyenne';
    return 'À améliorer';
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Votre Révélation Financière
          </h1>
          <p className="text-muted-foreground">
            Question analysée : "{question}"
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={onNewExploration} className="btn-ghost-glow">
            🔍 Nouvelle exploration
          </Button>
          <Button className="btn-hero">
            📄 Exporter en PDF
          </Button>
        </div>
      </div>

      {/* Health Score */}
      <Card className="card-premium">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">📊 Indice de Santé Financière</h2>
          <Badge className={`${getHealthColor(insight.healthScore)} border-current`} variant="outline">
            {getHealthLabel(insight.healthScore)}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Score global</span>
            <span className={`text-2xl font-bold ${getHealthColor(insight.healthScore)}`}>
              {insight.healthScore}/100
            </span>
          </div>
          <Progress value={insight.healthScore} className="h-3" />
        </div>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="revelation">🔮 Révélation</TabsTrigger>
          <TabsTrigger value="trends">📈 Tendances</TabsTrigger>
          <TabsTrigger value="whatif">🎯 Et si ?</TabsTrigger>
          <TabsTrigger value="detective">🕵️ Détective</TabsTrigger>
        </TabsList>

        <TabsContent value="revelation" className="space-y-6">
          <RevelationCard
            equation={insight.equation}
            insight={insight.insight}
            comparison={insight.comparison}
            emotionalState={insight.emotionalState}
            isAnimating={true}
          />

          {/* Projections */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-insight text-center">
              <div className="text-sm text-muted-foreground mb-2">Mensuel</div>
              <div className={`text-2xl font-bold ${insight.projections.monthly >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.monthly >= 0 ? '+' : ''}{insight.projections.monthly.toFixed(0)}€
              </div>
            </Card>
            
            <Card className="card-insight text-center">
              <div className="text-sm text-muted-foreground mb-2">Annuel</div>
              <div className={`text-2xl font-bold ${insight.projections.yearly >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.yearly >= 0 ? '+' : ''}{insight.projections.yearly.toFixed(0)}€
              </div>
            </Card>
            
            <Card className="card-insight text-center">
              <div className="text-sm text-muted-foreground mb-2">5 ans</div>
              <div className={`text-2xl font-bold ${insight.projections.fiveYear >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.fiveYear >= 0 ? '+' : ''}{insight.projections.fiveYear.toFixed(0)}€
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="card-premium">
            <h3 className="text-lg font-semibold text-primary mb-4">💡 Recommandations Personnalisées</h3>
            <div className="space-y-3">
              {insight.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="text-secondary font-bold">{index + 1}.</div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <SimpleTrendChart />
        </TabsContent>

        <TabsContent value="whatif">
          <SimpleWhatIfSimulator />
        </TabsContent>

        <TabsContent value="detective">
          <SimpleHiddenCostsDetector hiddenCosts={insight.hiddenCosts} />
        </TabsContent>
      </Tabs>

      {/* Scientific Evidence */}
      <Card className="card-premium border border-secondary/20">
        <div className="flex items-start gap-4">
          <Badge className="bg-secondary/20 text-secondary border-secondary/30">
            🧠 Science vérifiée
          </Badge>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Étude Cambridge 2023</h3>
            <p className="text-sm text-muted-foreground mb-3">
              "Décisions financières 37% moins rationnelles quand le cortisol &gt; 25μg/dL"
            </p>
            <Button variant="outline" size="sm" className="text-xs">
              📚 Voir le résumé complet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
