class ObjectMapper {
    constructor(units) {
        this.units = units;
        this.mappedObjects = [];
        this._map();
    }

    update() {

    }

    _map() {
        let allDOMElements = document.querySelectorAll('*');
        allDOMElements.forEach(element => {
            console.log(`${element.tagName} -> ${element.getBoundingClientRect().x} : ${element.getBoundingClientRect().y}`);
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