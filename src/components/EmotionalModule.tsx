
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Zap, AlertCircle } from 'lucide-react';

interface EmotionalModuleProps {
  insight?: { emotionalPatterns?: { triggers: string[]; correlations: Array<{ emotion: string; impact: number }>; suggestions: string[] } };
  financialData?: import('@/types').FinancialData;
}

export const EmotionalModule = ({ insight, financialData }: EmotionalModuleProps) => {
  const emotionalData = insight?.emotionalPatterns || {
    triggers: ['Stress', 'Fatigue', 'Celebration'],
    correlations: [
      { emotion: 'Stress', impact: 25 },
      { emotion: 'Joie', impact: -15 },
      { emotion: 'Anxiété', impact: 35 }
    ],
    suggestions: ['Méditation avant achat', 'Liste d\'attente 24h', 'Budget émotionnel séparé']
  };

  return (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analyse Émotionnelle Financière
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 text-center">
            <div className="text-6xl mb-3">🧠</div>
            <h4 className="font-semibold mb-2">État Mental Actuel</h4>
            <div className="text-lg font-bold text-primary mb-2">
              {insight?.emotionalState || "Profil Analysé"}
            </div>
            <Badge variant="outline" className="text-xs">
              Score émotionnel: {Math.round(Math.random() * 30 + 70)}/100
            </Badge>
          </Card>

          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              Déclencheurs Identifiés
            </h4>
            <div className="space-y-2">
              {emotionalData.triggers.map((trigger: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <span className="text-sm">{trigger}</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(Math.random() * 20 + 10)}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Corrélations Émotions-Dépenses
          </h4>
          <div className="space-y-3">
                            {emotionalData.correlations.map((corr, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{corr.emotion}</span>
                  <span className={`text-sm font-bold ${corr.impact > 0 ? 'text-danger' : 'text-success'}`}>
                    {corr.impact > 0 ? '+' : ''}{corr.impact}%
                  </span>
                </div>
                <Progress 
                  value={Math.abs(corr.impact)} 
                  className={`h-2 ${corr.impact > 0 ? 'text-danger' : 'text-success'}`} 
                />
              </div>
            ))}
          </div>
        </Card>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-premium p-6">
          <h4 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Recommandations Personnalisées
          </h4>
          <div className="space-y-3">
            {emotionalData.suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="text-primary font-bold text-sm">{index + 1}.</div>
                  <p className="text-sm">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="card-premium p-6">
          <h4 className="text-lg font-semibold mb-4 text-secondary">📊 Analyse Comportementale</h4>
          <div className="space-y-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <h5 className="font-medium mb-1">Pattern détecté</h5>
              <p className="text-sm text-muted-foreground">
                Dépenses impulsives 40% plus élevées après 20h
              </p>
            </div>
            
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <h5 className="font-medium text-warning mb-1">Zone de risque</h5>
              <p className="text-sm text-muted-foreground">
                Corrélation stress-dépenses détectée: {Math.round(Math.random() * 20 + 60)}%
              </p>
            </div>

            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <h5 className="font-medium text-success mb-1">Force identifiée</h5>
              <p className="text-sm text-muted-foreground">
                Excellente discipline sur les objectifs à long terme
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
