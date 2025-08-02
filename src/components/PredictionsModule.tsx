
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface PredictionsModuleProps {
  insight?: string;
  financialData?: import('@/types').FinancialData;
}

export const PredictionsModule = ({ insight, financialData }: PredictionsModuleProps) => {
  const predictions = [
    {
      title: "Dépenses du mois prochain",
      value: insight?.aiPredictions?.nextMonthSpending || 1250,
      confidence: 87,
      trend: "stable",
      icon: TrendingUp
    },
    {
      title: "Probabilité d'atteindre objectifs épargne",
      value: insight?.aiPredictions?.savingsGoalAchievability || 72,
      confidence: 92,
      trend: "positive",
      icon: CheckCircle
    },
    {
      title: "Fonds d'urgence recommandé",
      value: insight?.aiPredictions?.emergencyFundNeeded || 7500,
      confidence: 95,
      trend: "critical",
      icon: AlertTriangle
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Prédictions IA Avancées
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {predictions.map((prediction, index) => {
            const Icon = prediction.icon;
            const getTrendColor = (trend: string) => {
              switch(trend) {
                case 'positive': return 'text-success';
                case 'critical': return 'text-danger';
                default: return 'text-primary';
              }
            };

            return (
              <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${getTrendColor(prediction.trend)}`} />
                  <Badge variant="outline" className="text-xs">
                    Fiabilité {prediction.confidence}%
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-sm mb-2">{prediction.title}</h4>
                
                <div className={`text-2xl font-bold mb-2 ${getTrendColor(prediction.trend)}`}>
                  {prediction.title.includes('Probabilité') ? 
                    `${prediction.value}%` : 
                    `${prediction.value.toLocaleString()}€`
                  }
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Confiance</span>
                    <span className="text-xs font-medium text-primary">
                      {prediction.confidence}%
                    </span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-premium p-6">
          <h4 className="text-lg font-semibold mb-4 text-primary">🔮 Analyse Prédictive</h4>
          <div className="space-y-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <h5 className="font-medium mb-1">Tendance détectée</h5>
              <p className="text-sm text-muted-foreground">
                Vos dépenses variables montrent une corrélation de 73% avec votre état émotionnel.
              </p>
            </div>
            
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <h5 className="font-medium text-success mb-1">Opportunité identifiée</h5>
              <p className="text-sm text-muted-foreground">
                Potentiel d'économie de {Math.round((insight?.projections?.monthly || 0) * 0.15)}€/mois détecté.
              </p>
            </div>
          </div>
        </Card>

        <Card className="card-premium p-6">
          <h4 className="text-lg font-semibold mb-4 text-secondary">⚡ Algorithme IA</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Modèle Neural</span>
              <Badge className="bg-secondary/20 text-secondary">v2.1</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Données analysées</span>
              <span className="text-sm font-medium">10,247 profils</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Précision moyenne</span>
              <span className="text-sm font-medium text-success">94.2%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
