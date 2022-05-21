import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import commands from "./commands";

const token = process.env.BOT_TOKEN as string;
const applicationId = process.env.APPLICATION_ID as string;
const guildId = process.env.GUILD_ID as string;

const rest = new REST({ version: "9" }).setToken(token);
const commandData = [];

for (const [_, command] of commands) {
    commandData.push(command.data.toJSON());
}

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commandData })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);