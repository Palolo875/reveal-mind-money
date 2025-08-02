import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Share, 
  Download, 
  Copy, 
  CheckCircle,
  FileText,
  Image,
  Mail,
  MessageSquare,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Sparkles,
  Eye,
  Settings
} from 'lucide-react';

interface WorkingShareExportProps {
  title: string;
  description: string;
  financialData: any;
  insight: any;
  onExportComplete: (type: string) => void;
}

interface ExportFormat {
  id: string;
  name: string;
  description: string;
  icon: any;
  format: 'pdf' | 'png' | 'json' | 'csv';
  color: string;
}

const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: 'pdf',
    name: 'PDF Révélation',
    description: 'Rapport complet en PDF',
    icon: FileText,
    format: 'pdf',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'png',
    name: 'Image HD',
    description: 'Capture d\'écran haute qualité',
    icon: Image,
    format: 'png',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'json',
    name: 'Données JSON',
    description: 'Export des données brutes',
    icon: Settings,
    format: 'json',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'csv',
    name: 'Tableau CSV',
    description: 'Données formatées pour Excel',
    icon: FileText,
    format: 'csv',
    color: 'from-purple-500 to-pink-500'
  }
];

const SHARE_PLATFORMS = [
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'from-blue-400 to-blue-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-800' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-900' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { id: 'email', name: 'Email', icon: Mail, color: 'from-gray-500 to-gray-700' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, color: 'from-green-500 to-green-700' }
];

export const WorkingShareExport = ({ 
  title, 
  description, 
  financialData, 
  insight, 
  onExportComplete 
}: WorkingShareExportProps) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    const data = {
      title,
      description,
      insight: {
        healthScore: insight.healthScore,
        equation: insight.equation,
        comparison: insight.comparison
      },
      timestamp: new Date().toISOString()
    };
    
    const encoded = btoa(JSON.stringify(data));
    return `${window.location.origin}/share/${encoded}`;
  };

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);
    setSelectedFormat(format);

    // Simuler l'export
    await new Promise(resolve => setTimeout(resolve, 2000));

    const filename = `rivela-insight-${Date.now()}.${format.format}`;
    
    if (format.format === 'pdf') {
      // Simuler génération PDF
      const pdfContent = `
        RIVELA - Révélation Financière
        ==============================
        
        ${title}
        ${description}
        
        Score de santé : ${insight.healthScore}%
        Équation : ${insight.equation}
        Comparaison : ${insight.comparison}
        
        Généré le : ${new Date().toLocaleDateString()}
      `;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format.format === 'png') {
      // Simuler capture d'écran
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, 1200, 800);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '48px Arial';
        ctx.fillText('RIVELA - Insight Financier', 50, 100);
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${insight.healthScore}%`, 50, 150);
        ctx.fillText(insight.equation, 50, 200);
      }
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } else if (format.format === 'json') {
      const data = {
        insight,
        financialData,
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.0.0'
        }
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format.format === 'csv') {
      const csvContent = `Category,Amount,Description
Income,${financialData.income.reduce((sum: number, item: any) => sum + item.amount, 0)},Total Revenus
Fixed Expenses,${financialData.fixedExpenses.reduce((sum: number, item: any) => sum + item.amount, 0)},Charges Fixes
Variable Expenses,${financialData.variableExpenses.reduce((sum: number, item: any) => sum + item.amount, 0)},Dépenses Variables
Health Score,${insight.healthScore},Score de Santé
Balance,${insight.projections.monthly},Balance Mensuelle`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }

    setIsExporting(false);
    onExportComplete(format.format);
  };

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    
    const url = generateShareUrl();
    setShareUrl(url);
    
    const text = `Découvrez mon insight financier avec Rivela ! ${title}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
    }
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  const copyToClipboard = async () => {
    const url = generateShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Share className="w-8 h-8 text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Partager & Exporter</h2>
            <p className="text-gray-300">Diffusez vos insights et exportez vos données</p>
          </div>
        </div>
      </Card>

      {/* Export Formats */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Exporter vos données</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPORT_FORMATS.map((format) => (
            <motion.div
              key={format.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Card 
                className={`p-4 border-2 transition-all duration-300 ${
                  selectedFormat?.id === format.id 
                    ? 'border-purple-500 bg-purple-500/20' 
                    : 'border-white/20 bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => handleExport(format)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${format.color} p-3 mb-3`}>
                  <format.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{format.name}</h3>
                <p className="text-sm text-gray-400">{format.description}</p>
                
                {isExporting && selectedFormat?.id === format.id && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mt-2"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share Platforms */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Partager sur les réseaux</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SHARE_PLATFORMS.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Card 
                className="p-4 border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300"
                onClick={() => handleShare(platform.id)}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color} p-2 mb-2 mx-auto`}>
                  <platform.icon className="w-full h-full text-white" />
                </div>
                <p className="text-sm text-white text-center">{platform.name}</p>
                
                {isSharing && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="mt-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Direct Share */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Lien direct</h3>
        <Card className="p-6 bg-white/10 border-white/20">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label className="text-gray-300">Lien de partage</Label>
              <Input
                value={shareUrl || generateShareUrl()}
                readOnly
                className="mt-2 bg-white/10 border-white/20 text-white"
              />
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
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
        </Card>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Aperçu du partage</h3>
        <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
              <p className="text-gray-300 mb-3">{description}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Score: {insight.healthScore}%
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Rivela
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};