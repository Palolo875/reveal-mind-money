import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Share2, Mail, Twitter, Facebook, Linkedin, FileText, Image as ImageIcon } from 'lucide-react';

// Types
import type { FinancialData, FinancialItem, ChartDataPoint } from '@/types';

// Advanced Trend Chart Component
export const AdvancedTrendChart = ({ 
  timeframe, 
  onTimeframeChange, 
  financialData,
  emotionalData 
}: {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  financialData?: FinancialData;
  emotionalData?: ChartDataPoint[];
}) => {
  const [selectedMetric, setSelectedMetric] = useState('balance');

  const mockTrendData = useMemo(() => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return months.slice(0, timeframe === '3months' ? 3 : timeframe === '6months' ? 6 : 12).map((month, index) => ({
      month,
      balance: Math.random() * 400 - 200,
      mood: Math.floor(Math.random() * 10) + 1,
      expenses: Math.random() * 1000 + 500,
      income: Math.random() * 1500 + 1000,
      savings: Math.random() * 300,
    }));
  }, [timeframe]);

  const correlationData = useMemo(() => {
    return mockTrendData.map(item => ({
      mood: item.mood,
      expenses: item.expenses,
      correlation: (item.mood / 10) * (item.expenses / 1000) * 100
    }));
  }, [mockTrendData]);

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary">📈 Analyse Prédictive des Tendances</h2>
          <div className="flex gap-2">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance">Balance</SelectItem>
                <SelectItem value="expenses">Dépenses</SelectItem>
                <SelectItem value="income">Revenus</SelectItem>
                <SelectItem value="savings">Épargne</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              {['3months', '6months', '1year'].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTimeframeChange(period)}
                  className={timeframe === period ? "btn-hero" : "btn-ghost-glow"}
                >
                  {period === '3months' ? '3M' : period === '6months' ? '6M' : '1A'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrendData}>
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
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Alert className="mt-4 border-info/20 bg-info/10">
          <AlertDescription>
            💡 <strong>Insight AI :</strong> Vos dépenses augmentent de 15% les vendredis soirs. 
            Considérez un budget "weekend" automatique.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Emotional Correlation Analysis */}
      <Card className="card-emotional">
        <h3 className="text-lg font-semibold text-primary mb-4">🧠 Corrélation Émotions-Finances</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mood" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="correlation" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

