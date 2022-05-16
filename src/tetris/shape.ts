import { IShape } from "./shapes";

export enum Direction {
    Left,
    Right,
    Bottom,
}

export default class Shape {
    private position: [number, number] = [0, 0];
    private origin: [number, number];
    private cells: number[][];

    constructor(shape: IShape) {
        this.origin = shape.origin;
        this.cells = shape.cells;
    }

    public move(direction: Direction) {

    }
}