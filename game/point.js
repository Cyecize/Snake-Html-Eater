class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }
}

class Point2D {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    collides(point) {
        let x = point.x;
        let y = point.y;

        return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
    }

    get x1() {
        return this._x1;
    }

    set x1(x1) {
        this._x1 = x1;
    }

    get x2() {
        return this._x2;
    }

    set x2(x2) {
        this._x2 = x2;
    }

    get y1() {
        return this._y1;
    }

    set y1(y1) {
        this._y1 = y1;
    }

    get y2() {
        return this._y2;
    }

    set y2(y2) {
        this._y2 = y2;
    }
}