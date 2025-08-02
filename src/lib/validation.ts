import { z } from 'zod';

// Schémas de validation Zod
export const FinancialItemSchema = z.object({
  id: z.string().min(1, 'ID requis'),
  name: z.string().min(1, 'Nom requis').max(100, 'Nom trop long'),
  amount: z.number().min(0, 'Le montant doit être positif').max(1000000, 'Montant trop élevé'),
  category: z.string().min(1, 'Catégorie requise').max(50, 'Catégorie trop longue'),
  date: z.string().optional(),
  isRecurring: z.boolean().optional()
});

export const FinancialDataSchema = z.object({
  income: z.array(FinancialItemSchema).max(50, 'Trop de revenus'),
  fixedExpenses: z.array(FinancialItemSchema).max(50, 'Trop de dépenses fixes'),
  variableExpenses: z.array(FinancialItemSchema).max(100, 'Trop de dépenses variables'),
  debts: z.array(FinancialItemSchema).max(20, 'Trop de dettes'),
  mood: z.number().min(1).max(10),
  emotionalTags: z.array(z.string()).max(10, 'Trop de tags émotionnels'),
  timestamp: z.number().positive()
});

export const UserPreferencesSchema = z.object({
  theme: z.string().min(1),
  soundEnabled: z.boolean(),
  animationsEnabled: z.boolean(),
  darkMode: z.boolean().optional()
});

// Validation pour les inputs utilisateur
export const validateFinancialData = (data: unknown) => {
  try {
    return {
      success: true as const,
      data: FinancialDataSchema.parse(data),
      errors: []
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        data: null,
        errors: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false as const,
      data: null,
      errors: [{ path: 'unknown', message: 'Erreur de validation inconnue' }]
    };
  }
};

// Sanitisation des inputs pour prévenir XSS
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>'"&]/g, (char) => {
      const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return map[char] || char;
    })
    .trim()
    .substring(0, 1000); // Limite la longueur
};

// Validation des montants financiers
export const validateAmount = (amount: unknown): number | null => {
  if (typeof amount !== 'number') {
    const parsed = parseFloat(String(amount));
    if (isNaN(parsed)) return null;
    amount = parsed;
  }
  
  if (amount < 0 || amount > 10000000) return null;
  return Math.round(amount * 100) / 100; // Arrondi à 2 décimales
};

// Validation des dates
export const validateDate = (date: unknown): string | null => {
  if (typeof date !== 'string') return null;
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return null;
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return null;
  
  // Vérifie que la date n'est pas trop ancienne ou future
  const now = new Date();
  const minDate = new Date(now.getFullYear() - 10, 0, 1);
  const maxDate = new Date(now.getFullYear() + 2, 11, 31);
  
  if (parsedDate < minDate || parsedDate > maxDate) return null;
  
  return date;
};

// Validation des tags émotionnels
const allowedEmotionalTags = [
  'stress', 'joie', 'anxiété', 'satisfaction', 'frustration', 'optimisme',
  'peur', 'confiance', 'regret', 'fierté', 'inquiétude', 'sérénité',
  'colère', 'espoir', 'déception', 'gratitude', 'impatience', 'détermination'
];

export const validateEmotionalTags = (tags: unknown): string[] => {
  if (!Array.isArray(tags)) return [];
  
  return tags
    .filter((tag): tag is string => typeof tag === 'string')
    .map(tag => tag.toLowerCase().trim())
    .filter(tag => allowedEmotionalTags.includes(tag))
    .slice(0, 10); // Limite à 10 tags
};

// Validation des catégories
const allowedCategories = [
  'salaire', 'freelance', 'investissement', 'autre',
  'logement', 'transport', 'alimentation', 'santé', 'loisirs',
  'éducation', 'vêtements', 'services', 'abonnements', 'taxes',
  'prêt immobilier', 'prêt auto', 'crédit consommation', 'découvert'
];

export const validateCategory = (category: unknown): string | null => {
  if (typeof category !== 'string') return null;
  
  const cleaned = category.toLowerCase().trim();
  return allowedCategories.includes(cleaned) ? cleaned : null;
};

// Fonction de validation complète pour un item financier
export const validateFinancialItem = (item: unknown) => {
  if (typeof item !== 'object' || item === null) {
    return { success: false, errors: ['Item invalide'] };
  }
  
  const obj = item as Record<string, unknown>;
  const errors: string[] = [];
  
  // Validation ID
  if (!obj.id || typeof obj.id !== 'string' || obj.id.trim().length === 0) {
    errors.push('ID manquant ou invalide');
  }
  
  // Validation nom
  if (!obj.name || typeof obj.name !== 'string') {
    errors.push('Nom manquant ou invalide');
  } else {
    const sanitized = sanitizeString(obj.name);
    if (sanitized.length === 0) {
      errors.push('Nom vide après nettoyage');
    }
  }
  
  // Validation montant
  const validAmount = validateAmount(obj.amount);
  if (validAmount === null) {
    errors.push('Montant invalide');
  }
  
  // Validation catégorie
  const validCategory = validateCategory(obj.category);
  if (!validCategory) {
    errors.push('Catégorie invalide');
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  return {
    success: true,
    data: {
      id: String(obj.id).trim(),
      name: sanitizeString(String(obj.name)),
      amount: validAmount!,
      category: validCategory!,
      date: obj.date ? validateDate(obj.date) : undefined,
      isRecurring: typeof obj.isRecurring === 'boolean' ? obj.isRecurring : false
    }
  };
};

// Export des types pour TypeScript
export type ValidatedFinancialData = z.infer<typeof FinancialDataSchema>;
export type ValidatedFinancialItem = z.infer<typeof FinancialItemSchema>;
export type ValidatedUserPreferences = z.infer<typeof UserPreferencesSchema>;