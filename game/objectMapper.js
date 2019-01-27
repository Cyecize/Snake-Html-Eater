class ObjectMapper {
    constructor() {
        this.mappedObjects = [];
        this._map();
    }

    update() {
        for (let tagKey of Object.keys(this.mappedObjects)) {
            for (let domObject of this.mappedObjects[tagKey]) {
                if (Utils.isDOMElementVisible(domObject.DOMReference)) {
                    domObject.point2D = ObjectMapper._createPoint2DFromDOMRectangle(domObject.DOMReference.getBoundingClientRect());
                }
            }
        }
    }

    _map() {
        let allDOMElements = document.querySelectorAll('*');

        allDOMElements.forEach(element => {
            let tagName = element.tagName;

            if (GameConstants.IGNORED_HTML_TAGS.includes(tagName)) {
                return;
            }

            if (!Utils.isDOMElementVisible(element)) {
                return;
            }

            let elementDOMRectangle = element.getBoundingClientRect();

            let point2D = ObjectMapper._createPoint2DFromDOMRectangle(elementDOMRectangle);
            let domObject = new DomObject(element, point2D);

            if (!this.mappedObjects[tagName]) {
                this.mappedObjects[tagName] = [];
            }

            this.mappedObjects[tagName].push(domObject);
        });
    }

    set mappedObjects(mappedObjects) {
        this._mappedObjects = mappedObjects;
    }

    get mappedObjects() {
        return this._mappedObjects;
    }

    static _createPoint2DFromDOMRectangle(elementDOMRectangle) {
        let widthHeightUnits = ObjectMapper._calcWidthHeightUnits(elementDOMRectangle);
        let coordinatesInUnits = ObjectMapper._calcCoordinatesInUnits(elementDOMRectangle);

        return new Point2D(coordinatesInUnits.x, coordinatesInUnits.y, coordinatesInUnits.x + widthHeightUnits.width, coordinatesInUnits.y + widthHeightUnits.height);
    }

    static _calcWidthHeightUnits(elementDOMRectangle) {
        return Utils.calculateUnitsForDOMElement(GameConstants.SNAKE_PARTICLE_SIZE, elementDOMRectangle);
    }

    static _calcCoordinatesInUnits(elementDOMRectangle) {
        return Utils.calculateUnitsForCoordinates(GameConstants.SNAKE_PARTICLE_SIZE, elementDOMRectangle.x + PageConstants.PAGE_WIDTH_OFFSET(), elementDOMRectangle.y + PageConstants.PAGE_HEIGHT_OFFSET());
    }
}