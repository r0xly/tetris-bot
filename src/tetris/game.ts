import { Collection } from "discord.js";

const games = new Collection();

export default class Game {
    private readonly channelId: string;

    constructor(channelId: string) {
        this.channelId = channelId;
        games.set(channelId, this);
    }

    public static get(channelId: string) {
        return games.get(channelId);
    }

    public end() {
        games.delete(this.channelId);
    }
}