class DomObject {
    constructor(DOMReference, point2D) {
        this._DOM = DOMReference;
        this.point2D = point2D;
        this.isHidden = false;
    }

    overlaps(point) {
        return this.point2D.overlaps(point);
    }

    hide() {

    }

    get DOMReference() {
        return this._DOM;
    }

    get point2D() {
        return this._point2D;
    }

    set point2D(point) {
        this._point2D = point;
    }
}