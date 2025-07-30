import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Brain, Zap, Target, AlertTriangle } from 'lucide-react';

interface PredictiveAnalyticsProps {
  insight: any;
  financialData?: any;
  timeframe: string;
}

export const PredictiveAnalytics = ({ 
  insight, 
  financialData, 
  timeframe 
}: PredictiveAnalyticsProps) => {
  const [predictionModel, setPredictionModel] = useState('neural');
  const [confidence, setConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setConfidence(prev => prev < 94 ? prev + 2 : 94);
    }, 150);
    
    const analysisTimer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(analysisTimer);
    };
  }, []);

  const predictions = [
    {
      category: 'Épargne',
      currentTrend: 'Positive',
      prediction: '+15% dans 6 mois',
      confidence: 87,
      factors: ['Réduction automatique des dépenses', 'Augmentation des revenus prévue'],
      risk: 'low'
    },
    {
      category: 'Dépenses Variables',
      currentTrend: 'Stable',
      prediction: '+8% pic hivernal',
      confidence: 76,
      factors: ['Patterns saisonniers', 'Inflation énergétique'],
      risk: 'medium'
    },
    {
      category: 'Investissements',
      currentTrend: 'Croissance',
      prediction: '+22% potentiel 12 mois',
      confidence: 63,
      factors: ['Diversification recommandée', 'Marché favorable'],
      risk: 'medium'
    },
    {
      category: 'Liquidités',
      currentTrend: 'Excédentaire',
      prediction: 'Optimisation nécessaire',
      confidence: 91,
      factors: ['Inflation supérieure au rendement', 'Opportunités manquées'],
      risk: 'high'
    }
  ];

  const futureTrends = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    predicted: Math.random() * 1000 + 500,
    conservative: Math.random() * 800 + 400,
    optimistic: Math.random() * 1200 + 600,
    actual: i < 6 ? Math.random() * 900 + 450 : null
  }));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success border-success/30 bg-success/10';
      case 'medium': return 'text-warning border-warning/30 bg-warning/10';
      case 'high': return 'text-danger border-danger/30 bg-danger/10';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      {/* IA Analysis Header */}
      <Card className="card-premium border-primary/20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">🔮 Prédictions IA Avancées</h2>
              <p className="text-muted-foreground text-sm">
                Modèle neuronal basé sur 50,000+ profils similaires
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={predictionModel} onValueChange={setPredictionModel}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neural">Réseau neuronal</SelectItem>
                <SelectItem value="regression">Régression</SelectItem>
                <SelectItem value="ensemble">Ensemble</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={`${confidence > 80 ? 'bg-success/20 text-success border-success/30' : 'bg-warning/20 text-warning border-warning/30'}`}>
              Fiabilité: {confidence}%
            </Badge>
          </div>
        </div>

        {isAnalyzing && (
          <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 animate-pulse" />
              <span className="text-sm font-medium">Analyse prédictive en cours...</span>
            </div>
            <Progress value={confidence} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Corrélations détectées</span>
              <span>{confidence}% complété</span>
            </div>
          </div>
        )}
      </Card>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((pred, index) => (
          <Card key={index} className={`card-insight ${getRiskColor(pred.risk)}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRiskIcon(pred.risk)}</span>
                <div>
                  <h3 className="font-semibold text-primary">{pred.category}</h3>
                  <p className="text-sm text-muted-foreground">Tendance: {pred.currentTrend}</p>
                </div>
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {pred.confidence}%
              </Badge>
            </div>

            <div className="mb-4">
              <div className="text-lg font-bold text-secondary mb-2">
                {pred.prediction}
              </div>
              <Progress value={pred.confidence} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Facteurs clés:</div>
              {pred.factors.map((factor, factorIndex) => (
                <div key={factorIndex} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Trend Prediction Chart */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">📈 Évolution Prédictive 12 Mois</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={futureTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="optimistic" 
                stackId="1"
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success) / 0.1)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stackId="2"
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.2)"
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="conservative" 
                stackId="3"
                stroke="hsl(var(--warning))" 
                fill="hsl(var(--warning) / 0.1)"
                strokeWidth={2}
              />
              {futureTrends.filter(d => d.actual).length > 0 && (
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 4 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Scénario optimiste</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Prédiction principale</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-warning rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Scénario conservateur</div>
          </div>
        </div>
      </Card>

      {/* AI Recommendations Based on Predictions */}
      <Card className="card-emotional border-secondary/20">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-secondary" />
          <h3 className="text-lg font-semibold text-primary">🎯 Actions Recommandées par l'IA</h3>
        </div>
        
        <div className="space-y-4">
          <Alert className="border-success/20 bg-success/10">
            <Target className="w-4 h-4" />
            <AlertDescription>
              <strong>Opportunité détectée:</strong> Réallouer 2,500€ de liquidités vers un PEA diversifié pourrait générer +180€/an
            </AlertDescription>
          </Alert>
          
          <Alert className="border-warning/20 bg-warning/10">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong>Risque identifié:</strong> Pic de dépenses prévu en décembre. Préparer un budget supplémentaire de 340€
            </AlertDescription>
          </Alert>
          
          <Alert className="border-primary/20 bg-primary/10">
            <Brain className="w-4 h-4" />
            <AlertDescription>
              <strong>Pattern détecté:</strong> Vos dépenses diminuent de 12% quand votre humeur est au-dessus de 7/10
            </AlertDescription>
          </Alert>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="btn-hero">
            <Zap className="w-4 h-4 mr-2" />
            Appliquer les recommandations
          </Button>
          <Button variant="outline" className="btn-ghost-glow">
            <Brain className="w-4 h-4 mr-2" />
            Affiner le modèle
          </Button>
        </div>
      </Card>

      {/* Model Performance */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🏆 Performance du Modèle</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">94%</div>
            <div className="text-xs text-muted-foreground">Précision générale</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">87%</div>
            <div className="text-xs text-muted-foreground">Prédictions exactes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">12%</div>
            <div className="text-xs text-muted-foreground">Erreur moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">3.2k</div>
            <div className="text-xs text-muted-foreground">Profils analysés</div>
          </div>
        </div>
      </Card>
    </div>
  );
};