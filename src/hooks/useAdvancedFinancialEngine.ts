
import { useState, useCallback } from 'react';
import { useStore } from '@/store/useStore';

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

  const calculateAdvancedInsight = useCallback(async (
    data: FinancialData, 
    question: string
  ): Promise<AdvancedInsight> => {
    setIsAnalyzing(true);
    
    // Simulate advanced AI processing
    await new Promise(resolve => setTimeout(resolve, 3500));

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
    const hiddenCosts = [];
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
    const recommendations = [];
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

    setInsight(result);
    setIsAnalyzing(false);
    return result;
  }, [setIsAnalyzing]);

  const runWhatIfSimulation = useCallback((
    originalData: FinancialData, 
    changes: Partial<FinancialData>
  ) => {
    const modifiedData = { ...originalData, ...changes };
    return calculateAdvancedInsight(modifiedData, "Simulation Et si ?");
  }, [calculateAdvancedInsight]);

  return {
    insight,
    calculateAdvancedInsight,
    runWhatIfSimulation
  };
};
