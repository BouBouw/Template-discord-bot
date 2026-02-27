const colors = require('colors');

module.exports = {
	name: 'interactionCreate',
	once: false,  // CORRECTION: interactionCreate doit s'exécuter à chaque interaction
	execute: async (interaction, client) => {
        // ============================================
        // ⚡ SLASH COMMANDS (Structure Unifiée)
        // ============================================
        if(interaction.isChatInputCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});

            const cmd = client.slashCommands.get(interaction.commandName);
            if(!cmd) {
                return interaction.followUp({ content: `:x: • ${interaction.user} une erreur est survenue lors du chargement de l'interaction.` })
            }

            // Extraire les arguments
            const args = [];
            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            // Exécuter la commande avec le format unifié (source = interaction)
            if (cmd.execute) {
                cmd.execute(client, interaction, args);
                console.log(`[SLASH] `.bold.magenta + `/${cmd.name}`.bold.blue + ` executée par `.bold.white + interaction.username.bold.white);
            }
        }

        // ============================================
        // 🔘 BOUTONS (v14)
        // ============================================
        else if(interaction.isButton()) {
            // Gérer les boutons ici
            console.log(`[BUTTONS] `.bold.red + `Button ${interaction.customId} clicked`.bold.white);
        }

        // ============================================
        // 📋 SELECT MENUS (v14)
        // ============================================
        else if(interaction.isStringSelectMenu()) {
            // Gérer les select menus ici
            console.log(`[SELECT MENUS] `.bold.red + `Select menu ${interaction.customId} used`.bold.white);
        }

        // ============================================
        // 📝 MODALS (v14)
        // ============================================
        else if(interaction.isModalSubmit()) {
            // Gérer les modals ici
            console.log(`[MODALS] `.bold.red + `Modal ${interaction.customId} submitted`.bold.white);
        }
    }
}