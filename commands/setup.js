const { setupMemes } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("memes")
        .setDescription(
            "Définir/Supprimer ce channel autorisable pour les memes."
        )
    );
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "memes":
            if (setupMemes.get(interaction.channel.id) === undefined) {
                setupMemes.set(interaction.channel.id, interaction.guild.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> ajouté à la liste des channels memes !`,
                    ephemeral: true,
                });
            } else {
                setupMemes.delete(interaction.channel.id);
                await interaction.reply({
                    content: `Channel <#${interaction.channel.id}> supprimé de la liste des channels memes !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
