module.exports = {
    name: 'ping',
    description: '[ 💡 Misc ] Answer pong!',
execute: async (client, interaction, args) => {
    return interaction.followUp({ content: `:ping_pong: • ${interaction.member} pong!` })
    }
}