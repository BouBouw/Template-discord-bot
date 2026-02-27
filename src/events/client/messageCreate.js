const colors = require('colors');

module.exports = {
	name: 'messageCreate',
	once: false,  // CORRECTION: messageCreate doit s'exécuter à chaque message
	execute: async (message, client) => {
        const prefix = '!'

		awaitCommands();

        async function awaitCommands() {
            if(message.author.bot) return;
            if(!message.guild) return;
        
            const args = message.content.trim().split(/ +/g)
            const commandName = args.shift().toLowerCase()
            const command = 
            client.commands.get(commandName.slice(prefix.length)) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName.slice(prefix.length)));
          
            if (!commandName.startsWith(prefix)) return;
            if (command) {
                command.execute(client, message, args);
                console.log(`[COMMANDS] `.bold.red + `${prefix}${command.name}`.bold.blue + ` à été executée.`.bold.white);
            }
        }
    }
}