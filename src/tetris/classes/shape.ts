import { IShapeStructure } from "../consts/shape-structures";
import Vector from "./vector";

export const Direction = {
    Left: new Vector(-1),
    Right: new Vector(1),
    Down: new Vector(0, 1),
}

export default class Shape {
    public position: Vector = new Vector();
    public readonly structure: IShapeStructure;

    constructor(shape: IShapeStructure) {
        this.structure = shape;
    }

    public move(direction: Vector) {
        this.position = this.position.add(direction);
    }

    public getBorderingCellPositions(direction: Vector): Vector[] {
        const cells = this.structure.cells;
        const borderingCells: Vector[] = [];

        for (let x = 0; x < cells.length; x++) {
            for (let y = 0; y < cells[x].length; y++) {
                const newX = x + direction.x;
                const newY = y + direction.y;
                if (!cells[newX] || !cells[newX][newY] || cells[newX][newY] === 0) {
                    borderingCells.push(this.position.add(new Vector(newX, newY)));
                } 
            }
        }

        return borderingCells;
    }
}