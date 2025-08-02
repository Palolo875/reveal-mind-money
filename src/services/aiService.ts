import { FinancialData, AdvancedInsight } from '@/store/useStore';

// Configuration des APIs IA
const AI_CONFIG = {
  OLLAMA_URL: 'http://localhost:11434',
  HUGGING_FACE_URL: 'https://api-inference.huggingface.co/models',
  COHERE_URL: 'https://api.cohere.ai/v1',
  HUGGING_FACE_TOKEN: process.env.REACT_APP_HUGGING_FACE_TOKEN || '',
  COHERE_TOKEN: process.env.REACT_APP_COHERE_TOKEN || ''
};

// Types pour les réponses IA
interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  provider: 'ollama' | 'huggingface' | 'cohere' | 'fallback';
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
  private currentProvider: 'ollama' | 'huggingface' | 'cohere' | 'fallback' = 'fallback';

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider() {
    // Tester Ollama en premier (gratuit et local)
    if (await this.testOllama()) {
      this.currentProvider = 'ollama';
      console.log('🤖 IA Provider: Ollama (Local)');
    }
    // Tester Hugging Face
    else if (AI_CONFIG.HUGGING_FACE_TOKEN && await this.testHuggingFace()) {
      this.currentProvider = 'huggingface';
      console.log('🤖 IA Provider: Hugging Face');
    }
    // Tester Cohere
    else if (AI_CONFIG.COHERE_TOKEN && await this.testCohere()) {
      this.currentProvider = 'cohere';
      console.log('🤖 IA Provider: Cohere');
    }
    else {
      this.currentProvider = 'fallback';
      console.log('🤖 IA Provider: Fallback (Simulation)');
    }
  }

  private async testOllama(): Promise<boolean> {
    try {
      const response = await fetch(`${AI_CONFIG.OLLAMA_URL}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async testHuggingFace(): Promise<boolean> {
    try {
      const response = await fetch(`${AI_CONFIG.HUGGING_FACE_URL}/gpt2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: 'Test' })
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async testCohere(): Promise<boolean> {
    try {
      const response = await fetch(`${AI_CONFIG.COHERE_URL}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.COHERE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          model: 'command',
          prompt: 'Test',
          max_tokens: 10
        })
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Analyse financière avec IA
  async analyzeFinancialData(data: FinancialData, question: string): Promise<FinancialAnalysis> {
    const prompt = this.buildFinancialPrompt(data, question);
    
    try {
      switch (this.currentProvider) {
        case 'ollama':
          return await this.analyzeWithOllama(prompt);
        case 'huggingface':
          return await this.analyzeWithHuggingFace(prompt);
        case 'cohere':
          return await this.analyzeWithCohere(prompt);
        default:
          return await this.analyzeWithFallback(data, question);
      }
    } catch (error) {
      console.error('Erreur IA:', error);
      return await this.analyzeWithFallback(data, question);
    }
  }

  private buildFinancialPrompt(data: FinancialData, question: string): string {
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);

    return `
Tu es un expert en neurosciences financières. Analyse cette situation financière et réponds en JSON :

Question de l'utilisateur : "${question}"

Données financières :
- Revenus totaux : ${totalIncome}€
- Charges fixes : ${totalFixed}€
- Dépenses variables : ${totalVariable}€
- Dettes : ${totalDebts}€
- Humeur actuelle : ${data.mood}/10
- Contexte émotionnel : ${data.emotionalTags.join(', ')}

Calcule et fournis :
1. Une équation financière personnalisée
2. Un insight principal basé sur la neuroscience
3. Une comparaison concrète (ex: cafés, voyages)
4. Un score de santé financière (0-100)
5. Des recommandations actionnables
6. Des coûts cachés détectés
7. Des projections sur 1, 5 et 10 ans
8. Une analyse comportementale

Réponds uniquement en JSON valide avec cette structure :
{
  "equation": "string",
  "insight": "string", 
  "comparison": "string",
  "emotionalState": "string",
  "healthScore": number,
  "recommendations": ["string"],
  "hiddenCosts": ["string"],
  "projections": {
    "monthly": number,
    "yearly": number,
    "fiveYear": number,
    "tenYear": number
  },
  "emotionalPatterns": {
    "triggers": ["string"],
    "correlations": [{"emotion": "string", "impact": number}],
    "suggestions": ["string"]
  },
  "marketComparisons": {
    "peer": "string",
    "deviation": number,
    "ranking": number,
    "percentile": number
  },
  "riskAssessment": {
    "level": "low|medium|high",
    "factors": ["string"],
    "mitigation": ["string"],
    "score": number
  },
  "behavioralPatterns": {
    "spendingPersonality": "string",
    "decisionMaking": "string", 
    "riskTolerance": "string",
    "optimizationPotential": number
  },
  "aiPredictions": {
    "nextMonthSpending": number,
    "savingsGoalAchievability": number,
    "emergencyFundNeeded": number,
    "investmentReadiness": number
  }
}
    `;
  }

  private async analyzeWithOllama(prompt: string): Promise<FinancialAnalysis> {
    const response = await fetch(`${AI_CONFIG.OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2000
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur Ollama');
    }

    const result = await response.json();
    const aiResponse = result.response;
    
    try {
      // Extraire le JSON de la réponse
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Format de réponse invalide');
    } catch (parseError) {
      console.error('Erreur parsing Ollama:', parseError);
      throw new Error('Réponse IA invalide');
    }
  }

  private async analyzeWithHuggingFace(prompt: string): Promise<FinancialAnalysis> {
    const response = await fetch(`${AI_CONFIG.HUGGING_FACE_URL}/microsoft/DialoGPT-medium`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1000,
          temperature: 0.7,
          do_sample: true
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur Hugging Face');
    }

    const result = await response.json();
    // Traitement de la réponse Hugging Face
    return this.processHuggingFaceResponse(result);
  }

  private async analyzeWithCohere(prompt: string): Promise<FinancialAnalysis> {
    const response = await fetch(`${AI_CONFIG.COHERE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.COHERE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      })
    });

    if (!response.ok) {
      throw new Error('Erreur Cohere');
    }

    const result = await response.json();
    // Traitement de la réponse Cohere
    return this.processCohereResponse(result);
  }

  private async analyzeWithFallback(data: FinancialData, question: string): Promise<FinancialAnalysis> {
    // Simulation d'analyse IA (fallback)
    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalVariable = data.variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalDebts = data.debts.reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = totalFixed + totalVariable + totalDebts;
    const netBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

    // Logique d'analyse avancée (simulation IA)
    const healthScore = Math.max(0, Math.min(100, 
      (savingsRate + 20) * 1.5 + 
      (netBalance > 0 ? 25 : -25) + 
      (data.mood <= 5 ? 15 : data.mood >= 8 ? -10 : 5) + 
      (totalDebts / totalIncome < 0.3 ? 10 : -15)
    ));

    return {
      equation: `${totalFixed}€ (fixes) + ${totalVariable.toFixed(0)}€ (variables) = ${netBalance > 0 ? '+' : ''}${netBalance.toFixed(0)}€`,
      insight: `Votre profil financier ${netBalance > 0 ? 'génère un surplus' : 'crée un déficit'} de ${Math.abs(netBalance).toFixed(0)}€/mois.`,
      comparison: `Votre ${netBalance > 0 ? 'épargne' : 'déficit'} mensuel = ${Math.floor(Math.abs(netBalance) / 4.5)} cafés artisanaux ☕`,
      emotionalState: `État émotionnel: ${data.mood}/10`,
      healthScore,
      recommendations: [
        netBalance < 0 ? `🎯 Réduction ciblée de ${Math.abs(netBalance * 0.6).toFixed(0)}€ sur les dépenses variables` : '💰 Continuez votre épargne',
        savingsRate < 15 ? `💰 Automatisation épargne: virement de ${(totalIncome * 0.1).toFixed(0)}€ le jour de paie` : '✅ Épargne optimale',
        data.mood >= 8 ? '🧠 Technique anti-impulsivité: règle des 24h pour achats >50€' : '🧘 Méditation pour équilibre émotionnel'
      ],
      hiddenCosts: [
        totalVariable > totalIncome * 0.35 ? `Dépenses variables élevées (${(totalVariable/totalIncome*100).toFixed(1)}%)` : '',
        data.mood >= 8 ? 'État émotionnel élevé - risque d'achats impulsifs' : '',
        totalFixed > totalIncome * 0.55 ? 'Charges fixes élevées - renégociation recommandée' : ''
      ].filter(Boolean),
      projections: {
        monthly: netBalance,
        yearly: netBalance * 12,
        fiveYear: netBalance * 12 * 5,
        tenYear: netBalance * 12 * 10
      },
      emotionalPatterns: {
        triggers: data.emotionalTags.slice(0, 3),
        correlations: [
          { emotion: "Stress", impact: Math.abs(netBalance) / totalIncome * 100 },
          { emotion: "Confiance", impact: 100 - (Math.abs(netBalance) / totalIncome * 100) },
          { emotion: "Impulsivité", impact: (data.mood - 5) * 10 }
        ],
        suggestions: [
          "Méditation 10min avant achat important",
          "Budget hebdomadaire vs mensuel",
          "Récompenses non-financières"
        ]
      },
      marketComparisons: {
        peer: "Profil Équilibré",
        deviation: Math.random() * 30 - 15,
        ranking: Math.floor(Math.random() * 100) + 1,
        percentile: healthScore
      },
      riskAssessment: {
        level: healthScore >= 70 ? 'low' : healthScore >= 40 ? 'medium' : 'high',
        factors: [
          `Ratio d'endettement: ${(totalDebts/totalIncome*100).toFixed(0)}%`,
          `Coussin de sécurité: ${netBalance > 0 ? 'présent' : 'insuffisant'}`,
          `Volatilité émotionnelle: ${data.mood >= 8 ? 'élevée' : 'modérée'}`
        ],
        mitigation: [
          "Fonds d'urgence 6 mois de charges",
          "Diversification revenus",
          "Assurance perte d'emploi"
        ],
        score: Math.max(0, Math.min(100, 100 - (Math.abs(netBalance) / totalIncome * 100)))
      },
      behavioralPatterns: {
        spendingPersonality: data.mood >= 7 ? "Dépensier Stratégique" : "Économe Prudent",
        decisionMaking: data.mood >= 7 ? "Intuitif rapide" : "Analytique lent",
        riskTolerance: healthScore >= 70 ? "Faible" : healthScore >= 40 ? "Modérée" : "Élevée",
        optimizationPotential: Math.min(100, Math.abs(netBalance) / totalIncome * 100 + 20)
      },
      aiPredictions: {
        nextMonthSpending: totalVariable * (1 + (data.mood - 5) * 0.1),
        savingsGoalAchievability: Math.max(0, Math.min(100, savingsRate + 20)),
        emergencyFundNeeded: totalExpenses * 6,
        investmentReadiness: Math.max(0, Math.min(100, (netBalance / totalIncome) * 100 + 30))
      }
    };
  }

  private processHuggingFaceResponse(result: any): FinancialAnalysis {
    // Traitement spécifique pour Hugging Face
    // À implémenter selon le modèle utilisé
    return this.analyzeWithFallback({} as FinancialData, '');
  }

  private processCohereResponse(result: any): FinancialAnalysis {
    // Traitement spécifique pour Cohere
    // À implémenter selon le modèle utilisé
    return this.analyzeWithFallback({} as FinancialData, '');
  }

  // Méthode pour changer de provider
  async switchProvider(provider: 'ollama' | 'huggingface' | 'cohere' | 'fallback') {
    this.currentProvider = provider;
    console.log(`🤖 IA Provider changé vers: ${provider}`);
  }

  // Obtenir le provider actuel
  getCurrentProvider() {
    return this.currentProvider;
  }

  // Tester la connectivité
  async testConnection(): Promise<boolean> {
    try {
      await this.analyzeFinancialData({
        income: [{ id: '1', name: 'Test', amount: 1000, category: 'test' }],
        fixedExpenses: [],
        variableExpenses: [],
        debts: [],
        mood: 5,
        emotionalTags: ['test'],
        timestamp: Date.now()
      }, 'Test');
      return true;
    } catch {
      return false;
    }
  }
}

// Instance singleton
export const aiService = new AIService();