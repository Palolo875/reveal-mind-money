import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { RevolutionaryCard } from '@/components/ui/revolutionary-card';
import { RevolutionaryButton } from '@/components/ui/revolutionary-button';
import { RevolutionaryInput } from '@/components/ui/revolutionary-input';
import { AdvancedParticleSystem } from '@/components/AdvancedParticleSystem';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  ArrowRight,
  Play,
  Star,
  Globe,
  Users,
  Award
} from 'lucide-react';

interface RevolutionaryHeroProps {
  onStartExploration: () => void;
  onQuickQuestion: (question: string) => void;
}

export const RevolutionaryHero: React.FC<RevolutionaryHeroProps> = ({
  onStartExploration,
  onQuickQuestion,
}) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springY = useSpring(y, { damping: 20, stiffness: 100 });
  const springOpacity = useSpring(opacity, { damping: 20, stiffness: 100 });
  const springScale = useSpring(scale, { damping: 20, stiffness: 100 });

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "IA Neuroscientifique",
      description: "Analyse comportementale avancée basée sur les neurosciences",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Prédictions Quantiques",
      description: "Modélisation prédictive avec 99.7% de précision",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité Zero-Data",
      description: "Vos données restent 100% privées et locales",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Insights Instantanés",
      description: "Révélations financières en temps réel",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const quickQuestions = [
    "Comment optimiser mes investissements ?",
    "Quels sont mes frais cachés ?",
    "Comment épargner plus efficacement ?",
    "Quelle stratégie pour ma retraite ?"
  ];

  const heroTexts = [
    "Révélez vos secrets financiers",
    "Découvrez vos patterns cachés",
    "Optimisez votre avenir financier",
    "Maîtrisez votre destinée économique"
  ];

  // Auto-typing effect
  useEffect(() => {
    if (!isInView) return;

    const currentText = heroTexts[currentFeature];
    let index = 0;
    setIsTyping(true);
    setTypedText('');

    const typeInterval = setInterval(() => {
      if (index < currentText.length) {
        setTypedText(currentText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentFeature, isInView]);

  // Auto-rotate features
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  const handleQuickQuestion = (question: string) => {
    onQuickQuestion(question);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onQuickQuestion(searchQuery);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Advanced Particle System */}
      <AdvancedParticleSystem count={50} />
      
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
        animate={{
          background: [
            'linear-gradient(45deg, hsl(var(--primary)/0.2) 0%, hsl(var(--secondary)/0.2) 50%, hsl(var(--accent)/0.2) 100%)',
            'linear-gradient(45deg, hsl(var(--accent)/0.2) 0%, hsl(var(--primary)/0.2) 50%, hsl(var(--secondary)/0.2) 100%)',
            'linear-gradient(45deg, hsl(var(--secondary)/0.2) 0%, hsl(var(--accent)/0.2) 50%, hsl(var(--primary)/0.2) 100%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-secondary/20 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/3 w-20 h-20 bg-accent/20 rounded-full blur-xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      <motion.div
        style={{
          y: springY,
          opacity: springOpacity,
          scale: springScale,
        }}
        className="relative z-10 container mx-auto px-6 py-20"
      >
        {/* Header with stats */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-16"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rivela
            </h1>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>10K+ utilisateurs</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>99.7% précision</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>Zero Data</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main hero content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Hero text and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
            >
              <Star className="w-4 h-4 fill-primary" />
              <span>Révolution IA 2024</span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {typedText}
                </span>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-primary"
                  >
                    |
                  </motion.span>
                )}
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Découvrez les insights financiers impossibles à détecter humainement. 
                Notre IA neuroscientifique révèle vos patterns cachés et optimise votre avenir financier.
              </p>
            </div>

            {/* Feature showcase */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-24"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: currentFeature === index ? 1 : 0,
                    x: currentFeature === index ? 0 : 50,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <RevolutionaryButton
                size="lg"
                variant="quantum"
                glow
                particleEffect
                onClick={onStartExploration}
                icon={<Target className="w-5 h-5" />}
              >
                Commencer l'exploration
              </RevolutionaryButton>
              
              <RevolutionaryButton
                size="lg"
                variant="glass"
                onClick={() => document.getElementById('demo-video')?.scrollIntoView()}
                icon={<Play className="w-5 h-5" />}
                iconPosition="right"
              >
                Voir la démo
              </RevolutionaryButton>
            </motion.div>

            {/* Quick questions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">Questions populaires :</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1.5 text-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Interactive demo */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Search interface */}
            <RevolutionaryCard
              variant="quantum"
              blur="xl"
              glow
              particleEffect
              className="p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Assistant IA Financier</h3>
                </div>
                
                <RevolutionaryInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Posez votre question financière..."
                  type="text"
                  variant="glass"
                  size="lg"
                  particleEffect
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                
                <RevolutionaryButton
                  variant="primary"
                  size="md"
                  onClick={handleSearch}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  fullWidth
                >
                  Obtenir des insights
                </RevolutionaryButton>
              </div>
            </RevolutionaryCard>

            {/* Live insights preview */}
            <RevolutionaryCard
              variant="morphic"
              blur="lg"
              className="p-6"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Insights en temps réel
                </h3>
                
                <div className="space-y-3">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                  >
                    <span className="text-sm">Optimisation détectée</span>
                    <span className="text-sm font-semibold text-green-500">+23%</span>
                  </motion.div>
                  
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <span className="text-sm">Frais cachés identifiés</span>
                    <span className="text-sm font-semibold text-blue-500">-€127</span>
                  </motion.div>
                  
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                  >
                    <span className="text-sm">Opportunité détectée</span>
                    <span className="text-sm font-semibold text-purple-500">+€2.4K</span>
                  </motion.div>
                </div>
              </div>
            </RevolutionaryCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};