// Interactive What-If Simulator
export const InteractiveWhatIfSimulator = ({ 
  baseData, 
  currentInsight 
}: {
  baseData?: FinancialData;
  currentInsight?: string;
}) => {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Augmentation salaire +10%', category: 'income', impact: 320, active: false, probability: 75 },
    { id: 2, name: 'Réduction abonnements -20%', category: 'expense', impact: 65, active: false, probability: 90 },
    { id: 3, name: 'Investissement immobilier', category: 'investment', impact: -150, active: false, probability: 60 },
    { id: 4, name: 'Freelance weekend', category: 'income', impact: 400, active: false, probability: 50 },
  ]);

  const [customScenario, setCustomScenario] = useState({ 
    name: '', 
    amount: 0, 
    category: 'income',
    probability: 70 
  });

  const toggleScenario = (id: number) => {
    setScenarios(prev => 
      prev.map(s => s.id === id ? { ...s, active: !s.active } : s)
    );
  };

  const totalImpact = scenarios
    .filter(s => s.active)
    .reduce((sum, s) => sum + s.impact, 0);

  const weightedImpact = scenarios
    .filter(s => s.active)
    .reduce((sum, s) => sum + (s.impact * s.probability / 100), 0);

  const addCustomScenario = () => {
    if (customScenario.name && customScenario.amount) {
      const newScenario = {
        id: Date.now(),
        name: customScenario.name,
        category: customScenario.category,
        impact: customScenario.amount,
        active: false,
        probability: customScenario.probability
      };
      setScenarios([...scenarios, newScenario]);
      setCustomScenario({ name: '', amount: 0, category: 'income', probability: 70 });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'income': return 'border-success/30 bg-success/10';
      case 'expense': return 'border-danger/30 bg-danger/10';
      case 'investment': return 'border-primary/30 bg-primary/10';
      default: return 'border-muted/30 bg-muted/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'income': return '💰';
      case 'expense': return '💸';
      case 'investment': return '📈';
      default: return '🎯';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <h2 className="text-xl font-semibold text-primary mb-6">🎯 Simulateur Avancé "Et si ?"</h2>
        
        <div className="grid gap-4">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover-lift ${
                scenario.active 
                  ? `bg-primary/10 border-primary/30` 
                  : `${getCategoryColor(scenario.category)} border-border/30`
              }`}
              onClick={() => toggleScenario(scenario.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(scenario.category)}</span>
                  <div>
                    <span className={scenario.active ? 'text-primary font-medium' : ''}>
                      {scenario.name}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Probabilité: {scenario.probability}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`font-bold ${scenario.impact > 0 ? 'text-success' : 'text-danger'}`}>
                      {scenario.impact > 0 ? '+' : ''}{scenario.impact}€
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pondéré: {Math.round(scenario.impact * scenario.probability / 100)}€
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    scenario.active 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-muted-foreground'
                  }`}>
                    {scenario.active && '✓'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/50">
          <h3 className="font-medium mb-4">🛠️ Créer un scénario personnalisé</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              placeholder="Nom du scénario"
              value={customScenario.name}
              onChange={(e) => setCustomScenario(prev => ({ ...prev, name: e.target.value }))}
              className="input-premium"
            />
            <Input
              type="number"
              placeholder="Impact (€/mois)"
              value={customScenario.amount || ''}
              onChange={(e) => setCustomScenario(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              className="input-premium"
            />
            <Select 
              value={customScenario.category} 
              onValueChange={(value) => setCustomScenario(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="input-premium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Revenus</SelectItem>
                <SelectItem value="expense">Dépenses</SelectItem>
                <SelectItem value="investment">Investissement</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addCustomScenario} className="btn-hero">
              Ajouter
            </Button>
          </div>
          <div className="mt-3">
            <label className="text-sm text-muted-foreground">
              Probabilité: {customScenario.probability}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={customScenario.probability}
              onChange={(e) => setCustomScenario(prev => ({ ...prev, probability: parseInt(e.target.value) }))}
              className="w-full mt-2"
            />
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Impact Optimal</div>
              <div className={`text-3xl font-bold ${totalImpact >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalImpact >= 0 ? '+' : ''}{totalImpact}€/mois
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Soit {Math.abs(totalImpact * 12)}€ sur 12 mois
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-r from-secondary/10 to-success/10 rounded-lg border border-secondary/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Impact Probable</div>
              <div className={`text-3xl font-bold ${weightedImpact >= 0 ? 'text-success' : 'text-danger'}`}>
                {weightedImpact >= 0 ? '+' : ''}{Math.round(weightedImpact)}€/mois
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Basé sur les probabilités
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Comprehensive Hidden Costs Detector
export const ComprehensiveHiddenCostsDetector = ({ 
  hiddenCosts, 
  financialData,
  riskAssessment 
}: {
  hiddenCosts: string[];
  financialData?: any;
  riskAssessment?: any;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate scanning animation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress(prev => prev < 100 ? prev + 2 : 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const detectedIssues = [
    {
      category: "Abonnements Oubliés",
      severity: "high" as const,
      items: [
        { name: "Netflix Premium", cost: 17.99, usage: "3h/mois", recommendation: "Passer au plan Standard" },
        { name: "Salle de sport", cost: 45, usage: "2 visites/mois", recommendation: "Cours en ligne ou parc" },
        { name: "Spotify Premium Duo", cost: 12.99, usage: "Doublons détectés", recommendation: "Plan familial" }
      ],
      totalSavings: 35,
      autoFixAvailable: true
    },
    {
      category: "Frais Bancaires Récurrents",
      severity: "medium" as const,
      items: [
        { name: "Virements SEPA", cost: 0.8, usage: "15/mois", recommendation: "Banque en ligne" },
        { name: "Tenue de compte", cost: 4.5, usage: "Fixe", recommendation: "Négocier" },
        { name: "Assurance carte", cost: 8, usage: "Rarement utilisée", recommendation: "Résilier" }
      ],
      totalSavings: 13.3,
      autoFixAvailable: false
    },
    {
      category: "Coûts d'Opportunité",
      severity: "high" as const,
      items: [
        { name: "Livret A sous-performant", cost: 45, usage: "12000€ à 3%", recommendation: "PEL ou assurance-vie" },
        { name: "Liquidités excédentaires", cost: 120, usage: "5000€ non investis", recommendation: "ETF diversifiés" },
        { name: "Épargne non optimisée", cost: 80, usage: "Inflation non couverte", recommendation: "SCPI ou actions" }
      ],
      totalSavings: 245,
      autoFixAvailable: false
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '💡';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary">🕵️ Détective Financier IA</h2>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Scan en cours...
          </Badge>
        </div>

        {/* Scanning Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Analyse des patterns cachés</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-3" />
        </div>
        
        {hiddenCosts.length > 0 && (
          <Alert className="mb-6 border-warning/20 bg-warning/10">
            <AlertDescription>
              ⚠️ <strong>{hiddenCosts.length} alertes détectées</strong> dans votre profil financier
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {detectedIssues.map((issue, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all hover-lift ${
                selectedCategory === issue.category ? 'ring-2 ring-primary/30' : ''
              }`}
              onClick={() => setSelectedCategory(selectedCategory === issue.category ? null : issue.category)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getSeverityIcon(issue.severity)}</span>
                    <div>
                      <h3 className="font-medium text-primary">{issue.category}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getSeverityColor(issue.severity)}`} variant="outline">
                          {issue.severity === 'high' ? 'Critique' : issue.severity === 'medium' ? 'Modéré' : 'Faible'}
                        </Badge>
                        {issue.autoFixAvailable && (
                          <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                            Auto-fix
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-success">-{issue.totalSavings}€</div>
                    <div className="text-xs text-muted-foreground">par mois</div>
                  </div>
                </div>

                {selectedCategory === issue.category && (
                  <div className="mt-4 space-y-3 border-t border-border/30 pt-4">
                    {issue.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-muted/20 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.usage}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-danger">-{item.cost}€</div>
                          </div>
                        </div>
                        <div className="text-sm text-success bg-success/10 p-2 rounded">
                          💡 {item.recommendation}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="text-xs flex-1">
                            Analyser
                          </Button>
                          {issue.autoFixAvailable && (
                            <Button size="sm" className="text-xs btn-hero flex-1">
                              Optimiser Auto
                            </Button>
                          )}
                        </div>
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
            <div className="text-sm text-muted-foreground mb-2">💰 Potentiel d'optimisation total</div>
            <div className="text-4xl font-bold text-success mb-2">
              -{detectedIssues.reduce((sum, issue) => sum + issue.totalSavings, 0)}€/mois
            </div>
            <div className="text-lg text-muted-foreground">
              Soit {(detectedIssues.reduce((sum, issue) => sum + issue.totalSavings, 0) * 12).toLocaleString()}€ récupérés annuellement
            </div>
            <Button className="mt-4 btn-hero">
              🚀 Lancer l'optimisation automatique
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Import the actual components
export { PredictiveAnalytics } from './PredictiveAnalytics';
export { GoalTracker } from './GoalTracker';
export { EmotionalInsightEngine } from './EmotionalInsightEngine';

export const SmartRecommendations = ({ 
  recommendations, 
  emotionalState, 
  healthScore 
}: {
  recommendations: string[];
  emotionalState: string;
  healthScore: number;
}) => (
  <Card className="card-premium">
    <h3 className="text-lg font-semibold text-primary mb-4">💡 Recommandations IA</h3>
    <div className="space-y-3">
      {recommendations?.map((rec: string, index: number) => (
        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <div className="text-secondary font-bold">{index + 1}.</div>
          <p className="text-sm">{rec}</p>
        </div>
      ))}
    </div>
  </Card>
);

export { FinancialComparator } from './FinancialComparator';

export const ShareAndExport = ({ 
  insight, 
  question, 
  theme 
}: {
  insight: string;
  question: string;
  theme: string;
}) => {
  const handleExportPDF = () => {
    console.log('Export PDF functionality to be implemented');
  };

  const handleShare = (platform: string) => {
    console.log(`Share to ${platform} functionality to be implemented`);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleExportPDF} className="btn-ghost-glow">
        <Download className="w-4 h-4 mr-2" />
        PDF
      </Button>
      <Button variant="outline" onClick={() => handleShare('twitter')} className="btn-ghost-glow">
        <Share2 className="w-4 h-4 mr-2" />
        Partager
      </Button>
    </div>
  );
};