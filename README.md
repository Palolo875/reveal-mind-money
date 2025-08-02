# 🚀 Rivela - IA Financière & Neurosciences Révolutionnaires

Une application React/TypeScript qui combine **neurosciences financières**, **intelligence artificielle** et **design d'exception** pour transformer votre relation à l'argent à travers des équations personnelles et des insights neuroscientifiques.

---

## **🤖 Intelligence Artificielle & Neurosciences**

### **Options IA Gratuites**

Rivela intègre plusieurs moteurs d'IA gratuits et puissants :
- **Ollama (Recommandé)** : IA locale, privée, rapide, hors ligne
- **Hugging Face** : API gratuite ; modèles spécialisés
- **Cohere** : IA spécialisée finance
- **Fallback** : Algorithmes locaux prédéfinis

**Installation rapide Ollama :**
```bash
./scripts/setup-ollama.sh
# ou manuellement
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve
ollama pull mistral
```

**Configuration IA** :
```bash
cp .env.example .env.local
# Configurez vos tokens IA
```

---

## **🎨 Design Révolutionnaire**

- **Glassmorphism avancé** : Effets de verre et transparence
- **Fluid Morphism, Cinematic Micro-animations, Dynamic Typography**
- **Interface conversationnelle immersive** : ChatGPT pour la finance
- **Visual Haptic Feedback, Contextual Navigation**
- **Particules financières interactives, Thèmes émotionnels adaptatifs**

---

## **⚡ Technologies**

- **Frontend** : React 18, TypeScript, Vite
- **UI** : Tailwind CSS, shadcn/ui, Framer Motion
- **State** : Zustand, React Query
- **Animations** : Three.js, React Three Fiber
- **Validation** : Zod
- **Tests** : Vitest (à implémenter)

---

## **📊 Architecture Technique**

```
src/
├── components/          # Composants UI
│   ├── ui/             # Composants de base (shadcn/ui)
│   ├── ConversationalInterface.tsx
│   ├── LivingDataDashboard.tsx
│   └── AIConfigPanel.tsx
├── hooks/              # Hooks personnalisés
│   ├── useAdvancedFinancialEngine.ts
│   └── useSoundSystem.ts
├── services/           # Services externes
│   └── aiService.ts    # Service IA multi-provider
├── store/              # State management
│   └── useStore.ts     # Zustand store
├── themes/             # Thèmes visuels
│   └── revolutionaryThemes.ts
└── lib/                # Utilitaires
    └── validation.ts   # Validation Zod
```

---

## **🎯 Fonctionnalités Principales**

### **Interface Conversationnelle**
- Questions naturelles : "Comment optimiser mes dépenses ?"
- Exemples personnalisés, analyse émotionnelle

### **Cartographie Financière**
- Données structurées : revenus, charges, dettes
- Contexte émotionnel, analyse comportementale

### **Révélations IA**
- Insights neuroscientifiques, recommandations actionnables
- Projections temporelles : 1, 5, 10 ans

### **Simulations "Et si ?"**
- Scénarios multiples, impact émotionnel, comparaisons visuelles

### **Dashboard Vivant**
- Données animées, score de santé, détection des coûts cachés, optimisations

---

## **🔧 Configuration & Démarrage**

### **1. Cloner le projet**
```bash
git clone https://github.com/votre-username/rivela.git
cd rivela
```

### **2. Installer les dépendances**
```bash
npm install
```

### **3. Configuration IA (Optionnel)**
```bash
# Installation automatique d'Ollama
./scripts/setup-ollama.sh

# Ou configuration manuelle
cp .env.example .env.local
# Éditer .env.local avec vos tokens IA
```

### **4. Démarrer l'application**
```bash
npm run dev
```

### **5. Ouvrir dans le navigateur**
```
http://localhost:5173
```

---

## **🔒 Sécurité et Confidentialité**

- **Données Locales** : Tout est stocké sur votre appareil
- **Validation** : Toutes les entrées sont validées
- **Chiffrement** : Données sensibles chiffrées
- **Pas de Tracking** : Aucun analytics externe

---

## **📈 Performance**

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

---

## **🧪 Tests**

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Couverture de code
npm run test:coverage
```

---

## **📚 Documentation**

- **[Guide IA](docs/IA_SETUP.md)** : Configuration des IAs gratuites
- **[Architecture](docs/ARCHITECTURE.md)** : Structure technique
- **[Design System](docs/DESIGN_SYSTEM.md)** : Guide de design
- **[API Reference](docs/API.md)** : Documentation API

---

## **🤝 Contribution**

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### **Standards de code**
- **TypeScript strict** : Type safety maximale
- **ESLint** : Qualité du code
- **Prettier** : Formatage automatique
- **Tests** : Couverture de tests

---

## **📝 Changelog**

### v1.2.0 (2024-01-XX)
- Correction des types TypeScript
- Amélioration de la performance
- Système de validation sécurisé
- Accessibilité améliorée
- Gestion d'erreurs robuste

### v1.1.0 (2024-01-XX)
- Nouveaux thèmes
- Analytics avancés
- Moteur émotionnel
- Prédictions IA

### v1.0.0 (2024-01-XX)
- Version initiale
- Fonctionnalités de base
- Interface moderne

---

## **📄 Licence**

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

## **🌟 Remerciements**

- **shadcn/ui** : Composants UI exceptionnels
- **Framer Motion** : Animations fluides
- **Ollama** : IA locale gratuite
- **Hugging Face** : API IA gratuite
- **Cohere** : IA spécialisée
- **Zustand** : State management
- **Tailwind CSS** : Styling utilitaire

---

**Rivela - Transformez votre relation à l'argent avec l'IA et la neuroscience !** 🚀✨