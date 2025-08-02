import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupMonitoring } from './lib/monitoring'

// Initialiser le monitoring si configuré
if (import.meta.env.VITE_SENTRY_DSN) {
  setupMonitoring({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
    release: `rivela@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
  });
}

createRoot(document.getElementById("root")!).render(<App />);
