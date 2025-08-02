import * as Sentry from '@sentry/react';
import React from 'react';

// Configuration par défaut de Sentry
const DEFAULT_CONFIG = {
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  integrations: [
    Sentry.browserTracingIntegration({
      tracingOrigins: ['localhost', /^\//],
    }),
  ],
  beforeSend(event) {
    // Filtrer les erreurs non critiques en production
    if (process.env.NODE_ENV === 'production') {
      // Ne pas envoyer les erreurs réseau temporaires
      if (event.exception?.values?.some(ex => 
        ex.value?.includes('NetworkError') || 
        ex.value?.includes('fetch')
      )) {
        return null;
      }
      
      // Ne pas envoyer les erreurs de script tiers
      if (event.exception?.values?.some(ex => 
        ex.stacktrace?.frames?.some(frame => 
          frame.filename?.includes('google') || 
          frame.filename?.includes('facebook') ||
          frame.filename?.includes('twitter')
        )
      )) {
        return null;
      }
    }
    
    return event;
  },
};

// Interface pour la configuration Sentry
export interface SentryConfig {
  dsn?: string;
  environment?: string;
  userId?: string;
  userEmail?: string;
  release?: string;
  tracesSampleRate?: number;
}

// Initialiser Sentry
export const initMonitoring = (config: SentryConfig = {}) => {
  if (!config.dsn) {
    console.warn('Sentry DSN not provided - monitoring disabled');
    return;
  }

  try {
    Sentry.init({
      dsn: config.dsn,
      environment: config.environment || DEFAULT_CONFIG.environment,
      release: config.release || `rivela@${process.env.npm_package_version || '1.0.0'}`,
      tracesSampleRate: config.tracesSampleRate || DEFAULT_CONFIG.tracesSampleRate,
      integrations: DEFAULT_CONFIG.integrations,
      beforeSend: DEFAULT_CONFIG.beforeSend,
    });

    // Configurer l'utilisateur si fourni
    if (config.userId || config.userEmail) {
      Sentry.setUser({
        id: config.userId,
        email: config.userEmail,
      });
    }

    console.info('Monitoring initialized successfully');
  } catch (error) {
    console.error('Failed to initialize monitoring:', error);
  }
};

// Capturer une erreur avec contexte
export const captureError = (
  error: Error | string, 
  context?: Record<string, unknown>,
  level: Sentry.SeverityLevel = 'error'
) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    
    if (context) {
      Object.keys(context).forEach(key => {
        scope.setTag(key, String(context[key]));
      });
      scope.setContext('additionalData', context);
    }
    
    if (typeof error === 'string') {
      Sentry.captureMessage(error, level);
    } else {
      Sentry.captureException(error);
    }
  });
};

// Capturer un événement personnalisé
export const captureEvent = (
  message: string,
  data?: Record<string, unknown>,
  level: Sentry.SeverityLevel = 'info'
) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    
    if (data) {
      scope.setContext('eventData', data);
    }
    
    Sentry.captureMessage(message, level);
  });
};

// Démarrer une transaction de performance
export const startTransaction = (name: string, operation: string = 'navigation') => {
  return Sentry.startTransaction({
    name,
    op: operation,
  });
};

// Mesurer les performances d'une fonction
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T> | T,
  tags?: Record<string, string>
): Promise<T> => {
  const transaction = startTransaction(name, 'function');
  
  if (tags) {
    Object.keys(tags).forEach(key => {
      transaction.setTag(key, tags[key]);
    });
  }

  try {
    const result = await fn();
    transaction.setStatus('ok');
    return result;
  } catch (error) {
    transaction.setStatus('internal_error');
    captureError(error as Error, { functionName: name });
    throw error;
  } finally {
    transaction.finish();
  }
};

// Capturer les métriques de performance web
export const captureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        captureEvent('LCP Metric', {
          value: entry.startTime,
          rating: entry.startTime > 2500 ? 'poor' : entry.startTime > 1200 ? 'needs-improvement' : 'good'
        });
      }
      
      if (entry.entryType === 'first-input') {
        captureEvent('FID Metric', {
          value: (entry as any).processingStart - entry.startTime,
          rating: (entry as any).processingStart - entry.startTime > 100 ? 'poor' : 'good'
        });
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
  } catch (error) {
    console.warn('Performance Observer not supported');
  }
};

// Capturer les erreurs de ressources (images, scripts, etc.)
export const captureResourceErrors = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      // Erreur de ressource
      captureError(`Resource load error: ${(event.target as any)?.src || 'unknown'}`, {
        type: 'resource_error',
        tagName: (event.target as any)?.tagName,
        src: (event.target as any)?.src,
      }, 'warning');
    }
  }, true);
};

// Définir des tags globaux
export const setGlobalTags = (tags: Record<string, string>) => {
  Sentry.configureScope((scope) => {
    Object.keys(tags).forEach(key => {
      scope.setTag(key, tags[key]);
    });
  });
};

// Définir l'utilisateur actuel
export const setUser = (user: { id?: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Ajouter une breadcrumb (trace de navigation)
export const addBreadcrumb = (message: string, category: string = 'custom', level: Sentry.SeverityLevel = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now() / 1000,
  });
};

// Capturer les interactions utilisateur importantes
export const captureUserAction = (action: string, data?: Record<string, unknown>) => {
  addBreadcrumb(`User action: ${action}`, 'user', 'info');
  
  if (data) {
    captureEvent(`User Action: ${action}`, data, 'info');
  }
};

// Helper pour wrapper les composants React avec Sentry
export const withSentryErrorBoundary = (Component: React.ComponentType<any>, fallback?: React.ComponentType<any>) => {
  return Sentry.withErrorBoundary(Component, {
    fallback: fallback || (() => React.createElement('div', null, 'Something went wrong')),
    beforeCapture: (scope, error, errorInfo) => {
      scope.setTag('errorBoundary', 'react');
      scope.setContext('errorInfo', errorInfo);
    },
  });
};

// Nettoyer avant le déchargement de la page
export const setupCleanup = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeunload', () => {
    Sentry.close(2000); // Attendre 2 secondes max pour envoyer les données
  });
};

// Monitoring des erreurs de promesses non gérées
export const captureUnhandledRejections = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('unhandledrejection', (event) => {
    captureError(`Unhandled Promise Rejection: ${event.reason}`, {
      type: 'unhandled_rejection',
      reason: String(event.reason),
    }, 'error');
  });
};

// Configuration complète pour l'initialisation
export const setupMonitoring = (config: SentryConfig = {}) => {
  // Initialiser Sentry
  initMonitoring(config);
  
  // Configurer les captures automatiques
  captureWebVitals();
  captureResourceErrors();
  captureUnhandledRejections();
  setupCleanup();
  
  // Tags globaux par défaut
  setGlobalTags({
    app: 'rivela',
    version: process.env.npm_package_version || '1.0.0',
    browser: navigator.userAgent.includes('Chrome') ? 'chrome' : 
             navigator.userAgent.includes('Firefox') ? 'firefox' : 
             navigator.userAgent.includes('Safari') ? 'safari' : 'other',
  });
  
  console.info('Monitoring setup completed');
};

// Export du SDK Sentry pour usage avancé
export { Sentry };