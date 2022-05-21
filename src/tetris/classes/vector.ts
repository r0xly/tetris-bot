export default class Vector {
    constructor(public x = 0, public y = 0, public z = 0) {}

    public add(v: Vector) {
        return new Vector(v.x + this.x, v.y + this.y, v.z + this.z);
    }

    public mul(scaleFactor: number) {
        return new Vector(this.x * scaleFactor, this.y * scaleFactor, this.z * scaleFactor);
    } 
}