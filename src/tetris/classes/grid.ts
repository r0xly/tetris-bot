import TetrisCharacter from "../../types/tetris-character";
import Shape from "./shape";
import Vector from "./vector";

export default class Grid {
    private grid: string[][];

    constructor(private width: number, private height: number) {
        // initializes the 2D grid array 
        this.grid = new Array(width).fill(TetrisCharacter.Background).map(() => new Array(height).fill(TetrisCharacter.Background));
    }

    public addShape(shape: Shape, grid: string[][] = this.grid) {
        for (let x = 0; x < shape.structure.cells.length; x++) {
            for (let y = 0; y < shape.structure.cells[x].length; y++) {
                if (shape.structure.cells[x][y] === 1) {
                    grid[x + shape.position.x][y + shape.position.y] = shape.structure.character;
                }
            }
        }
    }

    public get(pos: Vector) { 
        return this.grid[pos.x] ? this.grid[pos.x][pos.y] : undefined; 
    }

    public toString(shapeOverlay: Shape | undefined) {
        // creates a copy of grid
        const canvasBuffer = JSON.parse(JSON.stringify(this.grid));;
        if (shapeOverlay) this.addShape(shapeOverlay, canvasBuffer); 
        
        let canvasString = "";

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                canvasString += canvasBuffer[x][y];
            }
            canvasString += "\n";
        }

        return canvasString;
    }
}