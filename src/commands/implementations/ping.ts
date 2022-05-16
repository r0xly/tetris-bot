import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction } from "discord.js";
import ICommand from "../ICommand";

export default class Ping implements ICommand {
    data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("returns the ping");

    async execute(interaction: CommandInteraction) {
        return interaction.reply("pong");
    }
}