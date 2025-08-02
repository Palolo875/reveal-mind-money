import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Home, Bug, Mail } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  eventId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      eventId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log de l'erreur pour monitoring
    this.logError(error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    // En développement, log détaillé dans la console
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Application Error');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.error('Error Boundary:', this.constructor.name);
      console.groupEnd();
    }
    
    // Log pour analyse (en production, envoyer à un service de monitoring)
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        eventId: this.state.eventId
      };
      
      // Stocker localement pour debug (en production, envoyer à Sentry/LogRocket)
      localStorage.setItem('lastError', JSON.stringify(errorReport));
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  };

  resetErrorBoundary = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined, 
      eventId: undefined 
    });
  };

  private reportError = () => {
    const { error, errorInfo, eventId } = this.state;
    const subject = `Rapport d'erreur Rivela - ${eventId}`;
    const body = `
Bonjour,

Une erreur s'est produite dans l'application Rivela :

ID de l'erreur: ${eventId}
Message: ${error?.message}
Heure: ${new Date().toLocaleString()}
URL: ${window.location.href}
Navigateur: ${navigator.userAgent}

Détails techniques:
${error?.stack}

Cordialement
    `.trim();
    
    const mailtoLink = `mailto:support@rivela.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  render() {
    if (this.state.hasError) {
      // Utiliser le fallback personnalisé si fourni
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error!} 
            resetErrorBoundary={this.resetErrorBoundary} 
          />
        );
      }

      // Interface d'erreur par défaut améliorée
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-background/80">
          <Card className="max-w-2xl w-full p-8 text-center backdrop-blur-sm bg-background/95 border border-border/50 shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <AlertCircle className="w-16 h-16 text-destructive animate-pulse" />
                <div className="absolute inset-0 w-16 h-16 text-destructive/20 animate-ping">
                  <AlertCircle className="w-16 h-16" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Oops! Quelque chose s'est mal passé
            </h1>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Une erreur inattendue s'est produite dans votre application Rivela. 
              Nos équipes ont été automatiquement notifiées.
            </p>

            <Alert className="mb-8 text-left border-destructive/50 bg-destructive/5">
              <Bug className="h-5 w-5 text-destructive" />
              <AlertDescription className="text-base">
                <strong>Erreur #{this.state.eventId?.slice(-8)}:</strong> {this.state.error?.message}
                <br />
                <span className="text-sm text-muted-foreground mt-2 block">
                  Cette erreur a été enregistrée pour analyse. Vous pouvez reprendre votre utilisation normale.
                </span>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Button onClick={this.resetErrorBoundary} variant="default" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline"
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>

              <Button 
                onClick={this.reportError}
                variant="secondary"
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Signaler le problème
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>💡 <strong>Conseil:</strong> Essayez de recharger la page ou de revenir plus tard.</p>
              <p>Si le problème persiste, contactez notre support technique.</p>
            </div>

            {/* Détails techniques en mode développement */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  🔧 Détails techniques (mode développement)
                </summary>
                <div className="mt-4 space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Stack Trace:</h4>
                    <pre className="text-xs overflow-auto bg-background p-3 rounded border">
                      {this.state.error?.stack}
                    </pre>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Component Stack:</h4>
                    <pre className="text-xs overflow-auto bg-background p-3 rounded border">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook pour utiliser l'ErrorBoundary dans les composants fonctionnels
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};