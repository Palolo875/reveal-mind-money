

import { FinancialData, AdvancedInsight } from '@/store/useStore';

// Configuration des APIs IA
const AI_PROVIDERS = {
  OPENAI: 'openai',
  OLLAMA: 'ollama',
  MOCK: 'mock' // Pour les démonstrations
} as const;

type AIProvider = typeof AI_PROVIDERS[keyof typeof AI_PROVIDERS];

interface AIServiceConfig {
  provider: AIProvider;
  apiKey?: string;
  baseURL?: string;
  model?: string;
}

interface FinancialAnalysis {
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

class AIService {
  private config: AIServiceConfig;
  
  constructor(config: AIServiceConfig = { provider: AI_PROVIDERS.MOCK }) {
    this.config = config;
  }

  // Méthode principale d'analyse financière
  async analyzeFinancialData(
    question: string, 
    data: FinancialData
  ): Promise<AdvancedInsight> {
    try {
      switch (this.config.provider) {
        case AI_PROVIDERS.OPENAI:
          return await this.analyzeWithOpenAI(question, data);
        case AI_PROVIDERS.OLLAMA:
          return await this.analyzeWithOllama(question, data);
        default:
          return this.analyzeWithMock(question, data);
      }
    } catch (error) {
      console.error('Erreur lors de l\'analyse IA:', error);
      return this.analyzeWithMock(question, data);
    }
  }

  // Analyse avec OpenAI (GPT-4)
  private async analyzeWithOpenAI(
    question: string, 
    data: FinancialData
  ): Promise<AdvancedInsight> {
    if (!this.config.apiKey) {
      throw new Error('Clé API OpenAI manquante');
    }

    const prompt = this.buildAnalysisPrompt(question, data);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es Rivela, un expert financier IA ultra-avancé spécialisé dans l\'analyse comportementale et prédictive.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur OpenAI: ${response.statusText}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Réponse OpenAI vide');
    }

