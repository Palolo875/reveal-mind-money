
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'aurora' | 'sunset' | 'ocean' | 'forest' | 'galaxy';

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

export interface Exploration {
  id: string;
  question: string;
  data: FinancialData;
  insights: any;
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
  
  // Actions
  setCurrentExploration: (exploration: Exploration | null) => void;
  setCurrentStep: (step: 'question' | 'data' | 'revelation') => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  addExploration: (exploration: Exploration) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setTheme: (theme: Theme) => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
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
        theme: 'aurora',
        soundEnabled: true,
        animationsEnabled: true,
        privacyMode: false,
        language: 'fr',
        currency: 'EUR'
      },
      theme: 'aurora',
      sidebarOpen: false,
      activeTab: 'revelation',
      
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
        document.body.className = `theme-${theme}`;
      },
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      clearData: () => set({
        currentExploration: null,
        currentStep: 'question',
        explorations: []
      })
    }),
    {
      name: 'rivela-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        explorations: state.explorations,
        preferences: state.preferences,
        theme: state.theme
      })
    }
  )
);
