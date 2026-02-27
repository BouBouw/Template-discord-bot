const { ActivityType } = require('discord.js');
const colors = require('colors');

module.exports = {
	name: 'clientReady',
	once: true,  // CORRECTION: ready ne s'exécute qu'une fois
execute: async (client) => {
    console.log(`[API]`.bold.white + ` Connecté à :`.bold.green + ` ${client.user.tag}`.bold.white);

    // Nouveau système d'activité v14
    client.user.setActivity('Discord.js v14', { type: ActivityType.Watching });
    }
}