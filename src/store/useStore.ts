import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { REVOLUTIONARY_THEMES, ThemeName } from '@/themes/revolutionaryThemes';

export type Theme = ThemeName;

export interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  date?: string;
  isRecurring?: boolean;
}

export interface FinancialData {
  income: FinancialItem[];
  fixedExpenses: FinancialItem[];
  variableExpenses: FinancialItem[];
  debts: FinancialItem[];
  mood: number;
  emotionalTags: string[];
  timestamp: number;
}

export interface AdvancedInsight {
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
    tenYear: number;
  };
  emotionalPatterns: {
    triggers: string[];
    correlations: { emotion: string; impact: number }[];
    suggestions: string[];
  };
  marketComparisons: {
    peer: string;
    deviation: number;
    ranking: number;
    percentile: number;
  };
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    mitigation: string[];
    score: number;
  };
  behavioralPatterns: {
    spendingPersonality: string;
    decisionMaking: string;
    riskTolerance: string;
    optimizationPotential: number;
  };
  aiPredictions: {
    nextMonthSpending: number;
    savingsGoalAchievability: number;
    emergencyFundNeeded: number;
    investmentReadiness: number;
  };
}

export interface Exploration {
  id: string;
  question: string;
  data: FinancialData;
  insights: AdvancedInsight;
  timestamp: number;
  theme: Theme;
}

export interface UserPreferences {
  theme: Theme;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  privacyMode: boolean;
  language: string;
  currency: string;
  particleEffects: boolean;
  glassmorphism: boolean;
  autoSave: boolean;
}

export interface HiddenCost {
  id: string;
  name: string;
  amount: number;
  category: string;
  impact: number;
  description: string;
}

export interface SimulationResult {
  id: string;
  scenario: string;
  originalData: FinancialData;
  modifiedData: FinancialData;
  results: AdvancedInsight;
  timestamp: number;
}

export interface ShareLink {
  id: string;
  url: string;
  title: string;
  description: string;
  timestamp: number;
}

interface AppState {
  // Current session
  currentExploration: Exploration | null;
  currentStep: 'question' | 'data' | 'revelation';
  isAnalyzing: boolean;
  
  // User data
  explorations: Exploration[];
  preferences: UserPreferences;
  
  // UI state
  theme: Theme;
  sidebarOpen: boolean;
  activeTab: string;
  
  // New advanced features
  hiddenCosts: HiddenCost[];
  simulationResults: SimulationResult[];
  shareLinks: ShareLink[];
  
  // Actions
  setCurrentExploration: (exploration: Exploration | null) => void;
  setCurrentStep: (step: 'question' | 'data' | 'revelation') => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  addExploration: (exploration: Exploration) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setTheme: (theme: Theme) => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  addHiddenCosts: (costs: HiddenCost[]) => void;
  addSimulationResult: (result: SimulationResult) => void;
  addShareLink: (link: ShareLink) => void;
  clearData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentExploration: null,
      currentStep: 'question',
      isAnalyzing: false,
      explorations: [],
      preferences: {
        theme: 'neural',
        soundEnabled: true,
        animationsEnabled: true,
        privacyMode: false,
        language: 'fr',
        currency: 'EUR',
        particleEffects: true,
        glassmorphism: true,
        autoSave: true
      },
      theme: 'neural',
      sidebarOpen: false,
      activeTab: 'revelation',
      hiddenCosts: [],
      simulationResults: [],
      shareLinks: [],
      
      // Actions
      setCurrentExploration: (exploration) => set({ currentExploration: exploration }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
      
      addExploration: (exploration) => set((state) => ({
        explorations: [exploration, ...state.explorations.slice(0, 9)] // Keep last 10
      })),
      
      updatePreferences: (newPreferences) => set((state) => ({
        preferences: { ...state.preferences, ...newPreferences }
      })),
      
      setTheme: (theme) => {
        set({ theme });
        // Apply revolutionary theme
        const themeConfig = REVOLUTIONARY_THEMES[theme];
        const root = document.documentElement;
        
        root.style.setProperty('--theme-primary', themeConfig.primary);
        root.style.setProperty('--theme-secondary', themeConfig.secondary);
        root.style.setProperty('--theme-accent', themeConfig.accent);
        root.style.setProperty('--theme-background', themeConfig.background);
        root.style.setProperty('--theme-surface', themeConfig.surface);
        root.style.setProperty('--theme-glass', themeConfig.glass);
        root.style.setProperty('--theme-glow', themeConfig.glow);
        root.style.setProperty('--theme-gradient', themeConfig.gradient);
        
        document.body.className = `theme-${theme}`;
      },
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      addHiddenCosts: (costs) => set((state) => ({
        hiddenCosts: [...state.hiddenCosts, ...costs]
      })),
      
      addSimulationResult: (result) => set((state) => ({
        simulationResults: [result, ...state.simulationResults.slice(0, 19)] // Keep last 20
      })),
      
      addShareLink: (link) => set((state) => ({
        shareLinks: [link, ...state.shareLinks.slice(0, 9)] // Keep last 10
      })),
      
      clearData: () => set({
        currentExploration: null,
        currentStep: 'question',
        explorations: [],
        hiddenCosts: [],
        simulationResults: [],
        shareLinks: []
      })
    }),
    {
      name: 'rivela-revolutionary-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        explorations: state.explorations,
        preferences: state.preferences,
        theme: state.theme,
        hiddenCosts: state.hiddenCosts,
        simulationResults: state.simulationResults,
        shareLinks: state.shareLinks
      })
    }
  )
);
