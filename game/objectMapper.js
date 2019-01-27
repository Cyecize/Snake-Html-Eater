class ObjectMapper {
    constructor(units) {
        this.units = units;
        this.mappedObjects = [];
        this._map();
        console.log(this.mappedObjects);
    }

    update() {

    }

    _map() {
        let allDOMElements = document.querySelectorAll('*');

        allDOMElements.forEach(element => {
            let tagName = element.tagName;

            if (GameConstants.UNMAPPED_HTML_TAGS.includes(tagName)) {
                return;
            }

            if (!Utils.isDOMElementVisible(element)) {
                console.log('hidden ');
                console.log(element);
                return;
            }

            //console.log(`${tagName} -> ${element.getBoundingClientRect().x} : ${element.getBoundingClientRect().y}`);
            let elementDOMRectangle = element.getBoundingClientRect();

            let widthHeightUnits = Utils.calculateUnitsForDOMElement(GameConstants.SNAKE_PARTICLE_SIZE, elementDOMRectangle);
            let coordinatesInUnits = Utils.calculateUnitsForCoordinates(GameConstants.SNAKE_PARTICLE_SIZE, elementDOMRectangle.x, elementDOMRectangle.y);

            let point2D = new Point2D(coordinatesInUnits.x, coordinatesInUnits.y, coordinatesInUnits.x + widthHeightUnits.width, coordinatesInUnits.y + widthHeightUnits.height);
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

    set units(units) {
        this._units = units;
    }

    get units() {
        return this._units;
    }
}