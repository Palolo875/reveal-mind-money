// Types exportés depuis le store
export type { 
  FinancialData, 
  FinancialItem, 
  AdvancedInsight, 
  Exploration, 
  UserPreferences,
  HiddenCost,
  SimulationResult,
  ShareLink,
  Theme 
} from '@/store/useStore';

// Types pour les composants
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps extends ComponentProps {
  variant?: 'default' | 'premium' | 'hero';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
}

// Types pour les hooks
export interface HookReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Types pour les animations
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: boolean;
}

// Types pour les thèmes
export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  glass: string;
  glow: string;
  gradient: string;
}

// Types pour les validations
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Types pour les événements
export interface AppEvent {
  type: string;
  payload: unknown;
  timestamp: number;
  userId?: string;
}

// Types pour les analytics
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: number;
}

// Types pour les erreurs
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: number;
  userId?: string;
}