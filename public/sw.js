// Service Worker pour Rivela - PWA & Performance
const CACHE_NAME = 'rivela-v1.2.0';
const STATIC_CACHE = 'rivela-static-v1.2.0';
const DYNAMIC_CACHE = 'rivela-dynamic-v1.2.0';

// Ressources essentielles à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // CSS et JS seront ajoutés dynamiquement
];

// Ressources à mettre en cache réseau d'abord
const NETWORK_FIRST = [
  '/api/',
  '/auth/',
];

// Ressources à mettre en cache d'abord
const CACHE_FIRST = [
  '/assets/',
  '/images/',
  '/icons/',
  '.woff2',
  '.woff',
  '.ttf',
  '.css',
  '.js',
];

// Installation du service worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installation');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Service Worker: Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        // Forcer l'activation immédiate
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Erreur d\'installation', error);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activation');
  
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== CACHE_NAME
            )
            .map(cacheName => {
              console.log('🗑️ Service Worker: Suppression ancien cache', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Prendre le contrôle immédiatement
      self.clients.claim()
    ])
    .then(() => {
      console.log('✅ Service Worker: Activation terminée');
    })
    .catch(error => {
      console.error('❌ Service Worker: Erreur d\'activation', error);
    })
  );
});

// Stratégie de mise en cache
const getCacheStrategy = (url) => {
  // Réseau d'abord pour les API
  if (NETWORK_FIRST.some(pattern => url.includes(pattern))) {
    return 'network-first';
  }
  
  // Cache d'abord pour les assets statiques
  if (CACHE_FIRST.some(pattern => url.includes(pattern))) {
    return 'cache-first';
  }
  
  // Stale-while-revalidate par défaut
  return 'stale-while-revalidate';
};

// Gestion des requêtes réseau
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = request.url;
  
  // Ignorer les requêtes non-HTTP
  if (!url.startsWith('http')) {
    return;
  }
  
  // Ignorer les requêtes vers les extensions du navigateur
  if (url.includes('chrome-extension') || url.includes('moz-extension')) {
    return;
  }
  
  const strategy = getCacheStrategy(url);
  
  switch (strategy) {
    case 'network-first':
      event.respondWith(networkFirst(request));
      break;
    case 'cache-first':
      event.respondWith(cacheFirst(request));
      break;
    default:
      event.respondWith(staleWhileRevalidate(request));
  }
});

// Stratégie: Réseau d'abord
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Service Worker: Réseau indisponible, utilisation du cache');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Retourner une réponse d'erreur personnalisée
    return new Response(
      JSON.stringify({
        error: 'Connexion réseau indisponible',
        message: 'Veuillez vérifier votre connexion internet'
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Stratégie: Cache d'abord
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Service Worker: Échec de récupération', request.url);
    
    // Retourner une image placeholder pour les images
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Image non disponible</text></svg>',
        {
          headers: {
            'Content-Type': 'image/svg+xml',
          },
        }
      );
    }
    
    throw error;
  }
}

// Stratégie: Stale-While-Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Mettre à jour en arrière-plan
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(error => {
      console.log('🌐 Service Worker: Mise à jour échouée', error);
      return cachedResponse;
    });
  
  // Retourner le cache immédiatement ou attendre le réseau
  return cachedResponse || fetchPromise;
}

// Gestion des messages du thread principal
self.addEventListener('message', event => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage({ type: 'CACHE_INFO', data: info });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      });
      break;
      
    case 'PREFETCH_ROUTES':
      prefetchRoutes(data.routes);
      break;
  }
});

// Obtenir les informations de cache
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const cacheInfo = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    cacheInfo[cacheName] = {
      size: keys.length,
      urls: keys.map(req => req.url).slice(0, 10) // Limiter pour la performance
    };
  }
  
  return cacheInfo;
}

// Nettoyer tous les caches
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  console.log('🗑️ Service Worker: Tous les caches supprimés');
}

// Précharger des routes importantes
async function prefetchRoutes(routes) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  for (const route of routes) {
    try {
      const response = await fetch(route);
      if (response.ok) {
        await cache.put(route, response);
        console.log('📦 Service Worker: Route préchargée', route);
      }
    } catch (error) {
      console.log('❌ Service Worker: Échec préchargement', route, error);
    }
  }
}

// Gestion des notifications push (si activé)
self.addEventListener('push', event => {
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: data.tag || 'default',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Ouvrir Rivela'
      },
      {
        action: 'close',
        title: 'Fermer'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Rivela', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', event => {
  if (event.tag === 'financial-data-sync') {
    event.waitUntil(syncFinancialData());
  }
});

async function syncFinancialData() {
  // Ici vous pourriez synchroniser les données financières
  // avec un serveur quand la connexion est rétablie
  console.log('🔄 Service Worker: Synchronisation des données financières');
}

console.log('🚀 Service Worker Rivela chargé et prêt!');