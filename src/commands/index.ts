import fs from "node:fs";
import path from "path";
import { Collection } from "discord.js";
import ICommand from "./ICommand";

const commands = new Collection<string, ICommand>();
const commandPath = path.join(__dirname, "implementations");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = new (require(filePath).default)();
    commands.set(command.data.name, command);
}

export default commands;