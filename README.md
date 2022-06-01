# Template Discord Bot
Une base squelette d'un robot Discord développer en JavaScript, utilisant le module `discord.js` en V13, permettant les ***Slash Commands*** & ***Text Commands*** sur le/les serveur(s).
Il comprend la fonctionnalité de bot ***public*** en synchronisant toutes les commandes sur tous les serveurs ayant votre robot.

# Avertissements
⚠️ | Il faut avoir les intents activés sur votre ***espace développeur*** de Discord.
<br>
⚠️ | L'intent `message content` va être obselète le 31 aout 2022.
<br><br>
![Discord Developpers](/intents.png)

# Composition de la base
    - Commands
      - Dossiers Parents
        - Commandes

    - Slash Commands
      - Dossiers Parents
        - Commandes

    - Events
      - Client
        - Files
      - Guilds
        - Files
      - Users
        - Files

# Installation
Pour installer cette version du bot, vous devez:

1. Clone le repository
2. Extraire le dossier .ZIP
3. Ouvrir le dossier dans un IDE quelconque (Visual Studio Code, NotePad++, ...)
4. Mettre son token dans le fichier `config.json`
5. Lancer un terminal et faite la commande suivante `npm install`
6. Toujours dans le terminal faîtes `node index.js`

# Voilà votre robot est maintenant lancer !
