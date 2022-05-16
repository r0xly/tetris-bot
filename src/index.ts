import { Client, Collection, Intents, Interaction } from "discord.js";
import commands from "./commands";
import ICommand from "./commands/ICommand";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", c => {
    console.log("Bot ready.")
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName) as ICommand;
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
    }
});


client.login(process.env.BOT_TOKEN);