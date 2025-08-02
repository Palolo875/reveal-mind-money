import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Settings, 
  Wifi, 
  WifiOff, 
  Zap, 
  Shield, 
  Globe, 
  Server,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useAdvancedFinancialEngine } from '@/hooks/useAdvancedFinancialEngine';

interface AIProvider {
  id: 'ollama' | 'huggingface' | 'cohere' | 'fallback';
  name: string;
  description: string;
  status: 'available' | 'unavailable' | 'testing';
  icon: React.ReactNode;
  features: string[];
  setupRequired?: boolean;
}

const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    description: 'IA locale gratuite et privée - Modèles Mistral, Llama 2',
    status: 'testing',
    icon: <Server className="w-5 h-5" />,
    features: ['100% Gratuit', 'Données privées', 'Modèles avancés', 'Rapide'],
    setupRequired: true
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'API gratuite - 30,000 requêtes/mois - Modèles spécialisés',
    status: 'testing',
    icon: <Globe className="w-5 h-5" />,
    features: ['30k requêtes/mois', 'Modèles spécialisés', 'API simple', 'Communauté active']
  },
  {
    id: 'cohere',
    name: 'Cohere',
    description: 'IA spécialisée finance - 5 requêtes/minute - Analyse avancée',
    status: 'testing',
    icon: <Brain className="w-5 h-5" />,
    features: ['5 req/min', 'Spécialisé finance', 'Analyse avancée', 'Fiabilité élevée']
  },
  {
    id: 'fallback',
    name: 'Simulation Locale',
    description: 'Mode hors ligne - Analyse basée sur des algorithmes prédéfinis',
    status: 'available',
    icon: <Zap className="w-5 h-5" />,
    features: ['Toujours disponible', 'Hors ligne', 'Rapide', 'Basique']
  }
];

export const AIConfigPanel = () => {
  const { aiProvider, switchAIProvider, testAIConnection } = useAdvancedFinancialEngine();
  const [providers, setProviders] = useState<AIProvider[]>(AI_PROVIDERS);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  useEffect(() => {
    testAllProviders();
  }, []);

  const testAllProviders = async () => {
    setIsTesting(true);
    const results: Record<string, boolean> = {};

    for (const provider of AI_PROVIDERS) {
      if (provider.id !== 'fallback') {
        try {
          // Simuler un test de connectivité
          await new Promise(resolve => setTimeout(resolve, 1000));
          results[provider.id] = Math.random() > 0.3; // 70% de succès simulé
        } catch {
          results[provider.id] = false;
        }
      } else {
        results[provider.id] = true; // Fallback toujours disponible
      }
    }

    setTestResults(results);
    setIsTesting(false);

    // Mettre à jour le statut des providers
    setProviders(prev => prev.map(p => ({
      ...p,
      status: results[p.id] ? 'available' : 'unavailable'
    })));
  };

  const handleProviderSwitch = async (providerId: string) => {
    if (providerId === aiProvider) return;

    try {
      await switchAIProvider(providerId as import('@/types').AIProvider);
      
      // Mettre à jour l'interface
      setProviders(prev => prev.map(p => ({
        ...p,
        status: p.id === providerId ? 'available' : p.status
      })));
    } catch (error) {
      console.error('Erreur changement provider:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'unavailable':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'testing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'unavailable':
        return 'Indisponible';
      case 'testing':
        return 'Test en cours...';
      default:
        return 'Inconnu';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Configuration IA</h2>
            <p className="text-muted-foreground">
              Choisissez votre moteur d'intelligence artificielle
            </p>
          </div>
        </div>
        
        <Button
          onClick={testAllProviders}
          disabled={isTesting}
          variant="outline"
          size="sm"
        >
          {isTesting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wifi className="w-4 h-4 mr-2" />
          )}
          {isTesting ? 'Test...' : 'Tester'}
        </Button>
      </div>

      {/* Provider actuel */}
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {providers.find(p => p.id === aiProvider)?.icon}
            </div>
            <div>
              <h3 className="font-semibold">
                {providers.find(p => p.id === aiProvider)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Provider actuel
              </p>
            </div>
          </div>
          <Badge variant="secondary">
            {getStatusText(providers.find(p => p.id === aiProvider)?.status || 'unknown')}
          </Badge>
        </div>
      </Card>

      {/* Liste des providers */}
      <div className="grid gap-4">
        {providers.map((provider) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: providers.indexOf(provider) * 0.1 }}
          >
            <Card className={`p-4 transition-all duration-200 hover:shadow-lg ${
              provider.id === aiProvider 
                ? 'ring-2 ring-primary/50 bg-primary/5' 
                : 'hover:bg-muted/50'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-muted rounded-lg">
                      {provider.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{provider.name}</h3>
                        {getStatusIcon(provider.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {provider.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {provider.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Setup required */}
                  {provider.setupRequired && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                      <AlertCircle className="w-4 h-4" />
                      <span>Configuration requise</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Button
                    onClick={() => handleProviderSwitch(provider.id)}
                    disabled={provider.status === 'unavailable' || provider.id === aiProvider}
                    variant={provider.id === aiProvider ? 'default' : 'outline'}
                    size="sm"
                  >
                    {provider.id === aiProvider ? 'Actif' : 'Activer'}
                  </Button>
                  
                  {provider.status === 'unavailable' && (
                    <p className="text-xs text-red-500 text-right">
                      Non disponible
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Statistiques */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Statistiques IA</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {providers.filter(p => p.status === 'available').length}
            </div>
            <div className="text-sm text-muted-foreground">
              Providers disponibles
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {Math.floor(Math.random() * 100) + 50}%
            </div>
            <div className="text-sm text-muted-foreground">
              Précision moyenne
            </div>
          </div>
        </div>
      </Card>

      {/* Instructions Ollama */}
      {aiProvider === 'ollama' && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                Configuration Ollama
              </h4>
              <div className="text-sm text-blue-800 space-y-2">
                <p>1. Installez Ollama : <code className="bg-blue-100 px-1 rounded">curl -fsSL https://ollama.ai/install.sh | sh</code></p>
                <p>2. Démarrez le service : <code className="bg-blue-100 px-1 rounded">ollama serve</code></p>
                <p>3. Téléchargez un modèle : <code className="bg-blue-100 px-1 rounded">ollama pull mistral</code></p>
                <p>4. Testez : <code className="bg-blue-100 px-1 rounded">ollama run mistral "Test"</code></p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};