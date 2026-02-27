const { readdirSync } = require('fs');
const { REST, Routes } = require('discord.js');
const colors = require('colors');

module.exports = (client) => {
    // Utiliser le token depuis client.config (déjà chargé dans index.js)
    const token = client.config?.token;

    // ============================================
    // 🎯 STRUCTURE UNIFIÉE - COMMANDS & SLASH
    // ============================================

    const arrayOfSlashCommands = [];
    let commandsCount = 0;
    let slashCommandsCount = 0;

    // Charger les commandes depuis src/commands/
    const loadCommands = (dir = "./src/commands/") => {
        try {
            const categories = readdirSync(dir);

            categories.forEach(category => {
                const commandsPath = `${dir}${category}/`;
                const commandFiles = readdirSync(commandsPath).filter(files => files.endsWith(".js"));

                for (const file of commandFiles) {
                    const commandPath = `../${dir}${category}/${file}`;
                    const command = require(commandPath);

                    if (!command.name) {
                        console.log(`[COMMANDS]`.bold.red + ` Erreur:`.bold.yellow + ` ${file} n'a pas de nom !`.bold.red);
                        continue;
                    }

                    // Enregistrer dans client.commands (pour commandes classiques)
                    client.commands.set(command.name, command);
                    commandsCount++;

                    // Si la commande a des données slash, l'enregistrer aussi
                    if (command.slashData) {
                        client.slashCommands.set(command.name, command);
                        arrayOfSlashCommands.push(command.slashData.toJSON());
                        slashCommandsCount++;

                        console.log(`[UNIFIED]`.bold.magenta +
                            ` [${category.padEnd(12)}]`.bold.white +
                            ` ${command.name.padEnd(15)}`.bold.cyan +
                            ` (prefix + slash)`.bold.green);
                    } else {
                        // Commande classique uniquement
                        console.log(`[PREFIX]  `.bold.blue +
                            ` [${category.padEnd(12)}]`.bold.white +
                            ` ${command.name.padEnd(15)}`.bold.cyan);
                    }
                }
            });
        } catch (error) {
            console.log(`[COMMANDS]`.bold.red + ` Erreur lors du chargement:`.bold.yellow, error.message);
        }
    };

    loadCommands();
    console.log(`•----------•`.bold.black);

    // Afficher le résumé
    console.log(`[LOADED]  `.bold.white +
        `${commandsCount} commande(s)`.bold.green +
        ` | ${slashCommandsCount} slash command(s)`.bold.cyan
    );
    console.log(`•----------•`.bold.black);

    // Synchronisation avec l'API Discord v14
    if (slashCommandsCount > 0) {
        client.once('clientReady', async () => {
            try {
                console.log(`[API]`.bold.white + ` Synchronisation de `.bold.cyan + `${slashCommandsCount}`.bold.white + ` slash command(s)...`.bold.cyan);

                const rest = new REST({ version: '10' }).setToken(token);

                await rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: arrayOfSlashCommands }
                );

                console.log(`[API]`.bold.green + ` ✅ Commandes synchronisées avec succès !`.bold.white);
            } catch (error) {
                console.error(`[API]`.bold.red + ` ❌ Erreur lors de la synchronisation :`.bold.yellow, error.message);
            }
        });
    } else {
        console.log(`[API]`.bold.yellow + ` ⚠️  Aucune slash command à synchroniser`.bold.white);
    }
    console.log(`•----------•`.bold.black);

    // ============================================
    // 📡 EVENTS
    // ============================================

    const loadEvents = (dir = "./src/events/") => {
        try {
            const categories = readdirSync(dir);

            categories.forEach(category => {
                const eventsPath = `${dir}${category}/`;
                const eventFiles = readdirSync(eventsPath).filter(files => files.endsWith(".js"));

                for (const file of eventFiles) {
                    const eventPath = `../${dir}${category}/${file}`;
                    const event = require(eventPath);

                    if (!event.name) {
                        console.log(`[EVENTS]`.bold.red + ` Erreur:`.bold.yellow + ` ${file} n'a pas de nom !`.bold.red);
                        continue;
                    }

                    // Gestion de 'once' vs 'on' selon la propriété de l'event
                    const emitter = event.once ? client.once.bind(client) : client.on.bind(client);
                    emitter(event.name, (...args) => event.execute(...args, client));

                    console.log(`[EVENTS] `.bold.red +
                        ` [${category.padEnd(10)}] `.bold.white +
                        `${event.name}`.bold.cyan
                    );
                }
            });
        } catch (error) {
            console.log(`[EVENTS]`.bold.red + ` Erreur lors du chargement:`.bold.yellow, error.message);
        }
    };

    loadEvents();
    console.log(`•----------•`.bold.black);
};
