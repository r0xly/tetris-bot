import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";

export default interface ICommand {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>,
}