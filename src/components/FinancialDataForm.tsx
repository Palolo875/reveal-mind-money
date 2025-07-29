import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';

interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

interface FinancialDataFormProps {
  onDataSubmit: (data: {
    income: FinancialItem[];
    fixedExpenses: FinancialItem[];
    variableExpenses: FinancialItem[];
    debts: FinancialItem[];
    mood: number;
    emotionalTags: string[];
  }) => void;
}

const EMOTION_TAGS = [
  "Stress au travail", "Événement familial", "Pression financière", 
  "Objectif proche", "Incertitude", "Confiance", "Fatigue", "Motivation"
];

const MOOD_ARCHETYPES = {
  1: "🐌 Escargot épuisé",
  2: "🦥 Paresseux contemplatif", 
  3: "🐨 Koala prudent",
  4: "🐼 Panda nocturne",
  5: "🦊 Renard équilibré",
  6: "🐺 Loup déterminé",
  7: "🦅 Aigle visionnaire",
  8: "🐅 Tigre en chasse",
  9: "🦁 Lion conquérant",
  10: "🚀 Fusée cosmique"
};

export const FinancialDataForm = ({ onDataSubmit }: FinancialDataFormProps) => {
  const [income, setIncome] = useState<FinancialItem[]>([]);
  const [fixedExpenses, setFixedExpenses] = useState<FinancialItem[]>([]);
  const [variableExpenses, setVariableExpenses] = useState<FinancialItem[]>([]);
  const [debts, setDebts] = useState<FinancialItem[]>([]);
  const [mood, setMood] = useState([5]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addItem = (category: 'income' | 'fixedExpenses' | 'variableExpenses' | 'debts') => {
    const newItem: FinancialItem = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      category
    };

    switch (category) {
      case 'income':
        setIncome([...income, newItem]);
        break;
      case 'fixedExpenses':
        setFixedExpenses([...fixedExpenses, newItem]);
        break;
      case 'variableExpenses':
        setVariableExpenses([...variableExpenses, newItem]);
        break;
      case 'debts':
        setDebts([...debts, newItem]);
        break;
    }
  };

  const updateItem = (category: string, id: string, field: 'name' | 'amount', value: string | number) => {
    const updateList = (list: FinancialItem[]) =>
      list.map(item => item.id === id ? { ...item, [field]: value } : item);

    switch (category) {
      case 'income':
        setIncome(updateList(income));
        break;
      case 'fixedExpenses':
        setFixedExpenses(updateList(fixedExpenses));
        break;
      case 'variableExpenses':
        setVariableExpenses(updateList(variableExpenses));
        break;
      case 'debts':
        setDebts(updateList(debts));
        break;
    }
  };

  const removeItem = (category: string, id: string) => {
    const filterList = (list: FinancialItem[]) => list.filter(item => item.id !== id);

    switch (category) {
      case 'income':
        setIncome(filterList(income));
        break;
      case 'fixedExpenses':
        setFixedExpenses(filterList(fixedExpenses));
        break;
      case 'variableExpenses':
        setVariableExpenses(filterList(variableExpenses));
        break;
      case 'debts':
        setDebts(filterList(debts));
        break;
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    onDataSubmit({
      income,
      fixedExpenses,
      variableExpenses,
      debts,
      mood: mood[0],
      emotionalTags: selectedTags
    });
  };

  const renderItemList = (
    items: FinancialItem[], 
    category: 'income' | 'fixedExpenses' | 'variableExpenses' | 'debts',
    title: string,
    placeholder: string
  ) => (
    <Card className="card-premium">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addItem(category)}
          className="btn-ghost-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </div>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <Input
              placeholder={placeholder}
              value={item.name}
              onChange={(e) => updateItem(category, item.id, 'name', e.target.value)}
              className="input-premium flex-1"
            />
            <Input
              type="number"
              placeholder="0€"
              value={item.amount || ''}
              onChange={(e) => updateItem(category, item.id, 'amount', parseFloat(e.target.value) || 0)}
              className="input-premium w-24"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(category, item.id)}
              className="text-danger hover:text-danger hover:bg-danger/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            Aucun élément ajouté
          </p>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Income */}
      {renderItemList(income, 'income', '💰 Revenus', 'ex: Salaire, investissements...')}
      
      {/* Fixed Expenses */}
      {renderItemList(fixedExpenses, 'fixedExpenses', '🏠 Charges fixes', 'ex: Loyer, assurances...')}
      
      {/* Variable Expenses */}
      {renderItemList(variableExpenses, 'variableExpenses', '🛒 Dépenses variables', 'ex: Alimentation, loisirs...')}
      
      {/* Debts */}
      {renderItemList(debts, 'debts', '💳 Dettes & Crédits', 'ex: Crédit auto, prêt...')}

      {/* Emotional Context */}
      <Card className="card-premium">
        <h3 className="text-lg font-semibold text-primary mb-4">🧠 Contexte émotionnel</h3>
        
        {/* Mood Slider */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Votre état d'esprit actuel</Label>
            <div className="mt-2">
              <Slider
                value={mood}
                onValueChange={setMood}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Faible</span>
                <span className="text-primary font-medium">
                  {MOOD_ARCHETYPES[mood[0] as keyof typeof MOOD_ARCHETYPES]}
                </span>
                <span>Élevé</span>
              </div>
            </div>
          </div>

          {/* Emotional Tags */}
          <div>
            <Label className="text-sm text-muted-foreground mb-3 block">
              Contexte actuel (sélectionnez ce qui vous correspond)
            </Label>
            <div className="flex flex-wrap gap-2">
              {EMOTION_TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover-lift ${
                    selectedTags.includes(tag) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit} 
        className="btn-hero w-full py-6 text-lg"
        disabled={income.length === 0 && fixedExpenses.length === 0}
      >
        🔮 Révéler mon équation financière
      </Button>
    </div>
  );
};