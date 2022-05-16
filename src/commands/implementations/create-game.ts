import { SlashCommandBuilder } from "@discordjs/builders";
import { Collection, CommandInteraction, Message, MessageActionRow, MessageButton } from "discord.js";
import Game from "../../tetris/game";
import ButtonId from "../../types/button-id";
import GameError from "../../types/game-error";
import ICommand from "../ICommand";


export default class Ping implements ICommand {
    data = new SlashCommandBuilder()
        .setName("create-game")
        .setDescription("Creates a game.");

    async execute(interaction: CommandInteraction) {
        const channelId = interaction.channelId;

        if (Game.get(channelId)) return interaction.reply(GameError.ActiveGame);

        const game = this.createGame(channelId);
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(ButtonId.MoveLeft)
                    .setLabel("<")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId(ButtonId.MoveRight)
                    .setLabel(">")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId(ButtonId.EndGame)
                    .setLabel("x")
                    .setStyle("DANGER"),
            );
        
        return interaction.reply({ content: "Game", components: [row]});
    }

    private createGame(channelId: string) {
        return new Game(channelId);
    }
}