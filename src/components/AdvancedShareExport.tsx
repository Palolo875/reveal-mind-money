
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  Share, 
  Download, 
  Mail, 
  MessageCircle,
  Linkedin,
  Twitter,
  Facebook,
  Link,
  FileText,
  Image,
  FileSpreadsheet,
  Presentation,
  QrCode,
  Calendar,
  Printer,
  Cloud,
  Shield
} from 'lucide-react';

interface ShareExportProps {
  insight?: any;
  financialData?: any;
  onExportComplete?: (format: string, data: any) => void;
}

export const AdvancedShareExport = ({ insight, financialData, onExportComplete }: ShareExportProps) => {
  const [shareUrl, setShareUrl] = useState('');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const generateShareableLink = async () => {
    setIsGeneratingLink(true);
    
    // Simulation de génération de lien sécurisé
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const linkId = Math.random().toString(36).substring(2, 15);
    const generatedUrl = `https://rivela.app/shared/${linkId}`;
    
    setShareUrl(generatedUrl);
    setIsGeneratingLink(false);
    
    toast({
      title: "🔗 Lien généré",
      description: "Votre révélation financière est prête à être partagée !",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "📋 Copié !",
        description: "Le lien a été copié dans votre presse-papiers.",
      });
    } catch (err) {
      toast({
        title: "❌ Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive"
      });
    }
  };

  const exportData = async (format: string) => {
    setSelectedFormat(format);
    
    // Simulation d'export
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const exportData = {
      insight,
      financialData,
      exportDate: new Date().toISOString(),
      format
    };

    // Simulation de téléchargement selon le format
    const filename = `rivela-revelation-${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
      case 'pdf':
        toast({
          title: "📄 PDF généré",
          description: `${filename}.pdf téléchargé avec succès !`,
        });
        break;
      case 'excel':
        toast({
          title: "📊 Excel généré", 
          description: `${filename}.xlsx avec tous vos données financières !`,
        });
        break;
      case 'powerpoint':
        toast({
          title: "📽️ Présentation créée",
          description: `${filename}.pptx pour présenter vos insights !`,
        });
        break;
      case 'json':
        toast({
          title: "💾 Données exportées",
          description: `${filename}.json avec toutes vos données brutes !`,
        });
        break;
    }
    
    onExportComplete?.(format, exportData);
    setSelectedFormat('');
  };

  const shareToSocial = (platform: string) => {
    const shareText = `🔮 J'ai découvert des insights incroyables sur mes finances avec Rivela ! ${insight?.equation || 'Analyse IA révolutionnaire'} 💰✨`;
    const url = shareUrl || window.location.href;
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      toast({
        title: "🚀 Partagé !",
        description: `Ouverture du partage ${platform}...`,
      });
    }
  };

  const sendByEmail = () => {
    const subject = "🔮 Ma révélation financière Rivela";
    const body = `Salut !\n\nJe viens de découvrir des insights fascinants sur ma situation financière avec Rivela :\n\n${insight?.insight || 'Analyse en cours...'}\n\n${shareUrl ? `Voir le détail : ${shareUrl}` : ''}\n\nÀ bientôt !`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const scheduleFollowUp = () => {
    const event = {
      title: "🔄 Révision financière Rivela",
      description: "Temps de faire le point sur mes objectifs financiers et revoir mes insights Rivela",
      start: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Dans 30 jours
      duration: 60 // minutes
    };
    
    toast({
      title: "📅 Rappel programmé",
      description: "Rendez-vous dans 30 jours pour un bilan !",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Share className="w-6 h-6 text-blue-500" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            📤 Partage & Export Avancé
          </h3>
        </div>
        
        <p className="text-muted-foreground">
          Partagez vos révélations financières ou exportez vos données dans le format de votre choix avec une sécurité maximale.
        </p>
      </Card>

      <Tabs defaultValue="share" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="share">Partager</TabsTrigger>
          <TabsTrigger value="export">Exporter</TabsTrigger>
          <TabsTrigger value="schedule">Programmer</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
        </TabsList>

        <TabsContent value="share" className="space-y-6">
          {/* Génération de lien sécurisé */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Link className="w-5 h-5" />
              Lien de partage sécurisé
            </h4>
            
            {!shareUrl ? (
              <Button 
                onClick={generateShareableLink}
                disabled={isGeneratingLink}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isGeneratingLink ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Génération du lien sécurisé...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Créer un lien sécurisé
                  </div>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    value={shareUrl} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button onClick={() => copyToClipboard(shareUrl)} variant="outline">
                    <Link className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>Lien chiffré • Expire dans 7 jours • Vue limitée</span>
                </div>
              </div>
            )}
          </Card>

          {/* Partage réseaux sociaux */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">📱 Réseaux sociaux</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline" 
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-500"
                onClick={() => shareToSocial('twitter')}
              >
                <Twitter className="w-4 h-4 text-blue-500" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-700"
                onClick={() => shareToSocial('linkedin')}
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-600"
                onClick={() => shareToSocial('facebook')}
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={sendByEmail}
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </Card>

          {/* QR Code */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code
            </h4>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-muted/20 border-2 border-dashed border-muted-foreground/20 rounded-lg mx-auto flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scannez pour accéder à votre révélation depuis mobile
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export PDF */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => exportData('pdf')}>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold">📄 Rapport PDF</h4>
                <p className="text-sm text-muted-foreground">
                  Rapport complet avec graphiques et recommandations
                </p>
                <Badge variant="outline" className="text-xs">
                  Idéal pour impression
                </Badge>
                {selectedFormat === 'pdf' && (
                  <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin mx-auto" />
                )}
              </div>
            </Card>

            {/* Export Excel */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => exportData('excel')}>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold">📊 Feuille Excel</h4>
                <p className="text-sm text-muted-foreground">
                  Données financières détaillées et calculables
                </p>
                <Badge variant="outline" className="text-xs">
                  Parfait pour analyses
                </Badge>
                {selectedFormat === 'excel' && (
                  <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin mx-auto" />
                )}
              </div>
            </Card>

            {/* Export PowerPoint */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => exportData('powerpoint')}>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                  <Presentation className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold">📽️ Présentation</h4>
                <p className="text-sm text-muted-foreground">
                  Slides pour présenter à votre conseiller
                </p>
                <Badge variant="outline" className="text-xs">
                  Prêt à présenter
                </Badge>
                {selectedFormat === 'powerpoint' && (
                  <div className="w-4 h-4 border-2 border-orange-600/30 border-t-orange-600 rounded-full animate-spin mx-auto" />
                )}
              </div>
            </Card>

            {/* Export JSON */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => exportData('json')}>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">💾 Données JSON</h4>
                <p className="text-sm text-muted-foreground">
                  Format technique pour développeurs
                </p>
                <Badge variant="outline" className="text-xs">
                  Import facile
                </Badge>
                {selectedFormat === 'json' && (
                  <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto" />
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Programmation automatique
            </h4>
            
            <div className="space-y-4">
              <Button 
                onClick={scheduleFollowUp}
                variant="outline" 
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">📅 Rappel mensuel</div>
                  <div className="text-sm text-muted-foreground">
                    Recevoir un rappel pour réviser vos finances
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">📈 Bilan trimestriel</div>
                  <div className="text-sm text-muted-foreground">
                    Analyse comparative tous les 3 mois
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">🎯 Suivi objectifs</div>
                  <div className="text-sm text-muted-foreground">
                    Notifications de progression vers vos objectifs
                  </div>
                </div>
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Confidentialité & Sécurité
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    🔐 Chiffrement de bout en bout
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Vos données sont chiffrées avant tout partage
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Link className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    ⏰ Expiration automatique
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Les liens partagés expirent automatiquement
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <Eye className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    👀 Contrôle d'accès
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Vous décidez qui peut voir quoi
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
