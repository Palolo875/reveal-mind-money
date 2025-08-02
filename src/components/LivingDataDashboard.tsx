import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  Sparkles, 
  Eye, 
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Heart,
  DollarSign,
  BarChart3,
  PieChart,
  Share,
  Calculator
} from 'lucide-react';
import { AdvancedParticleSystem } from './AdvancedParticleSystem';
import { WorkingSimulator } from './WorkingSimulator';
import { WorkingShareExport } from './WorkingShareExport';

interface LivingDataDashboardProps {
  insight: any;
  question: string;
  onNewExploration: () => void;
  financialData: any;
}

export const LivingDataDashboard = ({ 
  insight, 
  question, 
  onNewExploration, 
  financialData 
}: LivingDataDashboardProps) => {
  const [currentRevelation, setCurrentRevelation] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [activeTab, setActiveTab] = useState('revelations');
  const [animatedValues, setAnimatedValues] = useState({
    healthScore: 0,
    monthlyBalance: 0,
    yearlyProjection: 0,
    emotionalImpact: 0
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const revelations = [
    {
      title: "Votre Équation Financière",
      content: insight.equation,
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      title: "Insight Principal",
      content: insight.insight,
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      delay: 0.5
    },
    {
      title: "Comparaison Révélatrice",
      content: insight.comparison,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      delay: 1
    },
    {
      title: "État Émotionnel",
      content: insight.emotionalState,
      icon: Heart,
      color: "from-orange-500 to-red-500",
      delay: 1.5
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealing(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isRevealing) {
      const interval = setInterval(() => {
        setCurrentRevelation(prev => {
          if (prev < revelations.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRevealing, revelations.length]);

  useEffect(() => {
    // Animer les valeurs numériques
    const animateValues = () => {
      setAnimatedValues({
        healthScore: insight.healthScore,
        monthlyBalance: insight.projections.monthly,
        yearlyProjection: insight.projections.yearly,
        emotionalImpact: insight.emotionalPatterns.correlations[0]?.impact || 0
      });
    };

    setTimeout(animateValues, 500);
  }, [insight]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSimulationComplete = (result: any) => {
    console.log('Simulation completed:', result);
  };

  const handleExportComplete = (type: string) => {
    console.log('Export completed:', type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Particules Interactives */}
      <AdvancedParticleSystem count={30} interactive className="absolute inset-0" />
      
      {/* Effet de Glassmorphism Dynamique */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5" />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Révélation Financière
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Votre Insight
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {question}
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border-white/20">
            <TabsTrigger value="revelations" className="data-[state=active]:bg-purple-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Révélations
            </TabsTrigger>
            <TabsTrigger value="simulator" className="data-[state=active]:bg-purple-500/20">
              <Calculator className="w-4 h-4 mr-2" />
              Simulateur
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-purple-500/20">
              <Share className="w-4 h-4 mr-2" />
              Partager
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Révélations Tab */}
          <TabsContent value="revelations" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {revelations.map((revelation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ 
                        opacity: currentRevelation >= index ? 1 : 0,
                        x: currentRevelation >= index ? 0 : -50
                      }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.6, delay: revelation.delay }}
                      className="relative"
                    >
                      <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${revelation.color} p-3 flex-shrink-0`}>
                            <revelation.icon className="w-full h-full text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {revelation.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                              {revelation.content}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Dashboard Interactif */}
              <motion.div
                className="space-y-6"
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Score de Santé Financière */}
                <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Santé Financière</h3>
                    <Badge className={`${
                      animatedValues.healthScore >= 80 ? 'bg-green-500/20 text-green-400' :
                      animatedValues.healthScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {animatedValues.healthScore.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={animatedValues.healthScore} 
                    className="h-3 mb-4"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {animatedValues.monthlyBalance > 0 ? '+' : ''}{animatedValues.monthlyBalance.toFixed(0)}€
                      </div>
                      <div className="text-gray-400">Balance Mensuelle</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">
                        {animatedValues.yearlyProjection.toFixed(0)}€
                      </div>
                      <div className="text-gray-400">Projection Annuelle</div>
                    </div>
                  </div>
                </Card>

                {/* Impact Émotionnel */}
                <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Impact Émotionnel</h3>
                  
                  <div className="space-y-4">
                    {insight.emotionalPatterns.correlations.map((correlation: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-300">{correlation.emotion}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${correlation.impact}%` }}
                              transition={{ duration: 1, delay: index * 0.3 }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-8 text-right">
                            {correlation.impact.toFixed(0)}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Recommandations */}
                <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Recommandations IA</h3>
                  
                  <div className="space-y-3">
                    {insight.recommendations.map((recommendation: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-300 text-sm">{recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Coûts Cachés */}
            {insight.hiddenCosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mb-8"
              >
                <Card className="p-6 bg-red-500/10 backdrop-blur-xl border-red-500/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-semibold text-red-400">Coûts Cachés Détectés</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {insight.hiddenCosts.map((cost: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.2 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{cost}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Simulateur Tab */}
          <TabsContent value="simulator">
            <WorkingSimulator 
              currentData={financialData}
              onSimulationComplete={handleSimulationComplete}
            />
          </TabsContent>

          {/* Partage Tab */}
          <TabsContent value="share">
            <WorkingShareExport 
              title={question}
              description="Insight financier généré par Rivela"
              financialData={financialData}
              insight={insight}
              onExportComplete={handleExportComplete}
            />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="p-6 bg-white/10 backdrop-blur-xl border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Analytics Avancés</h3>
              <p className="text-gray-300">Fonctionnalité en cours de développement...</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onNewExploration}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Nouvelle Exploration
          </Button>
          
          <Button
            variant="outline"
            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-xl"
          >
            <Eye className="w-5 h-5 mr-2" />
            Voir les Détails
          </Button>
        </motion.div>
      </div>
    </div>
  );
};