import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Plus, Calendar, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'emergency' | 'travel' | 'investment' | 'purchase' | 'debt' | 'retirement';
  priority: 'high' | 'medium' | 'low';
  autoContribution: number;
  status: 'on-track' | 'behind' | 'ahead' | 'completed';
}

interface GoalTrackerProps {
  currentProjections: any;
  recommendations: string[];
}

export const GoalTracker = ({ 
  currentProjections, 
  recommendations 
}: GoalTrackerProps) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Fonds d\'urgence',
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: '2024-12-31',
      category: 'emergency',
      priority: 'high',
      autoContribution: 500,
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Voyage au Japon',
      targetAmount: 4500,
      currentAmount: 1200,
      deadline: '2024-08-15',
      category: 'travel',
      priority: 'medium',
      autoContribution: 300,
      status: 'behind'
    },
    {
      id: '3',
      title: 'Investissement PEA',
      targetAmount: 10000,
      currentAmount: 12500,
      deadline: '2024-06-30',
      category: 'investment',
      priority: 'high',
      autoContribution: 400,
      status: 'completed'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: 0,
    deadline: '',
    category: 'investment' as Goal['category'],
    priority: 'medium' as Goal['priority'],
    autoContribution: 0
  });

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const addGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        ...newGoal,
        currentAmount: 0,
        status: 'on-track'
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        targetAmount: 0,
        deadline: '',
        category: 'investment',
        priority: 'medium',
        autoContribution: 0
      });
      setShowNewGoalForm(false);
    }
  };

  const updateGoalAmount = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            currentAmount: Math.min(amount, goal.targetAmount),
            status: amount >= goal.targetAmount ? 'completed' : goal.status
          }
        : goal
    ));
  };

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'emergency': return '🆘';
      case 'travel': return '✈️';
      case 'investment': return '📈';
      case 'purchase': return '🛒';
      case 'debt': return '💳';
      case 'retirement': return '🏖️';
      default: return '🎯';
    }
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'emergency': return 'border-danger/30 bg-danger/10';
      case 'travel': return 'border-info/30 bg-info/10';
      case 'investment': return 'border-success/30 bg-success/10';
      case 'purchase': return 'border-warning/30 bg-warning/10';
      case 'debt': return 'border-destructive/30 bg-destructive/10';
      case 'retirement': return 'border-primary/30 bg-primary/10';
      default: return 'border-muted/30 bg-muted/10';
    }
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed': return 'text-success border-success/30 bg-success/10';
      case 'on-track': return 'text-primary border-primary/30 bg-primary/10';
      case 'ahead': return 'text-info border-info/30 bg-info/10';
      case 'behind': return 'text-warning border-warning/30 bg-warning/10';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: Goal['status']) => {
    switch (status) {
      case 'completed': return 'Complété';
      case 'on-track': return 'En bonne voie';
      case 'ahead': return 'En avance';
      case 'behind': return 'En retard';
      default: return 'Inconnu';
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const calculateTimeToGoal = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (remaining <= 0) return 'Complété';
    if (goal.autoContribution <= 0) return 'Indéterminé';
    
    const monthsNeeded = Math.ceil(remaining / goal.autoContribution);
    return `${monthsNeeded} mois`;
  };

  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.autoContribution, 0);

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="metric-card">
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-primary">{goals.length}</div>
            <div className="text-sm text-muted-foreground">Objectifs actifs</div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="text-center">
            <Award className="w-6 h-6 mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold text-success">{completedGoals}</div>
            <div className="text-sm text-muted-foreground">Complétés</div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-secondary" />
            <div className="text-2xl font-bold text-secondary">{Math.round((totalSaved / totalGoalsValue) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Progression</div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-warning" />
            <div className="text-2xl font-bold text-warning">{totalMonthlyContribution}€</div>
            <div className="text-sm text-muted-foreground">Cotis. mensuelle</div>
          </div>
        </Card>
      </div>

      {/* Main Goals Dashboard */}
      <Card className="card-premium">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary">🎯 Suivi d'Objectifs Intelligents</h2>
          <Button onClick={() => setShowNewGoalForm(true)} className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel objectif
          </Button>
        </div>

        {/* Global Progress */}
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border/50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Progression globale</span>
            <span className="text-primary font-bold">{totalSaved.toLocaleString()}€ / {totalGoalsValue.toLocaleString()}€</span>
          </div>
          <Progress value={(totalSaved / totalGoalsValue) * 100} className="h-3" />
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className={`card-insight ${getCategoryColor(goal.category)}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                  <div>
                    <h3 className="font-semibold text-primary">{goal.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getStatusColor(goal.status)}`} variant="outline">
                        {getStatusLabel(goal.status)}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(goal.priority)}`} variant="outline">
                        Priorité {goal.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">
                    {goal.currentAmount.toLocaleString()}€ / {goal.targetAmount.toLocaleString()}€
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Échéance: {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                </div>
                <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-muted/20 rounded">
                  <div className="text-sm font-medium">{goal.autoContribution}€/mois</div>
                  <div className="text-xs text-muted-foreground">Cotisation auto</div>
                </div>
                <div className="text-center p-2 bg-muted/20 rounded">
                  <div className="text-sm font-medium">{calculateTimeToGoal(goal)}</div>
                  <div className="text-xs text-muted-foreground">Temps restant</div>
                </div>
                <div className="text-center p-2 bg-muted/20 rounded">
                  <div className="text-sm font-medium">{(goal.targetAmount - goal.currentAmount).toLocaleString()}€</div>
                  <div className="text-xs text-muted-foreground">Restant</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Ajouter un montant"
                  className="flex-1 input-premium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const amount = parseFloat((e.target as HTMLInputElement).value);
                      if (amount > 0) {
                        updateGoalAmount(goal.id, goal.currentAmount + amount);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
                <Button variant="outline" size="sm" className="btn-ghost-glow">
                  Modifier
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* New Goal Form */}
        {showNewGoalForm && (
          <Card className="mt-6 border-primary/20">
            <h3 className="font-semibold text-primary mb-4">🎯 Créer un nouvel objectif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Titre de l'objectif"
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                className="input-premium"
              />
              <Input
                type="number"
                placeholder="Montant cible (€)"
                value={newGoal.targetAmount || ''}
                onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: parseFloat(e.target.value) || 0 }))}
                className="input-premium"
              />
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                className="input-premium"
              />
              <Input
                type="number"
                placeholder="Cotisation mensuelle (€)"
                value={newGoal.autoContribution || ''}
                onChange={(e) => setNewGoal(prev => ({ ...prev, autoContribution: parseFloat(e.target.value) || 0 }))}
                className="input-premium"
              />
              <Select value={newGoal.category} onValueChange={(value: Goal['category']) => setNewGoal(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="input-premium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Fonds d'urgence</SelectItem>
                  <SelectItem value="travel">Voyage</SelectItem>
                  <SelectItem value="investment">Investissement</SelectItem>
                  <SelectItem value="purchase">Achat</SelectItem>
                  <SelectItem value="debt">Remboursement dette</SelectItem>
                  <SelectItem value="retirement">Retraite</SelectItem>
                </SelectContent>
              </Select>
              <Select value={newGoal.priority} onValueChange={(value: Goal['priority']) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="input-premium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Priorité haute</SelectItem>
                  <SelectItem value="medium">Priorité moyenne</SelectItem>
                  <SelectItem value="low">Priorité basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addGoal} className="btn-hero">
                Créer l'objectif
              </Button>
              <Button variant="outline" onClick={() => setShowNewGoalForm(false)} className="btn-ghost-glow">
                Annuler
              </Button>
            </div>
          </Card>
        )}
      </Card>

      {/* Smart Recommendations */}
      <Card className="card-emotional border-secondary/20">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-secondary" />
          <h3 className="text-lg font-semibold text-primary">💡 Recommandations Intelligentes</h3>
        </div>
        
        <div className="space-y-3">
          <Alert className="border-success/20 bg-success/10">
            <AlertDescription>
              <strong>Optimisation détectée:</strong> Réduire la cotisation "Voyage" de 100€ et l'allouer au "Fonds d'urgence" accélérerait votre sécurité financière.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-primary/20 bg-primary/10">
            <AlertDescription>
              <strong>Nouvel objectif suggéré:</strong> Avec vos économies actuelles, vous pourriez envisager un PEA jeune pour bénéficier d'avantages fiscaux.
            </AlertDescription>
          </Alert>
          
          <Alert className="border-warning/20 bg-warning/10">
            <AlertDescription>
              <strong>Attention timeline:</strong> L'objectif "Voyage au Japon" risque de ne pas être atteint. Augmenter la cotisation de 150€/mois ou repousser de 3 mois.
            </AlertDescription>
          </Alert>
        </div>
      </Card>
    </div>
  );
};