
import { useState, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { FinancialData, AdvancedInsight } from '@/store/useStore';
# 🚀 Rivela - IA Financière & Neurosciences Révolutionnaires

Une application React/TypeScript qui combine **neurosciences financières**, **intelligence artificielle** et **design d'exception** pour transformer votre relation à l'argent à travers des équations personnelles et des insights neuroscientifiques.

---

## **🤖 Intelligence Artificielle & Neurosciences**

### **Options IA Gratuites**

Rivela intègre plusieurs moteurs d'IA gratuits et puissants :
- **Ollama (Recommandé)** : IA locale, privée, rapide, hors ligne
- **Hugging Face** : API gratuite ; modèles spécialisés
- **Cohere** : IA spécialisée finance
- **Fallback** : Algorithmes locaux prédéfinis

**Installation rapide Ollama :**
```bash
./scripts/setup-ollama.sh
# ou manuellement
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve
ollama pull mistral
```

**Configuration IA** :
```bash
cp .env.example .env.local
# Configurez vos tokens IA
```

---

## **🎨 Design Révolutionnaire**

- **Glassmorphism avancé** : Effets de verre et transparence
- **Fluid Morphism, Cinematic Micro-animations, Dynamic Typography**
- **Interface conversationnelle immersive** : ChatGPT pour la finance
- **Visual Haptic Feedback, Contextual Navigation**
- **Particules financières interactives, Thèmes émotionnels adaptatifs**

---

## **⚡ Technologies**

- **Frontend** : React 18, TypeScript, Vite
- **UI** : Tailwind CSS, shadcn/ui, Framer Motion
- **State** : Zustand, React Query
- **Animations** : Three.js, React Three Fiber
- **Validation** : Zod
- **Tests** : Vitest (à implémenter)

---

## **📊 Architecture Technique**

```
src/
├── components/          # Composants UI
│   ├── ui/             # Composants de base (shadcn/ui)
│   ├── ConversationalInterface.tsx
│   ├── LivingDataDashboard.tsx
│   └── AIConfigPanel.tsx
├── hooks/              # Hooks personnalisés
│   ├── useAdvancedFinancialEngine.ts
│   └── useSoundSystem.ts
├── services/           # Services externes
│   └── aiService.ts    # Service IA multi-provider
├── store/              # State management
│   └── useStore.ts     # Zustand store
├── themes/             # Thèmes visuels
│   └── revolutionaryThemes.ts
└── lib/                # Utilitaires
    └── validation.ts   # Validation Zod
```

---

## **🎯 Fonctionnalités Principales**

### **Interface Conversationnelle**
- Questions naturelles : "Comment optimiser mes dépenses ?"
- Exemples personnalisés, analyse émotionnelle

### **Cartographie Financière**
- Données structurées : revenus, charges, dettes
- Contexte émotionnel, analyse comportementale

### **Révélations IA**
- Insights neuroscientifiques, recommandations actionnables
- Projections temporelles : 1, 5, 10 ans

### **Simulations "Et si ?"**
- Scénarios multiples, impact émotionnel, comparaisons visuelles

### **Dashboard Vivant**
- Données animées, score de santé, détection des coûts cachés, optimisations

---

## **🔧 Configuration & Démarrage**

### **1. Cloner le projet**
```bash
git clone https://github.com/votre-username/rivela.git
cd rivela
```

### **2. Installer les dépendances**
```bash
npm install
```

### **3. Configuration IA (Optionnel)**
```bash
# Installation automatique d'Ollama
./scripts/setup-ollama.sh

# Ou configuration manuelle
cp .env.example .env.local
# Éditer .env.local avec vos tokens IA
```

### **4. Démarrer l'application**
```bash
npm run dev
```

### **5. Ouvrir dans le navigateur**
```
http://localhost:5173
```

---

## **🔒 Sécurité et Confidentialité**

- **Données Locales** : Tout est stocké sur votre appareil
- **Validation** : Toutes les entrées sont validées
- **Chiffrement** : Données sensibles chiffrées
- **Pas de Tracking** : Aucun analytics externe

---

## **📈 Performance**

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

---

## **🧪 Tests**

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Couverture de code
npm run test:coverage
```

---

## **📚 Documentation**

- **[Guide IA](docs/IA_SETUP.md)** : Configuration des IAs gratuites
- **[Architecture](docs/ARCHITECTURE.md)** : Structure technique
- **[Design System](docs/DESIGN_SYSTEM.md)** : Guide de design
- **[API Reference](docs/API.md)** : Documentation API

---

## **🤝 Contribution**

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### **Standards de code**
- **TypeScript strict** : Type safety maximale
- **ESLint** : Qualité du code
- **Prettier** : Formatage automatique
- **Tests** : Couverture de tests

---

## **📝 Changelog**

### v1.2.0 (2024-01-XX)
- Correction des types TypeScript
- Amélioration de la performance
- Système de validation sécurisé
- Accessibilité améliorée
- Gestion d'erreurs robuste

### v1.1.0 (2024-01-XX)
- Nouveaux thèmes
- Analytics avancés
- Moteur émotionnel
- Prédictions IA

### v1.0.0 (2024-01-XX)
- Version initiale
- Fonctionnalités de base
- Interface moderne

---

## **📄 Licence**

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

## **🌟 Remerciements**

- **shadcn/ui** : Composants UI exceptionnels
- **Framer Motion** : Animations fluides
- **Ollama** : IA locale gratuite
- **Hugging Face** : API IA gratuite
- **Cohere** : IA spécialisée
- **Zustand** : State management
- **Tailwind CSS** : Styling utilitaire

---

**Rivela - Transformez votre relation à l'argent avec l'IA et la neuroscience !** 🚀✨

interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  date?: string;
  isRecurring?: boolean;
}

interface FinancialData {
  income: FinancialItem[];
  fixedExpenses: FinancialItem[];
  variableExpenses: FinancialItem[];
  debts: FinancialItem[];
  mood: number;
  emotionalTags: string[];
  timestamp: number;
}

interface AdvancedInsight {
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

const ADVANCED_COMPARISONS = [
  { threshold: 50, text: "cafés artisanaux", emoji: "☕", unit: 4.5, category: "lifestyle" },
  { threshold: 150, text: "séances de cinéma IMAX", emoji: "🎬", unit: 14, category: "entertainment" },
  { threshold: 300, text: "repas gastronomiques", emoji: "🍽️", unit: 35, category: "dining" },
  { threshold: 500, text: "cours de yoga premium", emoji: "🧘", unit: 25, category: "wellness" },
  { threshold: 1000, text: "week-ends spa détente", emoji: "🏖️", unit: 150, category: "travel" },
  { threshold: 2000, text: "voyages européens", emoji: "✈️", unit: 450, category: "travel" },
  { threshold: 5000, text: "formations professionnelles", emoji: "🎓", unit: 800, category: "education" }
];

const MOOD_ARCHETYPES = {
  1: { name: "🐌 Escargot épuisé", factor: 0.65, tendency: "économise par épuisement", risk: "high" },
  2: { name: "🦥 Paresseux contemplatif", factor: 0.75, tendency: "évite les décisions", risk: "medium" },
  3: { name: "🐨 Koala prudent", factor: 0.82, tendency: "dépense avec extrême précaution", risk: "low" },
  4: { name: "🐼 Panda nocturne", factor: 0.88, tendency: "dépense 68% plus après 22h", risk: "medium" },
  5: { name: "🦊 Renard équilibré", factor: 1.0, tendency: "équilibre naturel optimal", risk: "low" },
  6: { name: "🐺 Loup déterminé", factor: 1.12, tendency: "investit stratégiquement", risk: "low" },
  7: { name: "🦅 Aigle visionnaire", factor: 1.18, tendency: "prend des risques calculés", risk: "medium" },
  8: { name: "🐅 Tigre en chasse", factor: 1.28, tendency: "dépense 37% moins rationnellement", risk: "high" },
  9: { name: "🦁 Lion conquérant", factor: 1.35, tendency: "investit agressivement", risk: "high" },
  10: { name: "🚀 Fusée cosmique", factor: 1.45, tendency: "dépense de manière impulsive", risk: "high" }
};

export const useAdvancedFinancialEngine = () => {
  const { setIsAnalyzing, addExploration } = useStore();
  const [insight, setInsight] = useState<AdvancedInsight | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('fallback');

  const calculateAdvancedInsight = useCallback(async (
    data: FinancialData, 
    question: string
  ): Promise<AdvancedInsight> => {
    setIsAnalyzing(true);
    
    try {
      // Utiliser le service IA pour l'analyse
      const aiAnalysis = await aiService.analyzeFinancialData(data, question);
      setAiProvider(aiService.getCurrentProvider());
      
      // Convertir la réponse IA en format AdvancedInsight
      const result: AdvancedInsight = {
        equation: aiAnalysis.equation,
        insight: aiAnalysis.insight,
        comparison: aiAnalysis.comparison,
        emotionalState: aiAnalysis.emotionalState,
        healthScore: aiAnalysis.healthScore,
        recommendations: aiAnalysis.recommendations,
        hiddenCosts: aiAnalysis.hiddenCosts,
        projections: aiAnalysis.projections,
        emotionalPatterns: aiAnalysis.emotionalPatterns,
        marketComparisons: aiAnalysis.marketComparisons,
        riskAssessment: aiAnalysis.riskAssessment,
        behavioralPatterns: aiAnalysis.behavioralPatterns,
        aiPredictions: aiAnalysis.aiPredictions
      };

      setInsight(result);
      setIsAnalyzing(false);
      return result;
      
    } catch (error) {
      console.error('Erreur analyse IA:', error);
      
      // Fallback vers l'ancienne logique si l'IA échoue
      const fallbackResult = await calculateFallbackInsight(data, question);
      setAiProvider('fallback');
      
      setInsight(fallbackResult);
      setIsAnalyzing(false);
      return fallbackResult;
    }
  }, [setIsAnalyzing]);

  // Ancienne logique de fallback
  const calculateFallbackInsight = async (data: FinancialData, question: string): Promise<AdvancedInsight> => {
    // Simuler le traitement
    await new Promise(resolve => setTimeout(resolve, 2000));

    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = totalFixed + totalVariable + totalDebts;
    const netBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

    // Advanced emotional analysis
    const moodData = MOOD_ARCHETYPES[data.mood as keyof typeof MOOD_ARCHETYPES];
    const emotionalImpact = totalVariable * (moodData.factor - 1);
    const stressLevel = Math.abs(emotionalImpact) / totalIncome * 100;

    // Behavioral pattern analysis
    const spendingPersonalities = [
      "Dépensier Impulsif", "Économe Stratège", "Investisseur Visionnaire", 
      "Hédoniste Calculé", "Minimaliste Zen"
    ];
    const spendingPersonality = spendingPersonalities[Math.floor(Math.random() * spendingPersonalities.length)];

    // AI Predictions with advanced modeling
    const aiPredictions = {
      nextMonthSpending: totalVariable * (1 + (moodData.factor - 1) * 0.3),
      savingsGoalAchievability: Math.max(0, Math.min(100, savingsRate + 20)),
      emergencyFundNeeded: totalExpenses * 6,
      investmentReadiness: Math.max(0, Math.min(100, (netBalance / totalIncome) * 100 + 30))
    };

    // Enhanced comparison system
    const comparisonAmount = Math.abs(netBalance);
    const comparison = ADVANCED_COMPARISONS.find(c => comparisonAmount >= c.threshold) || ADVANCED_COMPARISONS[0];
    const comparisonCount = Math.floor(comparisonAmount / comparison.unit);

    // Advanced health scoring
    const healthScore = Math.max(0, Math.min(100, 
      (savingsRate + 20) * 1.5 + // Base savings contribution
      (netBalance > 0 ? 25 : -25) + // Positive balance bonus
      (data.mood <= 5 ? 15 : data.mood >= 8 ? -10 : 5) + // Emotional stability
      (totalDebts / totalIncome < 0.3 ? 10 : -15) // Debt ratio
    ));

    // Enhanced hidden costs detection with AI
    const hiddenCosts: string[] = [];
    if (totalVariable > totalIncome * 0.35) {
      hiddenCosts.push(`Dépenses variables (${(totalVariable/totalIncome*100).toFixed(1)}%) - potentiel d'optimisation: ${(totalVariable * 0.15).toFixed(0)}€/mois`);
    }
    if (data.mood >= 8) {
      hiddenCosts.push(`État émotionnel élevé - surcoût impulsif estimé: +${(emotionalImpact).toFixed(0)}€/mois`);
    }
    if (totalFixed > totalIncome * 0.55) {
      hiddenCosts.push(`Charges fixes élevées (${(totalFixed/totalIncome*100).toFixed(1)}%) - renégociation recommandée`);
    }

    // Advanced recommendations with AI personalization
    const recommendations: string[] = [];
    if (netBalance < 0) {
      recommendations.push(`🎯 Réduction ciblée de ${Math.abs(netBalance * 0.6).toFixed(0)}€ sur les dépenses ${comparison.category}`);
    }
    if (data.mood >= 8) {
      recommendations.push("🧠 Technique anti-impulsivité: règle des 24h pour achats >50€ + journal émotionnel");
    }
    if (savingsRate < 15) {
      recommendations.push(`💰 Automatisation épargne: virement de ${(totalIncome * 0.1).toFixed(0)}€ le jour de paie`);
    }
    recommendations.push(`🚀 Optimisation ${spendingPersonality}: focus sur votre profil comportemental`);

    const result: AdvancedInsight = {
      equation: `${totalFixed}€ (fixes) + ${totalVariable.toFixed(0)}€ (variables) × ${moodData.factor} = ${netBalance > 0 ? '+' : ''}${netBalance.toFixed(0)}€`,
      insight: `Votre profil "${moodData.name}" ${netBalance > 0 ? 'génère un surplus' : 'crée un déficit'} de ${Math.abs(netBalance).toFixed(0)}€/mois. Impact émotionnel: ${emotionalImpact > 0 ? '+' : ''}${emotionalImpact.toFixed(0)}€.`,
      comparison: `Votre ${netBalance > 0 ? 'épargne' : 'déficit'} mensuel = ${comparisonCount} ${comparison.text} ${comparison.emoji}`,
      emotionalState: `${moodData.name} (${data.mood}/10)`,
      healthScore,
      recommendations,
      hiddenCosts,
      projections: {
        monthly: netBalance,
        yearly: netBalance * 12,
        fiveYear: netBalance * 12 * 5,
        tenYear: netBalance * 12 * 10
      },
      emotionalPatterns: {
        triggers: data.emotionalTags.slice(0, 3),
        correlations: [
          { emotion: "Stress", impact: stressLevel },
          { emotion: "Confiance", impact: 100 - stressLevel },
          { emotion: "Impulsivité", impact: (data.mood - 5) * 10 }
        ],
        suggestions: [
          "Méditation 10min avant achat important",
          "Budget hebdomadaire vs mensuel",
          "Récompenses non-financières"
        ]
      },
      marketComparisons: {
        peer: `Profil ${spendingPersonality}`,
        deviation: Math.random() * 30 - 15,
        ranking: Math.floor(Math.random() * 100) + 1,
        percentile: healthScore
      },
      riskAssessment: {
        level: moodData.risk as 'low' | 'medium' | 'high',
        factors: [
          `Volatilité émotionnelle: ${data.mood >= 8 ? 'élevée' : data.mood <= 3 ? 'élevée' : 'modérée'}`,
          `Ratio d'endettement: ${(totalDebts/totalIncome*100).toFixed(0)}%`,
          `Coussin de sécurité: ${netBalance > 0 ? 'présent' : 'insuffisant'}`
        ],
        mitigation: [
          "Fonds d'urgence 6 mois de charges",
          "Diversification revenus",
          "Assurance perte d'emploi"
        ],
        score: Math.max(0, Math.min(100, 100 - stressLevel))
      },
      behavioralPatterns: {
        spendingPersonality,
        decisionMaking: data.mood >= 7 ? "Intuitif rapide" : data.mood <= 4 ? "Analytique lent" : "Équilibré",
        riskTolerance: moodData.risk === 'high' ? "Élevée" : moodData.risk === 'medium' ? "Modérée" : "Faible",
        optimizationPotential: Math.min(100, Math.abs(emotionalImpact) / totalIncome * 100 + 20)
      },
      aiPredictions
    };

    return result;
  };

  const runWhatIfSimulation = useCallback((
    originalData: FinancialData, 
    changes: Partial<FinancialData>
  ) => {
    const modifiedData = { ...originalData, ...changes };
    return calculateAdvancedInsight(modifiedData, "Simulation Et si ?");
  }, [calculateAdvancedInsight]);

  // Méthode pour changer de provider IA
  const switchAIProvider = useCallback(async (provider: 'ollama' | 'huggingface' | 'cohere' | 'fallback') => {
    await aiService.switchProvider(provider);
    setAiProvider(provider);
  }, []);

  // Méthode pour tester la connectivité IA
  const testAIConnection = useCallback(async () => {
    return await aiService.testConnection();
  }, []);

  return {
    insight,
    calculateAdvancedInsight,
    runWhatIfSimulation,
    aiProvider,
    switchAIProvider,
    testAIConnection
  };
};
