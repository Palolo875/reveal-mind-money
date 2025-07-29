import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FinancialHealthRadarProps {
  healthScore: number;
  emotionalImpact: string;
  riskLevel: string;
  projections: {
    monthly: number;
    yearly: number;
    fiveYear: number;
  };
}

export const FinancialHealthRadar = ({ 
  healthScore, 
  emotionalImpact, 
  riskLevel, 
  projections 
}: FinancialHealthRadarProps) => {
  const radarData = useMemo(() => {
    const emotionalScore = emotionalImpact === 'high' ? 30 : emotionalImpact === 'medium' ? 60 : 85;
    const riskScore = riskLevel === 'high' ? 25 : riskLevel === 'medium' ? 60 : 90;
    const stabilityScore = projections.monthly >= 0 ? 
      Math.min(90, 50 + (projections.monthly / 10)) : 
      Math.max(10, 50 + (projections.monthly / 10));
    const growthScore = projections.fiveYear > projections.yearly * 3 ? 85 : 
                      projections.fiveYear > 0 ? 65 : 35;

    return [
      { metric: 'Santé Globale', score: healthScore, color: 'hsl(var(--primary))', icon: '💚' },
      { metric: 'Stabilité Émotionnelle', score: emotionalScore, color: 'hsl(var(--secondary))', icon: '🧠' },
      { metric: 'Gestion des Risques', score: riskScore, color: 'hsl(var(--warning))', icon: '⚡' },
      { metric: 'Stabilité Financière', score: stabilityScore, color: 'hsl(var(--success))', icon: '📊' },
      { metric: 'Potentiel de Croissance', score: growthScore, color: 'hsl(var(--tertiary))', icon: '🚀' }
    ];
  }, [healthScore, emotionalImpact, riskLevel, projections]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    if (score >= 40) return 'Moyen';
    return 'Critique';
  };

  const averageScore = radarData.reduce((sum, item) => sum + item.score, 0) / radarData.length;

  return (
    <Card className="card-premium">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary">
          📊 Radar de Santé Financière
        </h2>
        <Badge className={`${getScoreColor(averageScore)} border-current`} variant="outline">
          {getScoreLabel(averageScore)}
        </Badge>
      </div>

      {/* Radar Visual Representation */}
      <div className="relative mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {radarData.map((item, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="text-3xl">{item.icon}</div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {item.metric}
                </div>
                <div className="relative">
                  <Progress 
                    value={item.score} 
                    className="h-3"
                    style={{ 
                      background: 'hsl(var(--muted))',
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${item.score}%`,
                      background: item.color
                    }}
                  />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                  {item.score}/100
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border border-primary/20">
          <div className="text-sm text-muted-foreground mb-1">Score Moyen</div>
          <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
            {Math.round(averageScore)}/100
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-secondary/10 to-transparent p-4 rounded-lg border border-secondary/20">
          <div className="text-sm text-muted-foreground mb-1">Point Fort</div>
          <div className="text-secondary font-medium">
            {radarData.reduce((max, item) => item.score > max.score ? item : max).metric}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-warning/10 to-transparent p-4 rounded-lg border border-warning/20">
          <div className="text-sm text-muted-foreground mb-1">À Améliorer</div>
          <div className="text-warning font-medium">
            {radarData.reduce((min, item) => item.score < min.score ? item : min).metric}
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="mt-6 p-4 bg-muted/20 rounded-lg">
        <h3 className="font-medium mb-3 text-primary">💡 Recommandations Ciblées</h3>
        <div className="space-y-2 text-sm">
          {averageScore < 60 && (
            <div className="flex items-start gap-2">
              <span className="text-warning">⚠️</span>
              <span>Votre santé financière nécessite une attention immédiate. Concentrez-vous sur la stabilisation de vos dépenses.</span>
            </div>
          )}
          {radarData.find(item => item.metric === 'Stabilité Émotionnelle')?.score < 50 && (
            <div className="flex items-start gap-2">
              <span className="text-info">🧠</span>
              <span>Vos émotions influencent significativement vos finances. Considérez des techniques de gestion du stress.</span>
            </div>
          )}
          {radarData.find(item => item.metric === 'Potentiel de Croissance')?.score > 80 && (
            <div className="flex items-start gap-2">
              <span className="text-success">🚀</span>
              <span>Excellent potentiel de croissance ! C'est le moment d'investir dans vos objectifs long terme.</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};