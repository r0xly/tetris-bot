import TetrisCharacter from "../../types/tetris-character";
import Vector from "../classes/vector";

export interface IShapeStructure {
    cells: number[][],
    origin: Vector,
    character: TetrisCharacter,
}

export const ShapeStructure: { [key: string]: IShapeStructure } = {
    O: {
        cells: [
            [1, 1], 
            [1, 1]
        ],
        origin: new Vector(),
        character: TetrisCharacter.Yellow,
    },

    I: {
        cells: [
            [1], 
            [1],
            [1],
            [1],
        ],
        origin: new Vector(),
        character: TetrisCharacter.Blue,
    },

    S: {
        cells: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        origin: new Vector(),
        character: TetrisCharacter.Red,
    },


    Z: {
        cells: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        origin: new Vector(),
        character: TetrisCharacter.Green,
    },

    L: {
        cells: [
            [1, 0],
            [1, 0],
            [1, 1]
        ],
        origin: new Vector(),
        character: TetrisCharacter.Orange,
    },

    J: {
        cells: [
            [0, 1],
            [0, 1],
            [1, 1]
        ],
        origin: new Vector(),
        character: TetrisCharacter.Orange,
    },

    T: {
        cells: [
            [1, 0],
            [1, 1],
            [1, 0],
        ],
        origin: new Vector(),
        character: TetrisCharacter.Brown,
    }
}
