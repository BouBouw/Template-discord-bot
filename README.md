# 🤖 Template Discord Bot v14

Une base moderne et complète pour créer un bot Discord en JavaScript avec **Discord.js v14**.

## ✨ Fonctionnalités

- **🎯 Commandes classiques** - Commandes textuelles avec préfixe (`!commande`)
- **⚡ Slash Commands** - Commandes natives Discord (`/commande`)
- **🎪 Composants v14** - Support des Buttons, Select Menus et Modals
- **🔁 Handlers dynamiques** - Chargement automatique des commandes et événements
- **📡 Bot public** - Synchronisation globale des slash commands
- **🛡️ Structure sécurisée** - `.gitignore` configuré pour protéger vos secrets

## 📋 Avertissements

### ⚠️ Intents Nécessaires

Vous devez activer les intents suivants dans le **[Discord Developer Portal](https://discord.com/developers/applications)** :

1. Aller sur votre application → **Bot**
2. Dans la section **Privileged Gateway Intents**, activer :
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent

![Discord Developers](/intents.png)

### 🔐 Sécurité - Token

**⚠️ IMPORTANT** : Le fichier `config.json` est dans `.gitignore` pour protéger votre token.

Pour plus de sécurité, utilisez des variables d'environnement :
1. Créez un fichier `.env` (voir `.env.example`)
2. Ajoutez votre token : `TOKEN=votre_token_ici`

## 📁 Structure du Projet

```
Template-discord-bot/
├── index.js                  # Point d'entrée principal
├── config.json               # Configuration (token) - non versionné
├── package.json              # Dépendances
├── .gitignore               # Fichiers ignorés par Git
├── handler/
│   └── index.js             # Handler principal (charge tout)
└── src/
    ├── commands/            # Commandes textuelles classiques
    │   └── test/
    │       └── ping.js      # Exemple: !ping
    ├── slashCommands/       # Slash commands
    │   └── test/
    │       └── ping.js      # Exemple: /ping
    └── events/              # Événements Discord
        ├── client/          # Événements liés au client
        │   ├── clientReady.js
        │   ├── messageCreate.js
        │   └── interactionCreate.js
        ├── guilds/          # Événements liés aux serveurs
        │   ├── guildMemberAdd.js
        │   └── guildMemberRemove.js
        └── users/           # Événements liés aux utilisateurs
            └── guildMemberUpdate.js
```

## 🚀 Installation

### Prérequis

- **Node.js** v16+ ([Télécharger](https://nodejs.org/))
- Un compte Discord avec un bot créé ([Créer un bot](https://discord.com/developers/applications))

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/BouBouw/Template-discord-bot.git
   cd Template-discord-bot
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer le bot**

   **Option A - Avec config.json :**
   - Créez un fichier `config.json` à la racine :
     ```json
     {
       "token": "VOTRE_TOKEN_ICI"
     }
     ```

   **Option B - Avec .env (recommandé) :**
   - Créez un fichier `.env` :
     ```env
     TOKEN=VOTRE_TOKEN_ICI
     ```
   - Modifiez `index.js` pour utiliser `dotenv`

4. **Lancer le bot**
   ```bash
   node index.js
   ```

## 📚 Nouveautés Discord.js v14

Ce template supporte les nouvelles fonctionnalités de v14 :

- **📝 Modals** - Formulaires interactifs
- **🎛️ Enhanced Select Menus** - Sélecteurs de chaînes, rôles, utilisateurs, etc.
- **🔘 Buttons** - Boutons interactifs
- **📦 EmbedBuilder** - Nouveau constructeur d'embeds
- **🎨 ActionRowBuilder** - Nouveau système de composants

## 🛠️ Technologies Utilisées

- **[discord.js v14](https://discord.js.org/)** - Librairie principale
- **Node.js** - Runtime JavaScript
- **colors** - Coloration de la console

## 📖 Exemples d'Utilisation

### Ajouter une commande classique

Créez un fichier dans `src/commands/category/` :

```javascript
module.exports = {
    name: 'bonjour',
    aliases: ['hello', 'hi'],
    description: 'Dire bonjour !',
    execute: async (client, message, args) => {
        return message.reply({ content: `👋 Bonjour ${message.author} !` });
    }
};
```

### Ajouter une slash command

Créez un fichier dans `src/slashCommands/category/` :

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonjour')
        .setDescription('Dire bonjour !'),

    name: 'bonjour',
    description: 'Dire bonjour !',

    execute: async (client, interaction) => {
        return interaction.followUp({ content: `👋 Bonjour ${interaction.user} !` });
    }
};
```

## 📝 Notes de Version

- **v14** - Migration vers Discord.js v14
  - Mise à jour des Intents
  - Support des nouveaux composants
  - Handler amélioré avec REST API
  - Correction de bugs v13

## 🔗 Ressources Utiles

- [Discord.js Guide v14](https://discordjs.guide/)
- [Discord.js Documentation](https://discord.js.org/docs/packages/main/14.14.1)
- [Discord API Documentation](https://discord.com/developers/docs/intro)
- [Discord Developers Portal](https://discord.com/developers/applications)

## 📄 Licence

Ce projet est open source. N'hésitez pas à l'utiliser et le modifier selon vos besoins !

---

**Made with ❤️ using Discord.js v14**

