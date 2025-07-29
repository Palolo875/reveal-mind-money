import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ParticleSystem } from './ParticleSystem';

interface QuestionInputProps {
  onQuestionSubmit: (question: string) => void;
}

const SAMPLE_QUESTIONS = [
  "Pourquoi j'ai toujours -200€ en fin de mois ?",
  "Puis-je vraiment m'acheter une voiture électrique ?",
  "Mon stress impacte-t-il mes décisions financières ?",
  "Combien je peux économiser si j'arrête les livraisons ?",
  "Pourquoi je n'arrive pas à épargner malgré un bon salaire ?",
];

export const QuestionInput = ({ onQuestionSubmit }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const handleSubmit = () => {
    const finalQuestion = selectedSample || question;
    if (finalQuestion.trim()) {
      onQuestionSubmit(finalQuestion);
    }
  };

  const selectSample = (sample: string) => {
    setSelectedSample(sample);
    setQuestion(sample);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleSystem count={30} />
      
      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-block">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-2">
                🧠 Neuroscience Financière
              </Badge>
            </div>
            
            <h1 className="text-hero leading-tight">
              Rivela
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Révélez l'impact invisible de vos choix financiers quotidiens par des équations personnelles et des insights neuroscientifiques
            </p>
            
            <div className="text-sm text-primary/80 font-medium">
              Vos données + Notre science = Votre révélation financière
            </div>
          </div>

          {/* Question Input */}
          <Card className="card-premium max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-primary mb-2">
                  🤔 Quelle est votre question financière ?
                </h2>
                <p className="text-muted-foreground">
                  Posez votre question librement, nous allons analyser vos données pour vous révéler l'invisible.
                </p>
              </div>

              <Textarea
                placeholder="Ex: Pourquoi j'ai toujours -200€ en fin de mois ?"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setSelectedSample(null);
                }}
                className="input-premium min-h-[100px] text-lg resize-none"
              />

              {/* Sample Questions */}
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground text-left">
                  💡 Ou choisissez une question d'exemple :
                </div>
                <div className="flex flex-wrap gap-2 justify-start">
                  {SAMPLE_QUESTIONS.map((sample, index) => (
                    <Badge
                      key={index}
                      variant={selectedSample === sample ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover-lift text-xs ${
                        selectedSample === sample 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => selectSample(sample)}
                    >
                      {sample}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={!question.trim()}
                className="btn-hero w-full py-6 text-lg"
              >
                🚀 Commencer l'exploration
              </Button>
            </div>
          </Card>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="card-premium text-center hover-lift">
              <div className="text-4xl mb-3">🔮</div>
              <h3 className="font-semibold text-primary mb-2">Équations Personnelles</h3>
              <p className="text-sm text-muted-foreground">
                Transformez vos données en révélations visuelles
              </p>
            </Card>
            
            <Card className="card-premium text-center hover-lift">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-semibold text-primary mb-2">Science Vérifiée</h3>
              <p className="text-sm text-muted-foreground">
                Basé sur la recherche en neurosciences financières
              </p>
            </Card>
            
            <Card className="card-premium text-center hover-lift">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-primary mb-2">100% Privé</h3>
              <p className="text-sm text-muted-foreground">
                Vos données restent sur votre appareil
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};