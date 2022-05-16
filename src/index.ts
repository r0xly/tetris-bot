import { ButtonInteraction, Client, Collection, Intents, Interaction } from "discord.js";
import commands from "./commands";
import ICommand from "./commands/ICommand";
import Game from "./tetris/game";
import ButtonId from "./types/button-id";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", c => {
    console.log("Bot ready.")
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        const command = commands.get(interaction.commandName) as ICommand;
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
        }
    } else if (interaction.isButton()) {
        const game = Game.get(interaction.channelId);
        const id = interaction.customId;

        if (!game) return;

        if (id === ButtonId.EndGame) {
            game.end();
        }

        interaction.deferUpdate();
    }
});

client.login(process.env.BOT_TOKEN);