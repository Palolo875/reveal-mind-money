#!/bin/bash

echo "🚀 Installation d'Ollama pour Rivela..."

# Vérifier si Ollama est déjà installé
if command -v ollama &> /dev/null; then
    echo "✅ Ollama est déjà installé"
else
    echo "📥 Installation d'Ollama..."
    
    # Installation pour Linux
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -fsSL https://ollama.ai/install.sh | sh
    # Installation pour macOS
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        curl -fsSL https://ollama.ai/install.sh | sh
    # Installation pour Windows (WSL)
    else
        echo "⚠️  Système non supporté. Veuillez installer Ollama manuellement depuis https://ollama.ai"
        exit 1
    fi
fi

# Démarrer Ollama
echo "🔄 Démarrage d'Ollama..."
ollama serve &

# Attendre que le service soit prêt
sleep 5

# Télécharger le modèle Mistral (recommandé pour les finances)
echo "📥 Téléchargement du modèle Mistral..."
ollama pull mistral

# Télécharger le modèle Llama 2 (alternative)
echo "📥 Téléchargement du modèle Llama 2..."
ollama pull llama2

echo "✅ Installation terminée !"
echo "🎯 Modèles disponibles :"
ollama list

echo ""
echo "🚀 Pour démarrer l'IA :"
echo "   ollama serve"
echo ""
echo "🧪 Pour tester :"
echo "   ollama run mistral 'Analyse cette situation financière...'"