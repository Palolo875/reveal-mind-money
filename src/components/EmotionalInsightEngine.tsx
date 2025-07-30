import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Heart, Brain, TrendingUp, AlertTriangle, Lightbulb, Calendar, Target } from 'lucide-react';

interface EmotionalPattern {
  emotion: string;
  impact: number;
  frequency: number;
  triggers: string[];
  financialCorrelation: number;
}

interface EmotionalInsightEngineProps {
  emotionalState: string;
  emotionalPatterns?: {
    triggers: string[];
    correlations: { emotion: string; impact: number }[];
    suggestions: string[];
  };
  financialData?: any;
}

export const EmotionalInsightEngine = ({ 
  emotionalState, 
  emotionalPatterns,
  financialData 
}: EmotionalInsightEngineProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [moodJournal, setMoodJournal] = useState('');
  const [analysisMode, setAnalysisMode] = useState('overview');
  const [aiAnalysisProgress, setAiAnalysisProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAiAnalysisProgress(prev => prev < 88 ? prev + 2 : 88);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const emotionalProfiles = [
    {
      emotion: 'Stress',
      level: 75,
      trend: 'increasing',
      financialImpact: 340,
      triggers: ['Factures inattendues', 'Découvert bancaire', 'Dépenses impulsives'],
      color: '#ef4444',
      recommendations: [
        'Mettre en place un fonds d\'urgence de 500€',
        'Utiliser l\'app de méditation 10min/jour',
        'Programmer les virements automatiques'
      ]
    },
    {
      emotion: 'Optimisme',
      level: 62,
      trend: 'stable',
      financialImpact: -180,
      triggers: ['Augmentation de salaire', 'Investissements positifs', 'Épargne qui grandit'],
      color: '#22c55e',
      recommendations: [
        'Profiter de cette période pour investir',
        'Augmenter légèrement l\'épargne',
        'Planifier des objectifs ambitieux'
      ]
    },
    {
      emotion: 'Anxiété',
      level: 45,
      trend: 'decreasing',
      financialImpact: 220,
      triggers: ['Marchés volatils', 'Dépenses de santé', 'Incertitude emploi'],
      color: '#f59e0b',
      recommendations: [
        'Diversifier les investissements',
        'Souscrire une assurance complémentaire',
        'Développer une source de revenus alternative'
      ]
    },
    {
      emotion: 'Confiance',
      level: 78,
      trend: 'increasing',
      financialImpact: -95,
      triggers: ['Budget respecté', 'Objectifs atteints', 'Contrôle financier'],
      color: '#3b82f6',
      recommendations: [
        'Maintenir les habitudes actuelles',
        'Envisager des investissements plus risqués',
        'Partager vos stratégies avec d\'autres'
      ]
    }
  ];

  const moodSpendingCorrelation = [
    { mood: 'Très stressé', spending: 1250, date: '2024-01-01' },
    { mood: 'Stressé', spending: 980, date: '2024-01-02' },
    { mood: 'Neutre', spending: 750, date: '2024-01-03' },
    { mood: 'Optimiste', spending: 650, date: '2024-01-04' },
    { mood: 'Très optimiste', spending: 520, date: '2024-01-05' },
    { mood: 'Confiant', spending: 480, date: '2024-01-06' },
    { mood: 'Anxieux', spending: 1100, date: '2024-01-07' }
  ];

  const emotionalRadarData = emotionalProfiles.map(profile => ({
    emotion: profile.emotion,
    niveau: profile.level,
    impact: Math.abs(profile.financialImpact) / 10,
    controle: 100 - profile.level
  }));

  const getEmotionColor = (emotion: string) => {
    const profile = emotionalProfiles.find(p => p.emotion === emotion);
    return profile?.color || '#6b7280';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getImpactLevel = (impact: number) => {
    const absImpact = Math.abs(impact);
    if (absImpact > 300) return 'high';
    if (absImpact > 150) return 'medium';
    return 'low';
  };

  const getImpactColor = (impact: number) => {
    const level = getImpactLevel(impact);
    switch (level) {
      case 'high': return impact > 0 ? 'text-danger' : 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
    }
  };

  const saveMoodEntry = () => {
    if (moodJournal.trim()) {
      // Here you would typically save to a backend
      console.log('Mood entry saved:', moodJournal);
      setMoodJournal('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Analysis */}
      <Card className="card-emotional border-secondary/20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-emotional flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">🧠 Moteur d'Insights Émotionnels</h2>
              <p className="text-muted-foreground text-sm">
                IA comportementale - État actuel: {emotionalState}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={analysisMode} onValueChange={setAnalysisMode}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Vue d'ensemble</SelectItem>
                <SelectItem value="detailed">Analyse détaillée</SelectItem>
                <SelectItem value="predictions">Prédictions</SelectItem>
              </SelectContent>
            </Select>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              Analyse: {aiAnalysisProgress}%
            </Badge>
          </div>
        </div>

        <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium">Analyse comportementale en temps réel</span>
          </div>
          <Progress value={aiAnalysisProgress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Patterns émotionnels détectés</span>
            <span>Corrélations financières calculées</span>
          </div>
        </div>
      </Card>

      {/* Emotional Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {emotionalProfiles.map((profile, index) => (
          <Card key={index} className="card-insight border-l-4" style={{ borderLeftColor: profile.color }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: profile.color }}
                >
                  {profile.emotion[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{profile.emotion}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">Tendance</span>
                    <span className="text-sm">{getTrendIcon(profile.trend)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: profile.color }}>
                  {profile.level}%
                </div>
                <div className={`text-sm font-medium ${getImpactColor(profile.financialImpact)}`}>
                  {profile.financialImpact > 0 ? '+' : ''}{profile.financialImpact}€
                </div>
              </div>
            </div>

            <Progress value={profile.level} className="h-2 mb-4" />

            <div className="space-y-2 mb-4">
              <div className="text-sm font-medium text-muted-foreground">Déclencheurs principaux:</div>
              {profile.triggers.slice(0, 2).map((trigger, triggerIndex) => (
                <div key={triggerIndex} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: profile.color }} />
                  <span>{trigger}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full btn-ghost-glow"
              onClick={() => setSelectedEmotion(profile.emotion)}
            >
              Voir recommandations
            </Button>
          </Card>
        ))}
      </div>

      {/* Emotional Radar Chart */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🎯 Profil Émotionnel Radar</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={emotionalRadarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="emotion" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tickCount={5} />
              <Radar 
                name="Niveau" 
                dataKey="niveau" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.3)" 
                strokeWidth={2}
              />
              <Radar 
                name="Impact" 
                dataKey="impact" 
                stroke="hsl(var(--secondary))" 
                fill="hsl(var(--secondary) / 0.2)" 
                strokeWidth={2}
              />
              <Radar 
                name="Contrôle" 
                dataKey="controle" 
                stroke="hsl(var(--success))" 
                fill="hsl(var(--success) / 0.1)" 
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Niveau émotionnel</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-secondary rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Impact financier</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Niveau de contrôle</div>
          </div>
        </div>
      </Card>

      {/* Mood-Spending Correlation */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">📊 Corrélation Humeur-Dépenses</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodSpendingCorrelation}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mood" angle={-45} textAnchor="end" height={80} className="text-xs" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}€`, 'Dépenses']}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Alert className="mt-4 border-info/20 bg-info/10">
          <AlertDescription>
            💡 <strong>Pattern détecté:</strong> Vos dépenses augmentent de 85% quand vous êtes stressé. 
            Les techniques de gestion du stress pourraient vous faire économiser 300€/mois.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Detailed Emotion Analysis */}
      {selectedEmotion && (
        <Card className="card-emotional border-secondary/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">
              🔍 Analyse Détaillée: {selectedEmotion}
            </h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedEmotion('')}>
              Fermer
            </Button>
          </div>
          
          {(() => {
            const profile = emotionalProfiles.find(p => p.emotion === selectedEmotion);
            if (!profile) return null;
            
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded">
                    <div className="text-2xl font-bold" style={{ color: profile.color }}>
                      {profile.level}%
                    </div>
                    <div className="text-xs text-muted-foreground">Intensité actuelle</div>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded">
                    <div className={`text-2xl font-bold ${getImpactColor(profile.financialImpact)}`}>
                      {profile.financialImpact > 0 ? '+' : ''}{profile.financialImpact}€
                    </div>
                    <div className="text-xs text-muted-foreground">Impact mensuel</div>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded">
                    <div className="text-2xl font-bold text-primary">
                      {profile.recommendations.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Recommandations</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-3">
                    🎯 Recommandations personnalisées:
                  </div>
                  <div className="space-y-2">
                    {profile.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="text-secondary font-bold">{index + 1}.</div>
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* Mood Journal */}
      <Card className="card-premium">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary" />
          <h3 className="text-lg font-semibold text-primary">📝 Journal Émotionnel</h3>
        </div>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Comment vous sentez-vous aujourd'hui ? Décrivez votre état émotionnel et ce qui l'influence..."
            value={moodJournal}
            onChange={(e) => setMoodJournal(e.target.value)}
            className="min-h-20 input-premium"
          />
          
          <div className="flex gap-2">
            <Button onClick={saveMoodEntry} className="btn-hero">
              <Heart className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
            <Button variant="outline" className="btn-ghost-glow">
              <Lightbulb className="w-4 h-4 mr-2" />
              Analyse IA
            </Button>
          </div>
        </div>

        <Alert className="mt-4 border-primary/20 bg-primary/10">
          <Lightbulb className="w-4 h-4" />
          <AlertDescription>
            <strong>Conseil IA:</strong> Tenir un journal émotionnel quotidien améliore la conscience financière de 34% selon les études comportementales.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Emotional Triggers & Solutions */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">⚡ Déclencheurs & Solutions</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-danger">🚨 Déclencheurs financiers détectés:</h4>
            <div className="space-y-2">
              {['Notifications bancaires négatives', 'Comparaisons sociales', 'Achats impulsifs online', 'Stress professionnel'].map((trigger, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-danger/10 rounded">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  <span className="text-sm">{trigger}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-success">✅ Solutions recommandées:</h4>
            <div className="space-y-2">
              {['Notifications budgétaires positives', 'Objectifs d\'épargne gamifiés', 'Délai réflexion 24h', 'Méditation 5min/jour'].map((solution, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-success/10 rounded">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-sm">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};