import { useState, useEffect } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isWaiting: boolean;
  isOnline: boolean;
  registration: ServiceWorkerRegistration | null;
  error: string | null;
}

interface UseServiceWorkerReturn extends ServiceWorkerState {
  register: () => Promise<void>;
  unregister: () => Promise<void>;
  update: () => Promise<void>;
  skipWaiting: () => void;
  getCacheInfo: () => Promise<any>;
  clearCache: () => Promise<void>;
  prefetchRoutes: (routes: string[]) => void;
}

export const useServiceWorker = (swUrl: string = '/sw.js'): UseServiceWorkerReturn => {
  const [state, setState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isWaiting: false,
    isOnline: navigator.onLine,
    registration: null,
    error: null,
  });

  // Mettre à jour le statut en ligne/hors ligne
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enregistrer le service worker
  const register = async (): Promise<void> => {
    if (!state.isSupported) {
      throw new Error('Service Worker not supported');
    }

    try {
      console.log('🔧 Enregistrement du Service Worker...');
      
      const registration = await navigator.serviceWorker.register(swUrl, {
        scope: '/'
      });

      console.log('✅ Service Worker enregistré:', registration);

      // Vérifier les mises à jour
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          console.log('🔄 Nouvelle version du Service Worker trouvée');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('⏳ Nouvelle version en attente');
              setState(prev => ({ ...prev, isWaiting: true }));
            }
          });
        }
      });

      setState(prev => ({
        ...prev,
        isRegistered: true,
        registration,
        error: null,
      }));

    } catch (error) {
      console.error('❌ Échec enregistrement Service Worker:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  };

  // Désinscrire le service worker
  const unregister = async (): Promise<void> => {
    if (!state.registration) {
      return;
    }

    try {
      const success = await state.registration.unregister();
      if (success) {
        console.log('🗑️ Service Worker désinscrit');
        setState(prev => ({
          ...prev,
          isRegistered: false,
          registration: null,
          isWaiting: false,
        }));
      }
    } catch (error) {
      console.error('❌ Échec désinscription Service Worker:', error);
      throw error;
    }
  };

  // Mettre à jour le service worker
  const update = async (): Promise<void> => {
    if (!state.registration) {
      throw new Error('No registration found');
    }

    try {
      await state.registration.update();
      console.log('🔄 Service Worker mis à jour');
    } catch (error) {
      console.error('❌ Échec mise à jour Service Worker:', error);
      throw error;
    }
  };

  // Passer à la nouvelle version
  const skipWaiting = (): void => {
    if (!state.registration?.waiting) {
      return;
    }

    state.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    setState(prev => ({ ...prev, isWaiting: false }));

    // Recharger la page après un court délai
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Obtenir les informations de cache
  const getCacheInfo = async (): Promise<any> => {
    if (!state.registration?.active) {
      throw new Error('No active service worker');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_INFO') {
          resolve(event.data.data);
        } else {
          reject(new Error('Failed to get cache info'));
        }
      };

      state.registration.active.postMessage(
        { type: 'GET_CACHE_INFO' },
        [messageChannel.port2]
      );
    });
  };

  // Nettoyer le cache
  const clearCache = async (): Promise<void> => {
    if (!state.registration?.active) {
      throw new Error('No active service worker');
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_CLEARED') {
          resolve();
        } else {
          reject(new Error('Failed to clear cache'));
        }
      };

      state.registration.active.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
    });
  };

  // Précharger des routes
  const prefetchRoutes = (routes: string[]): void => {
    if (!state.registration?.active) {
      console.warn('No active service worker for prefetching');
      return;
    }

    state.registration.active.postMessage({
      type: 'PREFETCH_ROUTES',
      data: { routes }
    });
  };

  // Auto-enregistrement au montage
  useEffect(() => {
    if (state.isSupported && !state.isRegistered) {
      register().catch(console.error);
    }
  }, [state.isSupported, state.isRegistered]);

  // Écouter les changements de contrôleur
  useEffect(() => {
    if (!state.isSupported) return;

    const handleControllerChange = () => {
      console.log('🔄 Service Worker contrôleur changé');
      // Optionnel: recharger la page
      // window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [state.isSupported]);

  return {
    ...state,
    register,
    unregister,
    update,
    skipWaiting,
    getCacheInfo,
    clearCache,
    prefetchRoutes,
  };
};

// Hook pour afficher les notifications de mise à jour
export const useServiceWorkerUpdate = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const sw = useServiceWorker();

  useEffect(() => {
    if (sw.isWaiting) {
      setShowUpdatePrompt(true);
    }
  }, [sw.isWaiting]);

  const acceptUpdate = () => {
    sw.skipWaiting();
    setShowUpdatePrompt(false);
  };

  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  return {
    showUpdatePrompt,
    acceptUpdate,
    dismissUpdate,
    ...sw,
  };
};

// Notification de statut hors ligne
export const useOfflineStatus = () => {
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const sw = useServiceWorker();

  useEffect(() => {
    if (!sw.isOnline) {
      setShowOfflineMessage(true);
      const timer = setTimeout(() => setShowOfflineMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [sw.isOnline]);

  return {
    isOnline: sw.isOnline,
    showOfflineMessage,
    dismissOfflineMessage: () => setShowOfflineMessage(false),
  };
};