import { lazy, Suspense } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy loading des composants lourds
export const RevolutionaryDashboard = lazy(() => 
  import('@/components/RevolutionaryDashboard').then(module => ({ 
    default: module.RevolutionaryDashboard 
  }))
);

export const AdvancedAnalytics = lazy(() =>
  import('@/components/AdvancedAnalytics').then(module => ({
    default: module.AdvancedAnalytics
  }))
);

export const AdvancedSimulator = lazy(() =>
  import('@/components/AdvancedSimulator').then(module => ({
    default: module.AdvancedSimulator
  }))
);

export const EmotionalInsightEngine = lazy(() =>
  import('@/components/EmotionalInsightEngine').then(module => ({
    default: module.EmotionalInsightEngine
  }))
);

export const AdvancedHiddenCostDetector = lazy(() =>
  import('@/components/AdvancedHiddenCostDetector').then(module => ({
    default: module.AdvancedHiddenCostDetector
  }))
);

// Composant de fallback pour le chargement
export const ComponentLoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <GlassCard variant="premium" className={`p-6 space-y-4 ${className}`}>
    <div className="animate-pulse space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-6 w-1/2" />
    </div>
  </GlassCard>
);

// Higher-order component pour wrap les composants lazy avec Suspense
export const withLazyLoading = <P extends object>(
  LazyComponent: React.LazyExoticComponent<React.ComponentType<P>>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <Suspense fallback={fallback || <ComponentLoadingSkeleton />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Export des composants wrapped
export const LazyRevolutionaryDashboard = withLazyLoading(RevolutionaryDashboard);
export const LazyAdvancedAnalytics = withLazyLoading(AdvancedAnalytics);
export const LazyAdvancedSimulator = withLazyLoading(AdvancedSimulator);
export const LazyEmotionalInsightEngine = withLazyLoading(EmotionalInsightEngine);
export const LazyAdvancedHiddenCostDetector = withLazyLoading(AdvancedHiddenCostDetector);