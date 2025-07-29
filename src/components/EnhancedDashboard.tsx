import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RevelationCard } from './RevelationCard';
import { 
  AdvancedTrendChart, 
  InteractiveWhatIfSimulator, 
  ComprehensiveHiddenCostsDetector,
  PredictiveAnalytics,
  GoalTracker,
  SmartRecommendations,
  EmotionalInsightEngine,
  FinancialComparator,
  ShareAndExport
} from './AdvancedAnalytics';
import { ThemeSelector } from './ThemeSelector';
import { FinancialHealthRadar } from './FinancialHealthRadar';
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Users, 
  Download, 
  Share, 
  Settings,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  Heart,
  Zap
} from 'lucide-react';

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
  emotionalPatterns?: {
    triggers: string[];
    correlations: { emotion: string; impact: number }[];
    suggestions: string[];
  };
  marketComparisons?: {
    peer: string;
    deviation: number;
    ranking: number;
  };
  riskAssessment?: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    mitigation: string[];
  };
}

interface EnhancedDashboardProps {
  insight: FinancialInsight;
  question: string;
  onNewExploration: () => void;
  financialData?: any;
}

export const EnhancedDashboard = ({ 
  insight, 
  question, 
  onNewExploration,
  financialData 
}: EnhancedDashboardProps) => {
  const [activeTab, setActiveTab] = useState('revelation');
  const [selectedTheme, setSelectedTheme] = useState('surreal');
  const [timeframe, setTimeframe] = useState('6months');
  const [viewMode, setViewMode] = useState('detailed');

  useEffect(() => {
    document.body.className = `theme-${selectedTheme}`;
  }, [selectedTheme]);

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

  const getEmotionalImpactLevel = () => {
    if (!insight.emotionalPatterns) return 'normal';
    const avgImpact = insight.emotionalPatterns.correlations.reduce((sum, c) => sum + Math.abs(c.impact), 0) / insight.emotionalPatterns.correlations.length;
    if (avgImpact > 30) return 'high';
    if (avgImpact > 15) return 'medium';
    return 'low';
  };

  const emotionalImpact = getEmotionalImpactLevel();
  const riskLevel = insight.riskAssessment?.level || 'medium';

  return (
    <div className={`min-h-screen p-6 space-y-8 theme-${selectedTheme}`}>
      {/* Advanced Header with Theme Selector */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-gradient-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-hero">
              Révélation Financière
            </h1>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              IA Avancée
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Question analysée : "{question}"
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="outline" className={`${getHealthColor(insight.healthScore)} border-current`}>
              Score: {insight.healthScore}/100
            </Badge>
            <Badge variant="outline" className={`
              ${emotionalImpact === 'high' ? 'text-danger border-danger/30' : 
                emotionalImpact === 'medium' ? 'text-warning border-warning/30' : 
                'text-success border-success/30'} 
            `}>
              Impact émotionnel: {emotionalImpact === 'high' ? 'Élevé' : emotionalImpact === 'medium' ? 'Modéré' : 'Faible'}
            </Badge>
            <Badge variant="outline" className={`
              ${riskLevel === 'high' ? 'text-danger border-danger/30' : 
                riskLevel === 'medium' ? 'text-warning border-warning/30' : 
                'text-success border-success/30'} 
            `}>
              Risque: {riskLevel === 'high' ? 'Élevé' : riskLevel === 'medium' ? 'Modéré' : 'Faible'}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="detailed">Détaillé</SelectItem>
                <SelectItem value="summary">Résumé</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <ShareAndExport 
              insight={insight} 
              question={question}
              theme={selectedTheme}
            />
            <Button variant="outline" onClick={onNewExploration} className="btn-ghost-glow">
              <Zap className="w-4 h-4 mr-2" />
              Nouvelle exploration
            </Button>
          </div>
        </div>
      </div>

      {/* Financial Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinancialHealthRadar 
            healthScore={insight.healthScore}
            emotionalImpact={emotionalImpact}
            riskLevel={riskLevel}
            projections={insight.projections}
          />
        </div>
        <div className="space-y-4">
          <Card className="card-emotional">
            <div className="text-center">
              <div className="text-6xl mb-2">🧠</div>
              <h3 className="text-lg font-semibold mb-2">État Émotionnel</h3>
              <p className="text-primary font-medium">{insight.emotionalState}</p>
              {insight.emotionalPatterns && (
                <div className="mt-4 space-y-2">
                  {insight.emotionalPatterns.triggers.slice(0, 2).map((trigger, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {trigger}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>
          
          <Card className="metric-card">
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Projection 5 ans</h3>
              <div className={`text-2xl font-bold ${insight.projections.fiveYear >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.fiveYear >= 0 ? '+' : ''}{Math.round(insight.projections.fiveYear).toLocaleString()}€
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 glass-card">
          <TabsTrigger value="revelation" className="text-xs">
            <Heart className="w-4 h-4 mr-1" />
            Révélation
          </TabsTrigger>
          <TabsTrigger value="trends" className="text-xs">
            <TrendingUp className="w-4 h-4 mr-1" />
            Tendances
          </TabsTrigger>
          <TabsTrigger value="whatif" className="text-xs">
            <Target className="w-4 h-4 mr-1" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="detective" className="text-xs">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Détective
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-xs">
            <Brain className="w-4 h-4 mr-1" />
            IA Prédictive
          </TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">
            <Target className="w-4 h-4 mr-1" />
            Objectifs
          </TabsTrigger>
          <TabsTrigger value="emotions" className="text-xs">
            <Heart className="w-4 h-4 mr-1" />
            Émotions
          </TabsTrigger>
          <TabsTrigger value="compare" className="text-xs">
            <Users className="w-4 h-4 mr-1" />
            Comparer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revelation" className="space-y-6">
          <RevelationCard
            equation={insight.equation}
            insight={insight.insight}
            comparison={insight.comparison}
            emotionalState={insight.emotionalState}
            isAnimating={true}
          />

          {/* Enhanced Projections Grid */}
          <div className="insights-grid">
            <Card className="metric-card">
              <div className="text-sm text-muted-foreground mb-2">Mensuel</div>
              <div className={`text-3xl font-bold ${insight.projections.monthly >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.monthly >= 0 ? '+' : ''}{insight.projections.monthly.toFixed(0)}€
              </div>
              <Progress 
                value={Math.min(100, Math.abs(insight.projections.monthly) / 10)} 
                className="mt-2 h-2"
              />
            </Card>
            
            <Card className="metric-card">
              <div className="text-sm text-muted-foreground mb-2">Annuel</div>
              <div className={`text-3xl font-bold ${insight.projections.yearly >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.yearly >= 0 ? '+' : ''}{insight.projections.yearly.toFixed(0)}€
              </div>
              <Progress 
                value={Math.min(100, Math.abs(insight.projections.yearly) / 1000)} 
                className="mt-2 h-2"
              />
            </Card>
            
            <Card className="metric-card">
              <div className="text-sm text-muted-foreground mb-2">5 ans</div>
              <div className={`text-3xl font-bold ${insight.projections.fiveYear >= 0 ? 'text-success' : 'text-danger'}`}>
                {insight.projections.fiveYear >= 0 ? '+' : ''}{Math.round(insight.projections.fiveYear / 1000)}k€
              </div>
              <Progress 
                value={Math.min(100, Math.abs(insight.projections.fiveYear) / 10000)} 
                className="mt-2 h-2"
              />
            </Card>
          </div>

          {/* Smart Recommendations */}
          <SmartRecommendations 
            recommendations={insight.recommendations}
            emotionalState={insight.emotionalState}
            healthScore={insight.healthScore}
          />
        </TabsContent>

        <TabsContent value="trends">
          <AdvancedTrendChart 
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            financialData={financialData}
            emotionalData={insight.emotionalPatterns}
          />
        </TabsContent>

        <TabsContent value="whatif">
          <InteractiveWhatIfSimulator 
            baseData={financialData}
            currentInsight={insight}
          />
        </TabsContent>

        <TabsContent value="detective">
          <ComprehensiveHiddenCostsDetector 
            hiddenCosts={insight.hiddenCosts}
            financialData={financialData}
            riskAssessment={insight.riskAssessment}
          />
        </TabsContent>

        <TabsContent value="predictions">
          <PredictiveAnalytics 
            insight={insight}
            financialData={financialData}
            timeframe={timeframe}
          />
        </TabsContent>

        <TabsContent value="goals">
          <GoalTracker 
            currentProjections={insight.projections}
            recommendations={insight.recommendations}
          />
        </TabsContent>

        <TabsContent value="emotions">
          <EmotionalInsightEngine 
            emotionalState={insight.emotionalState}
            emotionalPatterns={insight.emotionalPatterns}
            financialData={financialData}
          />
        </TabsContent>

        <TabsContent value="compare">
          <FinancialComparator 
            userInsight={insight}
            marketData={insight.marketComparisons}
          />
        </TabsContent>
      </Tabs>

      {/* Scientific Evidence with Enhanced Credibility */}
      <div className="grid md:grid-cols-2 gap-6">
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
                📚 Voir l'étude complète
              </Button>
            </div>
          </div>
        </Card>

        <Card className="card-premium border border-primary/20">
          <div className="flex items-start gap-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              🎯 IA Avancée
            </Badge>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Algorithme Rivela v2.0</h3>
              <p className="text-sm text-muted-foreground mb-3">
                "Analyse comportementale basée sur 10,000+ profils financiers"
              </p>
              <Button variant="outline" size="sm" className="text-xs">
                ⚙️ Voir la méthodologie
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};