class ObjectMapper {
    constructor() {
        this.mappedObjects = [];
        this.mappedObjects[GameConstants.TEXT_TAG_NAME] = [];
        this._map();
    }

    update() {
        for (const tagKey of Object.keys(this.mappedObjects)) {
            for (const domObject of this.mappedObjects[tagKey]) {
                if (Utils.isDOMElementVisible(domObject.DOMReference)) {
                    domObject.point2D = ObjectMapper._createPoint2DFromDOMRectangle(domObject.DOMReference.getBoundingClientRect());
                }
            }
        }
    }

    _map() {
        let allDOMElements = document.querySelectorAll('*');

        allDOMElements.forEach(element => {
            const tagName = element.tagName;

            if (GameConstants.IGNORED_HTML_TAGS.includes(tagName) || !Utils.isDOMElementVisible(element)) {
                return;
            }

            const elementDOMRectangle = element.getBoundingClientRect();

            const point2D = ObjectMapper._createPoint2DFromDOMRectangle(elementDOMRectangle);
            const domObject = new DomObject(element, point2D);


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
        let coordinates = new Point(elementDOMRectangle.x + PageConstants.GET_PAGE_WIDTH_OFFSET(), elementDOMRectangle.y + PageConstants.GET_PAGE_HEIGHT_OFFSET());

        return new Point2D(coordinates.x, coordinates.y, coordinates.x + elementDOMRectangle.width, coordinates.y + elementDOMRectangle.height);
    }

}