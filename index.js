const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

// Configuration avec support .env ou config.json
let token = null;

// Priorité 1: Charger depuis .env
if (fs.existsSync(path.join(__dirname, '.env'))) {
    require('dotenv').config();
    token = process.env.TOKEN;
    if (token) {
        console.log(`[CONFIG]`.bold.green + ` Token chargé depuis `.bold.white + `.env`.bold.green);
    }
}

// Priorité 2: Charger depuis config.json
if (!token) {
    try {
        const config = require('./config.json');
        token = config.token;
        console.log(`[CONFIG]`.bold.yellow + ` Token chargé depuis `.bold.white + `config.json`.bold.yellow);
        console.log(`[CONFIG]`.bold.yellow + ` (Recommandé: utiliser `.bold.white + `.env`.bold.yellow + ` pour plus de sécurité)`.bold.yellow);
    } catch (error) {
        console.error(`[CONFIG]`.bold.red + ` Erreur: Impossible de charger `.bold.white + `config.json`.bold.red);
    }
}

// Vérifier que le token existe
if (!token) {
    console.error(`[CONFIG]`.bold.red + ` Erreur critique: Token non trouvé !`.bold.white);
    console.error(`[CONFIG]`.bold.red + ` Créez un fichier `.bold.white + `.env` + ` avec: `.bold.red + `TOKEN=votre_token_ici`.bold.white);
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = { token }; // Stocker la config pour le handler

startProccess();
function startProccess() {
    require("./handler")(client);
}

client.login(token)