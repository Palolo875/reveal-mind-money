import { 
  validateFinancialData, 
  sanitizeString, 
  validateAmount, 
  validateDate, 
  validateEmotionalTags, 
  validateCategory,
  validateFinancialItem 
} from '@/lib/validation';

describe('Validation System', () => {
  describe('validateFinancialData', () => {
    const validData = {
      income: [
        { id: '1', name: 'Salaire', amount: 3000, category: 'salaire', isRecurring: true }
      ],
      fixedExpenses: [
        { id: '2', name: 'Loyer', amount: 1200, category: 'logement', isRecurring: true }
      ],
      variableExpenses: [
        { id: '3', name: 'Courses', amount: 400, category: 'alimentation' }
      ],
      debts: [],
      mood: 7,
      emotionalTags: ['stress', 'satisfaction'],
      timestamp: Date.now()
    };

    it('devrait valider des données correctes', () => {
      const result = validateFinancialData(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
      expect(result.errors).toHaveLength(0);
    });

    it('devrait rejeter un mood invalide', () => {
      const invalidData = { ...validData, mood: 15 };
      const result = validateFinancialData(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('devrait rejeter trop de revenus', () => {
      const manyIncomes = Array.from({ length: 60 }, (_, i) => ({
        id: `income-${i}`,
        name: `Revenu ${i}`,
        amount: 100,
        category: 'salaire'
      }));
      const invalidData = { ...validData, income: manyIncomes };
      const result = validateFinancialData(invalidData);
      expect(result.success).toBe(false);
    });

    it('devrait rejeter des montants négatifs', () => {
      const invalidData = {
        ...validData,
        income: [{ id: '1', name: 'Test', amount: -100, category: 'salaire' }]
      };
      const result = validateFinancialData(invalidData);
      expect(result.success).toBe(false);
    });

    it('devrait limiter les tags émotionnels', () => {
      const manyTags = Array.from({ length: 15 }, (_, i) => `tag${i}`);
      const invalidData = { ...validData, emotionalTags: manyTags };
      const result = validateFinancialData(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('devrait nettoyer les caractères dangereux', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeString(input);
      expect(result).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('devrait préserver les caractères normaux', () => {
      const input = 'Salaire principal 2024';
      const result = sanitizeString(input);
      expect(result).toBe('Salaire principal 2024');
    });

    it('devrait limiter la longueur', () => {
      const longInput = 'a'.repeat(2000);
      const result = sanitizeString(longInput);
      expect(result.length).toBe(1000);
    });

    it('devrait supprimer les espaces de début et fin', () => {
      const input = '  test  ';
      const result = sanitizeString(input);
      expect(result).toBe('test');
    });
  });

  describe('validateAmount', () => {
    it('devrait valider un montant correct', () => {
      expect(validateAmount(100.50)).toBe(100.50);
      expect(validateAmount('250')).toBe(250);
      expect(validateAmount('99.99')).toBe(99.99);
    });

    it('devrait rejeter les montants négatifs', () => {
      expect(validateAmount(-10)).toBeNull();
      expect(validateAmount('-50')).toBeNull();
    });

    it('devrait rejeter les montants trop élevés', () => {
      expect(validateAmount(20000000)).toBeNull();
    });

    it('devrait rejeter les valeurs non numériques', () => {
      expect(validateAmount('abc')).toBeNull();
      expect(validateAmount(null)).toBeNull();
      expect(validateAmount(undefined)).toBeNull();
    });

    it('devrait arrondir à 2 décimales', () => {
      expect(validateAmount(99.999)).toBe(100);
      expect(validateAmount(50.556)).toBe(50.56);
    });
  });

  describe('validateDate', () => {
    it('devrait valider une date correcte', () => {
      const validDate = '2024-01-15';
      expect(validateDate(validDate)).toBe(validDate);
    });

    it('devrait rejeter un format invalide', () => {
      expect(validateDate('15/01/2024')).toBeNull();
      expect(validateDate('2024-1-15')).toBeNull();
      expect(validateDate('abc')).toBeNull();
    });

    it('devrait rejeter les dates trop anciennes', () => {
      expect(validateDate('2010-01-01')).toBeNull();
    });

    it('devrait rejeter les dates trop futures', () => {
      expect(validateDate('2030-01-01')).toBeNull();
    });

    it('devrait rejeter les types non-string', () => {
      expect(validateDate(123)).toBeNull();
      expect(validateDate(new Date())).toBeNull();
    });
  });

  describe('validateEmotionalTags', () => {
    it('devrait valider des tags corrects', () => {
      const result = validateEmotionalTags(['stress', 'joie', 'satisfaction']);
      expect(result).toEqual(['stress', 'joie', 'satisfaction']);
    });

    it('devrait filtrer les tags invalides', () => {
      const result = validateEmotionalTags(['stress', 'tagInvalide', 'joie']);
      expect(result).toEqual(['stress', 'joie']);
    });

    it('devrait convertir en minuscules', () => {
      const result = validateEmotionalTags(['STRESS', 'Joie', 'SATISFACTION']);
      expect(result).toEqual(['stress', 'joie', 'satisfaction']);
    });

    it('devrait limiter à 10 tags', () => {
      const manyTags = ['stress', 'joie', 'anxiété', 'satisfaction', 'frustration', 
                       'optimisme', 'peur', 'confiance', 'regret', 'fierté', 
                       'inquiétude', 'sérénité'];
      const result = validateEmotionalTags(manyTags);
      expect(result.length).toBe(10);
    });

    it('devrait gérer les entrées non-array', () => {
      expect(validateEmotionalTags('stress')).toEqual([]);
      expect(validateEmotionalTags(null)).toEqual([]);
      expect(validateEmotionalTags(undefined)).toEqual([]);
    });
  });

  describe('validateCategory', () => {
    it('devrait valider des catégories correctes', () => {
      expect(validateCategory('salaire')).toBe('salaire');
      expect(validateCategory('logement')).toBe('logement');
      expect(validateCategory('alimentation')).toBe('alimentation');
    });

    it('devrait convertir en minuscules', () => {
      expect(validateCategory('SALAIRE')).toBe('salaire');
      expect(validateCategory('Logement')).toBe('logement');
    });

    it('devrait rejeter des catégories invalides', () => {
      expect(validateCategory('catégorieInexistante')).toBeNull();
      expect(validateCategory('hacking')).toBeNull();
    });

    it('devrait gérer les types non-string', () => {
      expect(validateCategory(123)).toBeNull();
      expect(validateCategory(null)).toBeNull();
    });
  });

  describe('validateFinancialItem', () => {
    const validItem = {
      id: 'test-id',
      name: 'Test Item',
      amount: 100,
      category: 'salaire'
    };

    it('devrait valider un item correct', () => {
      const result = validateFinancialItem(validItem);
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        id: 'test-id',
        name: 'Test Item',
        amount: 100,
        category: 'salaire',
        isRecurring: false
      });
    });

    it('devrait rejeter un item sans ID', () => {
      const invalidItem = { ...validItem, id: '' };
      const result = validateFinancialItem(invalidItem);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('ID manquant ou invalide');
    });

    it('devrait rejeter un item sans nom', () => {
      const invalidItem = { ...validItem, name: '' };
      const result = validateFinancialItem(invalidItem);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Nom manquant ou invalide');
    });

    it('devrait rejeter un montant invalide', () => {
      const invalidItem = { ...validItem, amount: -50 };
      const result = validateFinancialItem(invalidItem);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Montant invalide');
    });

    it('devrait rejeter une catégorie invalide', () => {
      const invalidItem = { ...validItem, category: 'invalid' };
      const result = validateFinancialItem(invalidItem);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Catégorie invalide');
    });

    it('devrait nettoyer le nom', () => {
      const itemWithScript = { ...validItem, name: '<script>alert("xss")</script>' };
      const result = validateFinancialItem(itemWithScript);
      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('devrait gérer les entrées non-objet', () => {
      expect(validateFinancialItem('string').success).toBe(false);
      expect(validateFinancialItem(null).success).toBe(false);
      expect(validateFinancialItem(123).success).toBe(false);
    });
  });
});