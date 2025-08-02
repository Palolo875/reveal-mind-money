import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  status?: 'typing' | 'sent' | 'error';
  insights?: string[];
  emotions?: string[];
}

interface ConversationalInterfaceProps {
  onQuestionSubmit: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  {
    text: "Pourquoi j'ai toujours -200€ en fin de mois ?",
    emotion: "Frustration",
    category: "Budget"
  },
  {
    text: "Mon stress impacte-t-il mes décisions financières ?",
    emotion: "Inquiétude",
    category: "Émotions"
  },
  {
    text: "Combien je peux économiser si j'arrête les livraisons ?",
    emotion: "Curiosité",
    category: "Optimisation"
  },
  {
    text: "Pourquoi je n'arrive pas à épargner malgré un bon salaire ?",
    emotion: "Confusion",
    category: "Épargne"
  }
];

export const ConversationalInterface = ({ onQuestionSubmit }: ConversationalInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Bonjour ! Je suis Rivela, votre assistant financier IA. Je vais vous aider à révéler les insights cachés de vos finances. Posez-moi votre question financière la plus pressante...",
      timestamp: new Date(),
      status: 'sent'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler la réponse IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Excellente question ! Je vais analyser vos données pour révéler des insights impossibles à détecter humainement. Préparez-vous à être surpris...",
        timestamp: new Date(),
        status: 'sent',
        insights: ['Pattern comportemental détecté', 'Corrélation émotion-dépense identifiée'],
        emotions: ['Curiosité', 'Anticipation']
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Déclencher l'exploration
      setTimeout(() => {
        onQuestionSubmit(inputValue);
      }, 1000);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Rivela</h1>
                <p className="text-sm text-gray-400">Assistant Financier IA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                En ligne
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                className={`max-w-3xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-100'
                } rounded-2xl p-4 shadow-xl`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-3">
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">
                        {message.type === 'user' ? 'Vous' : 'Rivela'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.status === 'typing' && (
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Clock className="w-3 h-3 text-gray-400" />
                        </motion.div>
                      )}
                    </div>
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.insights && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-gray-400 font-medium">Insights détectés :</div>
                        <div className="flex flex-wrap gap-2">
                          {message.insights.map((insight, i) => (
                            <Badge key={i} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {insight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {message.emotions && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-gray-400 font-medium">Émotions détectées :</div>
                        <div className="flex flex-wrap gap-2">
                          {message.emotions.map((emotion, i) => (
                            <Badge key={i} className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {emotion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">U</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="px-6 pb-4"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Questions suggérées :</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <Card 
                    className="p-4 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300"
                    onClick={() => handleSuggestedQuestion(question.text)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white mb-2">{question.text}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                            {question.category}
                          </Badge>
                          <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 text-xs">
                            {question.emotion}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-white/10 bg-white/5 backdrop-blur-xl p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question financière..."
                className="min-h-[60px] max-h-[120px] bg-white/10 backdrop-blur-xl border-white/20 text-white placeholder-gray-400 resize-none rounded-xl"
                rows={1}
              />
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
          </div>
        </div>
      </motion.div>
    </div>
  );
};