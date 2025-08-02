
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, BookOpen, Target, TrendingUp } from 'lucide-react';

interface LearningModuleProps {
  insight?: string;
  financialData?: import('@/types').FinancialData;
}

export const LearningModule = ({ insight, financialData }: LearningModuleProps) => {
  const learningTopics = [
    {
      title: "Optimisation des dépenses variables",
      progress: 75,
      description: "Apprenez à identifier et réduire les coûts cachés",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Psychologie financière",
      progress: 60,
      description: "Comprenez vos patterns émotionnels de dépense",
      icon: Lightbulb,
      color: "text-secondary"
    },
    {
      title: "Stratégies d'épargne",
      progress: 45,
      description: "Techniques avancées pour maximiser vos économies",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Module d'Apprentissage Personnalisé
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${topic.color}`} />
                  <h4 className="font-semibold text-sm">{topic.title}</h4>
                </div>
                
                <p className="text-xs text-muted-foreground mb-4">
                  {topic.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Progression</span>
                    <span className={`text-xs font-medium ${topic.color}`}>
                      {topic.progress}%
                    </span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
                
                <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                  Continuer l'apprentissage
                </Button>
              </Card>
            );
          })}
        </div>
      </Card>

      <Card className="card-premium p-6">
        <h4 className="text-lg font-semibold mb-4 text-primary">🎯 Recommandations d'Apprentissage</h4>
        <div className="space-y-3">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <h5 className="font-medium text-primary mb-1">Basé sur votre profil :</h5>
            <p className="text-sm text-muted-foreground">
              Votre état émotionnel "{insight?.emotionalState || 'Analysé'}" suggère de se concentrer sur la gestion des impulsions d'achat.
            </p>
          </div>
          
          <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <h5 className="font-medium text-secondary mb-1">Recommandation IA :</h5>
            <p className="text-sm text-muted-foreground">
              Module "Psychologie financière" prioritaire pour améliorer votre score de {insight?.healthScore || 85}/100.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
