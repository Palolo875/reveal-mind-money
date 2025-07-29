import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RevelationCardProps {
  equation: string;
  insight: string;
  comparison: string;
  emotionalState: string;
  scientificBadge?: string;
  isAnimating?: boolean;
  onReveal?: () => void;
}

export const RevelationCard = ({
  equation,
  insight,
  comparison,
  emotionalState,
  scientificBadge = "Science vérifiée",
  isAnimating = false,
  onReveal
}: RevelationCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        onReveal?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, onReveal]);

  return (
    <Card className={`card-insight relative overflow-hidden ${isRevealed ? 'animate-reveal' : ''}`}>
      {/* Background glow effect */}
      <div className="revelation-glow absolute inset-0 opacity-30" />
      
      <div className="relative z-10 space-y-6">
        {/* Scientific Badge */}
        <div className="flex justify-between items-start">
          <Badge 
            variant="secondary" 
            className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/30 transition-colors"
          >
            🧠 {scientificBadge}
          </Badge>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">État émotionnel</div>
            <div className="text-primary font-medium">{emotionalState}</div>
          </div>
        </div>

        {/* Main Equation */}
        <div className="text-center space-y-4">
          <h3 className="text-revelation leading-tight">
            {equation}
          </h3>
          
          {/* Visual separator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-primary flex-1 opacity-50" />
            <div className="text-primary text-2xl">⚡</div>
            <div className="h-px bg-gradient-primary flex-1 opacity-50" />
          </div>
        </div>

        {/* Insight */}
        <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
          <p className="text-lg leading-relaxed text-center">
            {insight}
          </p>
        </div>

        {/* Tangible Comparison */}
        <div className="bg-gradient-to-r from-secondary/10 to-success/10 rounded-lg p-4 border border-secondary/20">
          <div className="text-sm text-muted-foreground mb-2">💡 En termes concrets :</div>
          <p className="text-secondary font-medium text-lg">
            {comparison}
          </p>
        </div>
      </div>

      {/* Shimmer effect for loading state */}
      {!isRevealed && (
        <div className="absolute inset-0 animate-shimmer rounded-xl" />
      )}
    </Card>
  );
};