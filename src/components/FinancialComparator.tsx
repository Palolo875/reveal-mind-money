import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, Award, Target, Info, Crown, Medal, Star } from 'lucide-react';

interface FinancialComparatorProps {
  userInsight: any;
  marketData?: any;
}

export const FinancialComparator = ({ 
  userInsight, 
  marketData 
}: FinancialComparatorProps) => {
  const [comparisonType, setComparisonType] = useState('peers');
  const [ageRange, setAgeRange] = useState('25-35');
  const [region, setRegion] = useState('france');

  // Mock comparison data
  const peerComparisons = {
    savings: {
      user: 15000,
      peers: 12500,
      percentile: 78,
      rank: '22ème sur 100'
    },
    expenses: {
      user: 2300,
      peers: 2650,
      percentile: 65,
      rank: '35ème sur 100'
    },
    investments: {
      user: 8500,
      peers: 6200,
      percentile: 84,
      rank: '16ème sur 100'
    },
    debts: {
      user: 3200,
      peers: 4800,
      percentile: 72,
      rank: '28ème sur 100'
    }
  };

  const demographicComparisons = [
    {
      category: 'Épargne',
      user: 15000,
      peers_25_30: 8500,
      peers_30_35: 18500,
      peers_35_40: 28000,
      national_avg: 12500
    },
    {
      category: 'Investissements',
      user: 8500,
      peers_25_30: 3200,
      peers_30_35: 12000,
      peers_35_40: 22000,
      national_avg: 6200
    },
    {
      category: 'Dettes',
      user: 3200,
      peers_25_30: 8500,
      peers_30_35: 6200,
      peers_35_40: 4800,
      national_avg: 4800
    }
  ];

  const behaviorComparison = [
    {
      behavior: 'Budget mensuel',
      user: 95,
      peers: 67,
      best_practice: 90
    },
    {
      behavior: 'Épargne automatique',
      user: 85,
      peers: 45,
      best_practice: 80
    },
    {
      behavior: 'Diversification investissements',
      user: 70,
      peers: 38,
      best_practice: 85
    },
    {
      behavior: 'Suivi des dépenses',
      user: 90,
      peers: 52,
      best_practice: 75
    },
    {
      behavior: 'Fonds d\'urgence',
      user: 80,
      peers: 34,
      best_practice: 100
    },
    {
      behavior: 'Optimisation fiscale',
      user: 60,
      peers: 28,
      best_practice: 95
    }
  ];

  const achievements = [
    {
      title: 'Épargnant Exemplaire',
      description: 'Top 20% des épargnants de votre tranche d\'âge',
      icon: '🏆',
      level: 'gold',
      progress: 100
    },
    {
      title: 'Investisseur Prudent',
      description: 'Diversification supérieure à 85% des utilisateurs',
      icon: '📈',
      level: 'silver',
      progress: 85
    },
    {
      title: 'Maître du Budget',
      description: 'Respect du budget 95% du temps',
      icon: '🎯',
      level: 'gold',
      progress: 95
    },
    {
      title: 'Chasseur de Frais',
      description: 'Frais bancaires inférieurs à 90% des utilisateurs',
      icon: '🔍',
      level: 'bronze',
      progress: 60
    }
  ];

  const rankingData = [
    { name: 'Vous', score: 842, percentile: 78, color: '#3b82f6' },
    { name: 'Profil similaire moyen', score: 687, percentile: 50, color: '#6b7280' },
    { name: 'Top 10%', score: 950, percentile: 90, color: '#22c55e' },
    { name: 'Top 1%', score: 1200, percentile: 99, color: '#f59e0b' }
  ];

  const getPerformanceColor = (percentile: number) => {
    if (percentile >= 80) return 'text-success';
    if (percentile >= 60) return 'text-primary';
    if (percentile >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getPerformanceLabel = (percentile: number) => {
    if (percentile >= 90) return 'Excellent';
    if (percentile >= 75) return 'Très bon';
    if (percentile >= 50) return 'Bon';
    if (percentile >= 25) return 'Moyen';
    return 'À améliorer';
  };

  const getAchievementColor = (level: string) => {
    switch (level) {
      case 'gold': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case 'silver': return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
      case 'bronze': return 'text-orange-600 border-orange-600/30 bg-orange-600/10';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card className="card-premium">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">📊 Comparateur Financier Intelligent</h2>
              <p className="text-muted-foreground text-sm">
                Votre position vs 50,000+ profils similaires
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={ageRange} onValueChange={setAgeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-25">18-25 ans</SelectItem>
                <SelectItem value="25-35">25-35 ans</SelectItem>
                <SelectItem value="35-45">35-45 ans</SelectItem>
                <SelectItem value="45-55">45-55 ans</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="ile-de-france">Île-de-France</SelectItem>
                <SelectItem value="lyon">Lyon</SelectItem>
                <SelectItem value="marseille">Marseille</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Performance Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(peerComparisons).map(([key, data]) => (
            <div key={key} className="text-center p-4 bg-muted/20 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1 capitalize">{key}</div>
              <div className={`text-lg font-bold ${getPerformanceColor(data.percentile)}`}>
                {data.percentile}e percentile
              </div>
              <div className="text-xs text-muted-foreground">{data.rank}</div>
              <Progress value={data.percentile} className="h-1 mt-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Overall Ranking */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🏆 Classement Général</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={rankingData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" width={150} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {rankingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-primary" />
            <div>
              <div className="font-semibold text-primary">Score Global: 842/1000</div>
              <div className="text-sm text-muted-foreground">
                Vous êtes dans le <strong>78e percentile</strong> - meilleur que 78% des utilisateurs !
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Demographic Comparison */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">👥 Comparaison Démographique</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicComparisons}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => `${value}€`}
              />
              <Bar dataKey="user" name="Vous" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="peers_25_30" name="25-30 ans" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="peers_30_35" name="30-35 ans" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="national_avg" name="Moyenne nationale" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Behavioral Comparison Radar */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🧠 Analyse Comportementale</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={behaviorComparison}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="behavior" className="text-xs" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tickCount={5} />
              <Radar 
                name="Vous" 
                dataKey="user" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.3)" 
                strokeWidth={2}
              />
              <Radar 
                name="Pairs" 
                dataKey="peers" 
                stroke="hsl(var(--secondary))" 
                fill="hsl(var(--secondary) / 0.2)" 
                strokeWidth={2}
              />
              <Radar 
                name="Meilleure pratique" 
                dataKey="best_practice" 
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
            <div className="text-xs text-muted-foreground">Votre score</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-secondary rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Moyenne des pairs</div>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1" />
            <div className="text-xs text-muted-foreground">Meilleure pratique</div>
          </div>
        </div>
      </Card>

      {/* Achievements & Badges */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🏅 Achievements & Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index} className={`card-insight ${getAchievementColor(achievement.level)}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression</span>
                  <span>{achievement.progress}%</span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
              </div>
              
              <Badge className={`${getAchievementColor(achievement.level)} text-xs`} variant="outline">
                Niveau {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
              </Badge>
            </Card>
          ))}
        </div>
      </Card>

      {/* Insights & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-emotional border-success/20">
          <div className="flex items-center gap-3 mb-4">
            <Medal className="w-6 h-6 text-success" />
            <h3 className="text-lg font-semibold text-primary">🎯 Points Forts</h3>
          </div>
          
          <div className="space-y-3">
            <Alert className="border-success/20 bg-success/10">
              <Star className="w-4 h-4" />
              <AlertDescription>
              <strong>Épargne exceptionnelle:</strong> Vous épargnez 25% de plus que la moyenne de votre tranche d'âge
              </AlertDescription>
            </Alert>
            
            <Alert className="border-primary/20 bg-primary/10">
              <Award className="w-4 h-4" />
              <AlertDescription>
                <strong>Discipline budgétaire:</strong> Respect du budget 95% du temps vs 67% pour vos pairs
              </AlertDescription>
            </Alert>
            
            <Alert className="border-info/20 bg-info/10">
              <Target className="w-4 h-4" />
              <AlertDescription>
                <strong>Optimisation des frais:</strong> Frais bancaires 40% inférieurs à la moyenne
              </AlertDescription>
            </Alert>
          </div>
        </Card>

        <Card className="card-premium border-warning/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-warning" />
            <h3 className="text-lg font-semibold text-primary">🚀 Axes d'Amélioration</h3>
          </div>
          
          <div className="space-y-3">
            <Alert className="border-warning/20 bg-warning/10">
              <Info className="w-4 h-4" />
              <AlertDescription>
                <strong>Diversification investissements:</strong> Passez au 90e percentile en ajoutant des ETF internationaux
              </AlertDescription>
            </Alert>
            
            <Alert className="border-primary/20 bg-primary/10">
              <AlertDescription>
                <strong>Optimisation fiscale:</strong> PEA et assurance-vie pourraient vous faire économiser 450€/an
              </AlertDescription>
            </Alert>
            
            <Alert className="border-secondary/20 bg-secondary/10">
              <AlertDescription>
                <strong>Fonds d'urgence:</strong> Augmenter à 6 mois de dépenses vous placerait dans le top 10%
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </div>

      {/* Peer Learning */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🎓 Apprentissage par les Pairs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">💡</div>
              <div className="font-semibold">Stratégie populaire</div>
            </div>
            <p className="text-sm text-muted-foreground">
              85% des utilisateurs dans le top 20% utilisent l'épargne automatique le jour de paie
            </p>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-semibold">App favorite</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Les top performers utilisent en moyenne 2.3 apps financières pour optimiser leur gestion
            </p>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Habitude clé</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Révision mensuelle du budget pratiquée par 94% des utilisateurs avec score >800
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};