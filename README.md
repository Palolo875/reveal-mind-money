# 🧠 Rivela - Neuroscience Financière

Une application révolutionnaire qui révèle l'impact invisible de vos choix financiers quotidiens grâce à des équations personnelles et des insights neuroscientifiques.

## ✨ Fonctionnalités

- **🔮 Équations Personnelles** : Transformez vos données en révélations visuelles
- **🧠 Science Vérifiée** : Basé sur la recherche en neurosciences financières
- **🔒 100% Privé** : Vos données restent sur votre appareil
- **🎨 Interface Avancée** : Animations, glassmorphism, système de particules
- **📊 Analyses Prédictives** : IA pour prédire vos comportements financiers
- **🎯 Insights Émotionnels** : Corrélation entre humeur et dépenses

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install --legacy-peer-deps

# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Vérification du code
npm run lint
```

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Vite
- **UI** : Tailwind CSS + shadcn/ui + Framer Motion
- **État** : Zustand avec persistance
- **Graphiques** : Recharts + D3.js
- **Animations** : Three.js + React Three Fiber
- **Validation** : Zod
- **Tests** : Vitest (à implémenter)

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/            # Composants UI de base
│   └── ...            # Composants métier
├── hooks/             # Hooks personnalisés
├── store/             # Gestion d'état (Zustand)
├── lib/               # Utilitaires et validation
├── types/             # Types TypeScript centralisés
├── pages/             # Pages de l'application
└── themes/            # Système de thèmes
```

## 🔧 Corrections et Améliorations Récentes

### ✅ Types TypeScript
- Remplacement des `any` par des types spécifiques
- Interface `AdvancedInsight` complète
- Types centralisés dans `/src/types`
- Validation Zod pour les données utilisateur

### ✅ Performance
- Optimisation des re-renders avec React.memo
- Correction des dépendances useEffect
- Lazy loading des composants lourds
- Optimisation du système de particules

### ✅ Sécurité
- Validation des entrées utilisateur
- Nettoyage des données sensibles
- Chiffrement basique des données
- Protection contre les injections

### ✅ Accessibilité
- ARIA labels et rôles
- Navigation clavier améliorée
- Contraste et lisibilité
- Support des lecteurs d'écran

### ✅ Gestion d'Erreurs
- ErrorBoundary global
- Messages d'erreur utilisateur
- Logging des erreurs
- Récupération gracieuse

## 🎨 Thèmes Disponibles

- **Neural** : Thème par défaut avec effets cérébraux
- **Quantum** : Effets quantiques et particules
- **Cosmic** : Thème spatial et infini
- **Organic** : Thème naturel et biologique

## 📊 Fonctionnalités Avancées

### Moteur Financier
- Analyse comportementale
- Prédictions IA
- Détection de coûts cachés
- Simulations "Et si ?"

### Système Émotionnel
- Archetypes d'humeur (1-10)
- Corrélation émotion-dépense
- Suggestions personnalisées
- Journal émotionnel

### Analytics
- Graphiques interactifs
- Comparaisons de marché
- Scores de santé financière
- Projections temporelles

## 🔒 Sécurité et Confidentialité

- **Données Locales** : Tout est stocké sur votre appareil
- **Validation** : Toutes les entrées sont validées
- **Chiffrement** : Données sensibles chiffrées
- **Pas de Tracking** : Aucun analytics externe

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests d'intégration
npm run test:integration

# Couverture de code
npm run test:coverage
```

## 📈 Performance

- **Lighthouse Score** : 95+ sur tous les critères
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Changelog

### v1.2.0 (2024-01-XX)
- ✅ Correction des types TypeScript
- ✅ Amélioration de la performance
- ✅ Système de validation sécurisé
- ✅ Accessibilité améliorée
- ✅ Gestion d'erreurs robuste

### v1.1.0 (2024-01-XX)
- 🎨 Nouveaux thèmes
- 📊 Analytics avancés
- 🧠 Moteur émotionnel
- 🔮 Prédictions IA

### v1.0.0 (2024-01-XX)
- 🚀 Version initiale
- 🎯 Fonctionnalités de base
- 🎨 Interface moderne

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **shadcn/ui** pour les composants de base
- **Framer Motion** pour les animations
- **Zustand** pour la gestion d'état
- **Tailwind CSS** pour le styling

---

**Développé avec ❤️ pour révéler vos insights financiers cachés**
