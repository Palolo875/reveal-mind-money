# 🤖 **Guide d'Installation IA Gratuite pour Rivela**

## **🎯 Vue d'ensemble**

Rivela intègre plusieurs options d'IA gratuites pour l'analyse financière :

1. **Ollama (Recommandé)** - IA locale 100% gratuite
2. **Hugging Face** - API gratuite (30k req/mois)
3. **Cohere** - API spécialisée finance (5 req/min)
4. **Fallback** - Simulation locale (toujours disponible)

---

## **🚀 Option 1 : Ollama (Recommandé)**

### **Avantages**
- ✅ **100% Gratuit** et open source
- ✅ **Données privées** - reste sur votre machine
- ✅ **Modèles avancés** - Mistral, Llama 2, CodeLlama
- ✅ **Performance** - Très rapide en local
- ✅ **Hors ligne** - Fonctionne sans internet

### **Installation**

#### **Linux/macOS**
```bash
# Installation automatique
curl -fsSL https://ollama.ai/install.sh | sh

# Ou installation manuelle
# 1. Téléchargez depuis https://ollama.ai
# 2. Décompressez et installez
```

#### **Windows (WSL)**
```bash
# Dans WSL Ubuntu
curl -fsSL https://ollama.ai/install.sh | sh
```

### **Configuration**
```bash
# 1. Démarrer Ollama
ollama serve

# 2. Télécharger un modèle (dans un autre terminal)
ollama pull mistral
ollama pull llama2

# 3. Tester
ollama run mistral "Analyse cette situation financière"
```

### **Vérification**
```bash
# Lister les modèles disponibles
ollama list

# Tester la connectivité
curl http://localhost:11434/api/tags
```

---

## **🌐 Option 2 : Hugging Face**

### **Avantages**
- ✅ **30,000 requêtes/mois** gratuites
- ✅ **Modèles spécialisés** - GPT-J, BLOOM, T5
- ✅ **API simple** - REST facile à utiliser
- ✅ **Communauté active** - Large écosystème

### **Configuration**

1. **Créer un compte** sur [Hugging Face](https://huggingface.co)
2. **Obtenir un token** dans [Settings > Tokens](https://huggingface.co/settings/tokens)
3. **Configurer l'environnement** :

```bash
# Créer le fichier .env.local
cp .env.example .env.local

# Éditer le fichier
nano .env.local

# Ajouter votre token
REACT_APP_HUGGING_FACE_TOKEN=hf_your_token_here
```

### **Modèles recommandés**
- `microsoft/DialoGPT-medium` - Conversation naturelle
- `gpt2` - Génération de texte
- `t5-base` - Traitement de texte

---

## **🧠 Option 3 : Cohere**

### **Avantages**
- ✅ **Spécialisé finance** - Modèles optimisés
- ✅ **5 requêtes/minute** gratuites
- ✅ **Fiabilité élevée** - Service stable
- ✅ **Analyse avancée** - Insights spécialisés

### **Configuration**

1. **Créer un compte** sur [Cohere Dashboard](https://dashboard.cohere.ai)
2. **Obtenir une clé API** dans [API Keys](https://dashboard.cohere.ai/api-keys)
3. **Configurer l'environnement** :

```bash
# Ajouter à .env.local
REACT_APP_COHERE_TOKEN=your_cohere_token_here
```

### **Modèles disponibles**
- `command` - Génération de texte
- `command-light` - Version rapide
- `summarize` - Résumé de texte

---

## **⚡ Option 4 : Fallback (Toujours disponible)**

### **Caractéristiques**
- ✅ **Toujours fonctionnel** - Pas de dépendance externe
- ✅ **Hors ligne** - Fonctionne sans internet
- ✅ **Rapide** - Réponse immédiate
- ✅ **Basique** - Algorithmes prédéfinis

### **Utilisation**
Aucune configuration requise. Fonctionne automatiquement si les autres providers ne sont pas disponibles.

---

## **🔧 Configuration de l'application**

### **1. Variables d'environnement**
```bash
# Copier le fichier d'exemple
cp .env.example .env.local

# Éditer avec vos tokens
nano .env.local
```

### **2. Démarrer l'application**
```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### **3. Tester la configuration**
1. Ouvrir l'application
2. Aller dans **Paramètres > Configuration IA**
3. Cliquer sur **"Tester"** pour vérifier les providers
4. Choisir votre provider préféré

---

## **📊 Comparaison des options**

| Provider | Coût | Vitesse | Précision | Confidentialité | Setup |
|----------|------|---------|-----------|-----------------|-------|
| **Ollama** | Gratuit | ⚡⚡⚡ | ⭐⭐⭐⭐ | 🔒🔒🔒 | ⚙️ |
| **Hugging Face** | 30k/mois | ⚡⚡ | ⭐⭐⭐ | 🔒🔒 | ✅ |
| **Cohere** | 5/min | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | 🔒🔒 | ✅ |
| **Fallback** | Gratuit | ⚡⚡⚡⚡ | ⭐⭐ | 🔒🔒🔒 | ✅ |

---

## **🚨 Dépannage**

### **Ollama ne démarre pas**
```bash
# Vérifier le service
sudo systemctl status ollama

# Redémarrer
sudo systemctl restart ollama

# Vérifier les logs
journalctl -u ollama -f
```

### **Erreur de connectivité**
```bash
# Tester la connexion
curl http://localhost:11434/api/tags

# Vérifier le port
netstat -tlnp | grep 11434
```

### **Token Hugging Face invalide**
1. Vérifier le token sur [Hugging Face](https://huggingface.co/settings/tokens)
2. Régénérer si nécessaire
3. Mettre à jour `.env.local`

### **Limite Cohere atteinte**
- Attendre 1 minute (limite 5 req/min)
- Vérifier l'utilisation sur [Dashboard](https://dashboard.cohere.ai)

---

## **🎯 Recommandations**

### **Pour le développement**
- Utilisez **Ollama** pour les tests rapides
- **Fallback** comme backup

### **Pour la production**
- **Ollama** si vous avez les ressources serveur
- **Hugging Face** pour la simplicité
- **Cohere** pour la précision financière

### **Pour la confidentialité**
- **Ollama** - Données 100% privées
- **Fallback** - Aucune donnée externe

---

## **📚 Ressources**

- [Documentation Ollama](https://ollama.ai/docs)
- [API Hugging Face](https://huggingface.co/docs/api-inference)
- [API Cohere](https://docs.cohere.com)
- [Guide des modèles](https://huggingface.co/models)

---

## **🆘 Support**

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** dans la console du navigateur
2. **Testez la connectivité** dans les paramètres IA
3. **Consultez la documentation** des providers
4. **Utilisez le fallback** en cas d'urgence

**Rivela fonctionnera toujours avec le mode fallback, même sans IA externe !** 🎉