import { Collection, CommandInteraction, MessageAttachment } from "discord.js";
import TetrisCharacter from "../types/tetris-character";
import Grid from "./classes/grid";
import Shape, { Direction } from "./classes/shape";
import Vector from "./classes/vector";
import { ShapeStructure, IShapeStructure } from "./consts/shape-structures";

const games = new Collection<string, Game>();
const gameWidth = 8;
const gameHeight = 12;
const gameLoopCooldown = 1000;

function transpose(matrix: any[][]) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

export default class Game {
    private readonly channelId: string;
    private readonly interaction: CommandInteraction;
    private readonly grid = new Grid(gameWidth, gameHeight);
    private activeShape: Shape | undefined;
    private active = true;
    
    constructor(channelId: string, interaction: CommandInteraction) {
        this.channelId = channelId;
        this.interaction = interaction;

        games.set(channelId, this);
        this.initGameLoop();
        this.setRandomActiveShape();
    }

    public static get(channelId: string) {
        return games.get(channelId);
    }

    public end() {
        games.delete(this.channelId);
        this.interaction.editReply("game over");
        this.active = false;
    }

    public move(direction: Vector) {
        if (this.activeShape !== undefined) {
            const borderingCells = this.activeShape.getBorderingCellPositions(direction);
            let willCollide = false;

            // checks for collision 
            for (let i = 0; i < borderingCells.length; i++) {
                const pos = borderingCells[i];

                if (this.grid.get(pos) !== TetrisCharacter.Background) {
                    willCollide = true;
                }
            }

            if (!willCollide) {
                this.activeShape.move(direction);
            } else if (willCollide && direction === Direction.Down) {
                this.grid.addShape(this.activeShape);
                this.setRandomActiveShape();
            }
        }

        this.update();
    }

    public rotate() {
        this.activeShape!.structure.cells = transpose(this.activeShape!.structure.cells);
    }

    private update() {
        this.interaction.editReply(this.grid.toString(this.activeShape));
    }

    private initGameLoop() {
        if (!this.active) return;
        this.move(Direction.Down);

        setTimeout(() => {
           this.initGameLoop(); 
        }, gameLoopCooldown);
    }

    private setRandomActiveShape() {
        const values = Object.values(ShapeStructure);
        const structure = values[Math.floor(Math.random() * values.length)];
        this.activeShape = new Shape(structure);
    }
}