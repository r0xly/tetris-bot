import { Collection, CommandInteraction } from "discord.js";

const games = new Collection<string, Game>();

export default class Game {
    private readonly channelId: string;
    private readonly interaction: CommandInteraction;

    constructor(channelId: string, interaction: CommandInteraction) {
        this.channelId = channelId;
        this.interaction = interaction;
        games.set(channelId, this);
    }

    public static get(channelId: string) {
        return games.get(channelId);
    }

    public end() {
        games.delete(this.channelId);
        this.interaction.editReply("game over");
    }
}