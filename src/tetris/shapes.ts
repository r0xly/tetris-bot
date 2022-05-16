export interface IShape {
    cells: number[][],
    origin: [number, number],
}

namespace Shapes {
    export const O: IShape = {
        cells: [
            [1, 1], 
            [1, 1]
        ],
        origin: [0, 0],
    }

    export const I: IShape = {
        cells: [
            [1], 
            [1],
            [1],
        ],
        origin: [0, 0],
    }
}

export default Shapes;