import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { 
  Share2, Download, Mail, MessageSquare, Calendar, Clock, 
  Shield, Eye, EyeOff, Copy, Check, QrCode, FileText,
  Table, Presentation, Code, Twitter, Facebook,
  Linkedin, Camera, Printer, Bell
} from 'lucide-react';

interface ShareExportProps {
  title: string;
  description: string;
  financialData: import('@/types').FinancialData;
  insight: import('@/types').AdvancedInsight;
  onExportComplete?: (format: string, data: Record<string, unknown>) => void;
}

export const AdvancedShareExport = ({ title, description, financialData, insight, onExportComplete }: ShareExportProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { addShareLink } = useStore();
  const shareLinkRef = useRef<HTMLInputElement>(null);

  const handleGenerateShareLink = () => {
    const newLink = `https://rivela.app/share/${Date.now()}`;
    setShareLink(newLink);
    addShareLink(newLink);
    setIsShareOpen(false);
  };

  const handleCopyLink = () => {
    if (shareLinkRef.current) {
      shareLinkRef.current.select();
      document.execCommand('copy');
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format...`);
    const exportData = {
      title,
      description,
      financialData,
      insight,
      timestamp: new Date().toISOString()
    };
    
    if (onExportComplete) {
      onExportComplete(format, exportData);
    }
    
    setIsExportOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Share Options */}
      <Card className="bg-background/95 backdrop-blur-lg border shadow-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Partager votre révélation</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Partagez votre analyse financière avec vos amis, votre famille ou votre conseiller.
          </p>

          <Button variant="outline" onClick={() => setIsShareOpen(!isShareOpen)}>
            <Share2 className="w-4 h-4 mr-2" />
            Options de partage
          </Button>

          <AnimatePresence>
            {isShareOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-4"
              >
                <Tabs defaultValue="link" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="link">
                      <Share2 className="w-4 h-4 mr-2" />
                      Lien partageable
                    </TabsTrigger>
                    <TabsTrigger value="social">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Réseaux sociaux
                    </TabsTrigger>
                    <TabsTrigger value="email">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="link" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          Générez un lien unique à partager.
                        </p>
                        <Button size="sm" onClick={handleGenerateShareLink}>
                          Générer le lien
                        </Button>
                      </div>
                      
                      {shareLink && (
                        <div className="flex items-center gap-2">
                          <Input 
                            type="text" 
                            value={shareLink} 
                            readOnly 
                            ref={shareLinkRef}
                            className="flex-1"
                          />
                          <Button 
                            size="sm" 
                            variant="secondary" 
                            onClick={handleCopyLink}
                            disabled={isLinkCopied}
                          >
                            {isLinkCopied ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Copié !
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copier
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        Protéger le lien avec un mot de passe ?
                      </p>
                      <Switch id="protected" checked={isProtected} onCheckedChange={setIsProtected} />
                    </div>
                    
                    <AnimatePresence>
                      {isProtected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label htmlFor="password" className="text-sm">
                                Mot de passe :
                              </label>
                              <div className="flex items-center gap-2">
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  id="password" 
                                  value={password} 
                                  onChange={(e) => setPassword(e.target.value)} 
                                  className="w-32"
                                />
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Le mot de passe est requis pour accéder au lien.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TabsContent>
                  
                  <TabsContent value="social">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <Button variant="secondary" className="justify-center">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="secondary" className="justify-center">
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="secondary" className="justify-center">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="secondary" className="justify-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Autre
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="email">
                    <div className="space-y-2">
                      <Textarea placeholder="Destinataire, message..." />
                      <Button>Envoyer par Email</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="bg-background/95 backdrop-blur-lg border shadow-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold">Exporter votre révélation</h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Téléchargez votre analyse financière dans différents formats.
          </p>

          <Button variant="outline" onClick={() => setIsExportOpen(!isExportOpen)}>
            <Download className="w-4 h-4 mr-2" />
            Options d'exportation
          </Button>

          <AnimatePresence>
            {isExportOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-4"
              >
                <Tabs defaultValue="pdf" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="pdf">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </TabsTrigger>
                    <TabsTrigger value="csv">
                      <Table className="w-4 h-4 mr-2" />
                      CSV
                    </TabsTrigger>
                    <TabsTrigger value="presentation">
                      <Presentation className="w-4 h-4 mr-2" />
                      Présentation
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pdf">
                    <div className="space-y-2">
                      <p className="text-sm">
                        Exporter au format PDF pour une consultation facile.
                      </p>
                      <Button onClick={() => handleExport('pdf')}>
                        Exporter en PDF
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="csv">
                    <div className="space-y-2">
                      <p className="text-sm">
                        Exporter au format CSV pour une analyse approfondie.
                      </p>
                      <Button onClick={() => handleExport('csv')}>
                        Exporter en CSV
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="presentation">
                    <div className="space-y-2">
                      <p className="text-sm">
                        Exporter au format présentation pour une présentation visuelle.
                      </p>
                      <Button onClick={() => handleExport('presentation')}>
                        Exporter en Présentation
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="code">
                    <div className="space-y-2">
                      <p className="text-sm">
                        Exporter au format code pour une intégration technique.
                      </p>
                      <Button onClick={() => handleExport('code')}>
                        Exporter en Code
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};
