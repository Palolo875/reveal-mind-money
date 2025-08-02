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

// Types pour les graphiques et charts
export interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
  color?: string;
  metadata?: Record<string, unknown>;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  responsive?: boolean;
  animation?: boolean;
}

// Types pour les données D3 et visualisations
export interface D3DataPoint {
  x: number;
  y: number;
  value: number;
  label?: string;
  group?: string;
}

export interface D3Config {
  svg?: SVGSVGElement;
  container?: HTMLElement;
  dimensions?: { width: number; height: number };
  scales?: Record<string, unknown>;
}

// Types pour les simulations financières
export interface SimulationScenario {
  id: string;
  name: string;
  changes: {
    income?: number;
    expenses?: number;
    debts?: number;
  };
  duration: number; // en mois
  probability?: number;
}

export interface SimulationMetrics {
  netWorth: number;
  cashFlow: number;
  debtToIncomeRatio: number;
  emergencyFundMonths: number;
  savingsRate: number;
}

// Types pour les coûts cachés
export interface HiddenCostCategory {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface HiddenCostDetection {
  category: HiddenCostCategory;
  estimatedAmount: number;
  confidence: number;
  recommendations: string[];
}

// Types pour l'IA et les providers
export type AIProvider = 'ollama' | 'huggingface' | 'cohere' | 'fallback';

export interface AIConfig {
  provider: AIProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  metadata?: {
    provider: AIProvider;
    model: string;
    tokens?: number;
    duration?: number;
  };
}

// Types pour les exports et partages
export interface ExportConfig {
  format: 'pdf' | 'png' | 'jpeg' | 'svg' | 'json';
  quality?: number;
  includeCharts?: boolean;
  includeRecommendations?: boolean;
  theme?: string;
}

export interface ShareableContent {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  metadata?: Record<string, unknown>;
}

// Types pour les performances et métriques
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  bundleSize: number;
  memoryUsage?: number;
}

// Types pour l'accessibilité
export interface A11yConfig {
  reducedMotion?: boolean;
  highContrast?: boolean;
  largeText?: boolean;
  screenReader?: boolean;
}

// Types pour les formulaires
export interface FormFieldConfig {
  name: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: unknown) => boolean;
  };
  options?: Array<{ label: string; value: string | number }>;
}

export interface FormData {
  [key: string]: unknown;
}

// Types pour les sons et feedback audio
export interface SoundConfig {
  volume: number;
  enabled: boolean;
  effects: {
    success: boolean;
    error: boolean;
    notification: boolean;
    interaction: boolean;
  };
}

// Types pour les particules et effets visuels
export interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  interactive?: boolean;
  constellation?: boolean;
}

// Types pour les révélations et insights
export interface RevelationData {
  title: string;
  content: string;
  type: 'insight' | 'warning' | 'opportunity' | 'recommendation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  relatedData?: string[];
}

// Types utilitaires
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;