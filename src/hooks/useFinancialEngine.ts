import { useState, useCallback } from 'react';

interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

interface FinancialData {
  income: FinancialItem[];
  fixedExpenses: FinancialItem[];
  variableExpenses: FinancialItem[];
  debts: FinancialItem[];
  mood: number;
  emotionalTags: string[];
}

interface FinancialInsight {
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
  };
}

const COMPARISONS = [
  { threshold: 50, text: "cafés par mois", emoji: "☕", unit: 5 },
  { threshold: 150, text: "places de cinéma", emoji: "🎬", unit: 12 },
  { threshold: 300, text: "restaurants", emoji: "🍕", unit: 25 },
  { threshold: 500, text: "livres", emoji: "📚", unit: 15 },
  { threshold: 1000, text: "week-ends escapade", emoji: "🏖️", unit: 120 },
  { threshold: 2000, text: "voyages", emoji: "✈️", unit: 400 },
];

const MOOD_MULTIPLIERS = {
  1: { name: "Escargot épuisé", factor: 0.7, tendency: "économise par défaut" },
  2: { name: "Paresseux contemplatif", factor: 0.8, tendency: "évite les dépenses" },
  3: { name: "Koala prudent", factor: 0.85, tendency: "dépense avec précaution" },
  4: { name: "Panda nocturne", factor: 0.9, tendency: "dépense 68% plus après 22h" },
  5: { name: "Renard équilibré", factor: 1.0, tendency: "équilibre naturel" },
  6: { name: "Loup déterminé", factor: 1.1, tendency: "investit stratégiquement" },
  7: { name: "Aigle visionnaire", factor: 1.15, tendency: "prend des risques calculés" },
  8: { name: "Tigre en chasse", factor: 1.25, tendency: "dépense 37% moins rationnellement" },
  9: { name: "Lion conquérant", factor: 1.3, tendency: "investit agressivement" },
  10: { name: "Fusée cosmique", factor: 1.4, tendency: "dépense de manière impulsive" }
};

export const useFinancialEngine = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [insight, setInsight] = useState<FinancialInsight | null>(null);

  const calculateInsight = useCallback(async (data: FinancialData): Promise<FinancialInsight> => {
    setIsCalculating(true);
    
    // Simulate calculation delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = totalFixed + totalVariable + totalDebts;
    const netBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

    // Emotional impact calculation
    const moodData = MOOD_MULTIPLIERS[data.mood as keyof typeof MOOD_MULTIPLIERS];
    const emotionallyAdjustedExpenses = totalVariable * moodData.factor;
    const emotionalImpact = Math.abs(emotionallyAdjustedExpenses - totalVariable);

    // Find appropriate comparison
    const comparisonAmount = Math.abs(netBalance);
    const comparison = COMPARISONS.find(c => comparisonAmount >= c.threshold) || COMPARISONS[0];
    const comparisonCount = Math.floor(comparisonAmount / comparison.unit);

    // Generate equation
    const equation = `${totalFixed}€ (fixes) + ${totalVariable.toFixed(0)}€ (variables) × ${moodData.factor} = ${netBalance > 0 ? '+' : ''}${netBalance.toFixed(0)}€`;

    // Generate insight
    const insight = netBalance > 0 
      ? `Votre ${moodData.name} génère un surplus de ${netBalance.toFixed(0)}€ par mois. ${moodData.tendency} favorise votre épargne.`
      : `Votre ${moodData.name} crée un déficit de ${Math.abs(netBalance).toFixed(0)}€ par mois. ${moodData.tendency} amplifie vos dépenses.`;

    // Generate comparison
    const comparisonText = `Votre ${netBalance > 0 ? 'épargne' : 'déficit'} mensuel représente ${comparisonCount} ${comparison.text} ${comparison.emoji}`;

    // Health score calculation
    const healthScore = Math.max(0, Math.min(100, 
      (savingsRate + 20) * 2 + // Base savings contribution
      (totalIncome > totalExpenses ? 20 : -20) + // Positive balance bonus
      (data.mood <= 5 ? 10 : -5) // Emotional stability bonus
    ));

    // Hidden costs detection
    const hiddenCosts = [];
    if (totalVariable > totalIncome * 0.4) {
      hiddenCosts.push("Dépenses variables > 40% du revenu - risque de dépenses impulsives");
    }
    if (data.mood >= 8) {
      hiddenCosts.push("État émotionnel élevé - augmentation de 25% des achats non planifiés");
    }
    if (totalFixed > totalIncome * 0.6) {
      hiddenCosts.push("Charges fixes > 60% du revenu - peu de flexibilité budgétaire");
    }

    // Recommendations
    const recommendations = [];
    if (netBalance < 0) {
      recommendations.push("Réduire les dépenses variables de " + Math.abs(netBalance * 0.5).toFixed(0) + "€");
    }
    if (data.mood >= 8) {
      recommendations.push("Attendre 24h avant tout achat > 50€ (technique anti-impulsivité)");
    }
    if (savingsRate < 10) {
      recommendations.push("Viser 10% d'épargne minimum via virements automatiques");
    }

    const result: FinancialInsight = {
      equation,
      insight,
      comparison: comparisonText,
      emotionalState: `${moodData.name} (${data.mood}/10)`,
      healthScore,
      recommendations,
      hiddenCosts,
      projections: {
        monthly: netBalance,
        yearly: netBalance * 12,
        fiveYear: netBalance * 12 * 5
      }
    };

    setInsight(result);
    setIsCalculating(false);
    return result;
  }, []);

  const calculateWhatIf = useCallback((originalData: FinancialData, changes: Partial<FinancialData>) => {
    // Simulate what-if scenario
    const modifiedData = { ...originalData, ...changes };
    return calculateInsight(modifiedData);
  }, [calculateInsight]);

  return {
    insight,
    isCalculating,
    calculateInsight,
    calculateWhatIf
  };
};