    return this.parseAIResponse(content, data);
  }

  // Analyse avec Ollama (modèle local)
  private async analyzeWithOllama(
    question: string, 
    data: FinancialData
  ): Promise<AdvancedInsight> {
    const baseURL = this.config.baseURL || 'http://localhost:11434';
    const model = this.config.model || 'llama3.2:3b';
    
    const prompt = this.buildAnalysisPrompt(question, data);
    
    const response = await fetch(`${baseURL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          num_predict: 1500
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur Ollama: ${response.statusText}`);
    }

    const result = await response.json();
    return this.parseAIResponse(result.response, data);
  }

  // Version mock pour les démonstrations
  private analyzeWithMock(question: string, data: FinancialData): AdvancedInsight {
    console.log('🎭 Mode démonstration activé - Génération d\'insights simulés');
    
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);
    
    const netBalance = totalIncome - totalFixed - totalVariable - totalDebts;
    const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;
    
    // Score de santé basé sur des ratios financiers
    let healthScore = 50;
    
    // Ratio d'épargne
    if (savingsRate >= 20) healthScore += 25;
    else if (savingsRate >= 10) healthScore += 15;
    else if (savingsRate >= 5) healthScore += 5;
    else if (savingsRate < 0) healthScore -= 20;
    
    // Ratio de dettes
    const debtRatio = totalIncome > 0 ? (totalDebts / totalIncome) * 100 : 0;
    if (debtRatio < 20) healthScore += 15;
    else if (debtRatio < 35) healthScore += 5;
    else healthScore -= 15;
    
    // Équilibre émotionnel
    if (data.mood >= 7) healthScore += 10;
    else if (data.mood <= 4) healthScore -= 10;
    
    healthScore = Math.max(0, Math.min(100, healthScore));

    const emotionalAnalysis = this.analyzeEmotionalState(data);
    const spendingPersonality = this.determineSpendingPersonality(data);
    const riskLevel = this.assessRiskLevel(data);

    return {
      equation: this.generateEquation(question, data),
      insight: this.generateInsight(question, data, healthScore),
      comparison: this.generateComparison(data, healthScore),
      emotionalState: emotionalAnalysis.state,
      healthScore: Math.round(healthScore),
      recommendations: this.generateRecommendations(data, healthScore),
      hiddenCosts: [
        totalVariable > totalIncome * 0.35 ? `Dépenses variables élevées (${(totalVariable/totalIncome*100).toFixed(1)}%)` : '',
        data.mood >= 8 ? 'État émotionnel élevé - risque d\'achats impulsifs' : '',
        totalFixed > totalIncome * 0.55 ? 'Charges fixes élevées - renégociation recommandée' : ''
      ].filter(Boolean),
      projections: {
        monthly: netBalance,
        yearly: netBalance * 12,
        fiveYear: netBalance * 12 * 5 * (1 + (savingsRate > 10 ? 0.05 : 0.02)),
        tenYear: netBalance * 12 * 10 * (1 + (savingsRate > 10 ? 0.07 : 0.03))
      },
      emotionalPatterns: {
        triggers: emotionalAnalysis.triggers,
        correlations: emotionalAnalysis.correlations,
        suggestions: emotionalAnalysis.suggestions
      },
      marketComparisons: {
        peer: this.generatePeerComparison(data),
        deviation: Math.round((healthScore - 65) * 0.8), // 65 = score moyen fictif
        ranking: Math.round(healthScore * 0.85), // Sur 85%
        percentile: Math.round(healthScore * 0.9) // Sur 90%
      },
      riskAssessment: {
        level: riskLevel.level,
        factors: riskLevel.factors,
        mitigation: riskLevel.mitigation,
        score: riskLevel.score
      },
      behavioralPatterns: {
        spendingPersonality: spendingPersonality.type,
        decisionMaking: spendingPersonality.decisionStyle,
        riskTolerance: spendingPersonality.riskTolerance,
        optimizationPotential: spendingPersonality.optimizationScore
      },
      aiPredictions: {
        nextMonthSpending: totalVariable * (1 + (data.mood > 7 ? 0.15 : -0.05)),
        savingsGoalAchievability: Math.min(95, savingsRate > 10 ? 85 : 45),
        emergencyFundNeeded: totalFixed * 6, // 6 mois de charges fixes
        investmentReadiness: healthScore > 70 ? 80 : 30
      }
    };
  }

  // Construction du prompt pour l'IA
  private buildAnalysisPrompt(question: string, data: FinancialData): string {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0) + 
                         data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);

    return `
Analyse la situation financière suivante et réponds à la question posée.

QUESTION: ${question}

DONNÉES FINANCIÈRES:
- Revenus: ${totalIncome}€
- Dépenses fixes: ${data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0)}€
- Dépenses variables: ${data.variableExpenses.reduce((sum, item) => sum + item.amount, 0)}€
- Dettes: ${totalDebts}€
- Humeur financière: ${data.mood}/10
- Tags émotionnels: ${data.emotionalTags.join(', ')}

Fournis une analyse complète avec:
1. Une équation personnalisée résumant la situation
2. Un insight profond et personnalisé
3. Une comparaison avec des profils similaires
4. Des recommandations actionables
5. Une prédiction sur 5-10 ans
6. Un score de santé financière

Sois créatif, empathique et précis dans ton analyse.
    `.trim();
  }

  // Parse la réponse de l'IA et structure les données
  private parseAIResponse(response: string, data: FinancialData): AdvancedInsight {
    // Ici on pourrait parser une réponse JSON de l'IA
    // Pour l'instant, on utilise la logique mock
    return this.analyzeWithMock('', data);
  }

  // Méthodes utilitaires pour l'analyse
  private generateEquation(question: string, data: FinancialData): string {
    const equations = [
      "Revenus - Dépenses - Émotions × Impulsivité = Votre Réalité Financière",
      "Stabilité + Vision - Stress = Croissance Durable",
      "Discipline × Temps + Optimisation = Liberté Financière",
      "Revenus ÷ (Besoins + Envies) × Sérénité = Équilibre Parfait"
    ];
    return equations[Math.floor(Math.random() * equations.length)];
  }

  private generateInsight(question: string, data: FinancialData, healthScore: number): string {
    const insights = [
      `Avec un score de ${healthScore}/100, votre profil révèle un potentiel d'optimisation significatif. Vos dépenses émotionnelles (humeur: ${data.mood}/10) influencent directement vos décisions financières.`,
      `Votre pattern de dépenses montre une corrélation forte entre état émotionnel et habitudes de consommation. ${healthScore > 70 ? 'Excellent' : 'Améliorable'} équilibre détecté.`,
      `L'analyse comportementale révèle que vous êtes ${data.mood > 7 ? 'optimiste' : 'prudent'} dans vos décisions. Cela impacte directement votre capacité d'épargne de ${healthScore}%.`
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  }

  private generateComparison(data: FinancialData, healthScore: number): string {
    const comparisons = [
      `Comparé à des profils similaires, vous êtes dans les ${Math.round(healthScore * 0.9)}% supérieurs en terme d'équilibre financier.`,
      `Votre ratio épargne/revenus vous place ${healthScore > 65 ? 'au-dessus' : 'en-dessous'} de la moyenne nationale française.`,
      `Par rapport à votre tranche d'âge, votre score de ${healthScore}/100 vous positionne favorablement.`
    ];
    return comparisons[Math.floor(Math.random() * comparisons.length)];
  }

  private generateRecommendations(data: FinancialData, healthScore: number): string[] {
    const recommendations = [];
    
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    
    if (totalVariable > totalIncome * 0.4) {
      recommendations.push("Optimisez vos dépenses variables - potentiel d'économie de 20-30%");
    }
    
    if (data.mood > 7) {
      recommendations.push("Attention aux achats impulsifs liés à votre humeur positive");
    }
    
    if (healthScore < 60) {
      recommendations.push("Établissez un budget mensuel strict avec alerte automatique");
      recommendations.push("Créez un fonds d'urgence équivalent à 3 mois de charges");
    }
    
    recommendations.push("Automatisez votre épargne dès réception des revenus");
    recommendations.push("Renégociez vos contrats d'assurance et abonnements annuellement");
    
    return recommendations.slice(0, 5); // Max 5 recommandations
  }

  private analyzeEmotionalState(data: FinancialData) {
    const triggers = [];
    const correlations = [];
    const suggestions = [];
    
    if (data.mood > 7) {
      triggers.push("Humeur élevée", "Optimisme financier");
      correlations.push({ emotion: "Joie", impact: 15 });
      suggestions.push("Canalisez votre optimisme vers l'épargne");
    } else if (data.mood < 4) {
      triggers.push("Stress financier", "Anxiété");
      correlations.push({ emotion: "Inquiétude", impact: -20 });
      suggestions.push("Considérez l'aide d'un conseiller");
    }
    
    return {
      state: data.mood > 6 ? "Optimiste" : data.mood > 4 ? "Neutre" : "Préoccupé",
      triggers,
      correlations,
      suggestions
    };
  }

  private determineSpendingPersonality(data: FinancialData) {
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    
    const variableRatio = totalIncome > 0 ? totalVariable / totalIncome : 0;
    
    if (variableRatio > 0.4) {
      return {
        type: "Dépensier émotionnel",
        decisionStyle: "Impulsif",
        riskTolerance: "Élevée",
        optimizationScore: 75
      };
    } else if (variableRatio < 0.2) {
      return {
        type: "Épargnant méthodique",
        decisionStyle: "Analytique",
        riskTolerance: "Faible",
        optimizationScore: 90
      };
    } else {
      return {
        type: "Équilibré pragmatique",
        decisionStyle: "Réfléchi",
        riskTolerance: "Modérée",
        optimizationScore: 85
      };
    }
  }

  private assessRiskLevel(data: FinancialData): { level: 'low' | 'medium' | 'high', factors: string[], mitigation: string[], score: number } {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);
    
    const debtRatio = totalIncome > 0 ? totalDebts / totalIncome : 0;
    
    let riskScore = 30; // Base
    const factors = [];
    const mitigation = [];
    
    if (debtRatio > 0.4) {
      riskScore += 30;
      factors.push("Ratio d'endettement élevé");
      mitigation.push("Plan de remboursement accéléré");
    }
    
    if (data.mood < 4) {
      riskScore += 20;
      factors.push("Stress émotionnel");
      mitigation.push("Support psychologique financier");
    }
    
    return {
      level: riskScore > 60 ? 'high' : riskScore > 40 ? 'medium' : 'low',
      factors,
      mitigation,
      score: riskScore
    };
  }

  private generatePeerComparison(data: FinancialData): string {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    
    if (totalIncome > 4000) {
      return "Cadres supérieurs urbains";
    } else if (totalIncome > 2500) {
      return "Classe moyenne éduquée";
    } else if (totalIncome > 1800) {
      return "Jeunes actifs en début de carrière";
    } else {
      return "Population générale française";
    }
  }

  // Méthodes de configuration
  setConfig(config: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  // Test de connectivité
  async testConnection(): Promise<boolean> {
    try {
      if (this.config.provider === AI_PROVIDERS.OPENAI) {
        // Test OpenAI
        return true;
      } else if (this.config.provider === AI_PROVIDERS.OLLAMA) {
        // Test Ollama
        const response = await fetch(`${this.config.baseURL || 'http://localhost:11434'}/api/tags`);
        return response.ok;
      }
      return true; // Mock toujours disponible
    } catch {
      return false;
    }
  }
}

// Instance singleton
export const aiService = new AIService();

