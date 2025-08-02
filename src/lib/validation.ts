import { z } from 'zod';

// Schema de validation pour les données financières
export const FinancialItemSchema = z.object({
  id: z.string().min(1, "ID requis"),
  name: z.string().min(1, "Nom requis").max(100, "Nom trop long"),
  amount: z.number().min(0, "Montant doit être positif").max(1000000, "Montant trop élevé"),
  category: z.string().min(1, "Catégorie requise"),
  date: z.string().optional(),
  isRecurring: z.boolean().optional()
});

export const FinancialDataSchema = z.object({
  income: z.array(FinancialItemSchema).min(1, "Au moins un revenu requis"),
  fixedExpenses: z.array(FinancialItemSchema),
  variableExpenses: z.array(FinancialItemSchema),
  debts: z.array(FinancialItemSchema),
  mood: z.number().min(1, "Humeur invalide").max(10, "Humeur invalide"),
  emotionalTags: z.array(z.string()).max(10, "Trop de tags émotionnels"),
  timestamp: z.number().positive("Timestamp invalide")
});

export const QuestionSchema = z.object({
  question: z.string().min(10, "Question trop courte").max(500, "Question trop longue")
});

// Fonction de validation sécurisée
export const validateFinancialData = (data: unknown) => {
  try {
    return FinancialDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Données invalides: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error('Erreur de validation inconnue');
  }
};

export const validateQuestion = (question: unknown) => {
  try {
    return QuestionSchema.parse({ question });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Question invalide: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error('Erreur de validation inconnue');
  }
};

// Fonction de nettoyage des données
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprime les balises HTML
    .replace(/javascript:/gi, '') // Supprime les protocoles dangereux
    .substring(0, 1000); // Limite la longueur
};

// Fonction de chiffrement simple pour les données sensibles
export const encryptSensitiveData = (data: string): string => {
  // En production, utiliser une vraie bibliothèque de chiffrement
  return btoa(encodeURIComponent(data));
};

export const decryptSensitiveData = (encryptedData: string): string => {
  try {
    return decodeURIComponent(atob(encryptedData));
  } catch {
    throw new Error('Données chiffrées invalides');
  }
};