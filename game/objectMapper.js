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
        const allDOMElements = document.querySelectorAll('*');

        allDOMElements.forEach(element => {
            const tagName = element.tagName;

            if (GameConstants.IGNORED_HTML_TAGS.includes(tagName) || !Utils.isDOMElementVisible(element)) {
                return;
            }

            this._mapElement(element, tagName);
            this._mapLetters(element);
        });
    }

    _mapLetters(element) {
        if (!element.hasChildNodes()) {
            return;
        }

        const nodes = Array.from(element.childNodes).filter(node => node.nodeType === GameConstants.TEXT_NODE_TYPE);
        for (const node of nodes) {
            const lettersContainer = document.createElement(GameConstants.TEXT_CONTAINER_TAG_NAME);
            const nodeTextContent = node.textContent.trim();

            for (let letterIndex = 0; letterIndex < nodeTextContent.length; letterIndex++) {
                const snakeTextNode = document.createElement(GameConstants.TEXT_TAG_NAME);
                snakeTextNode.innerText = nodeTextContent[letterIndex];
                lettersContainer.appendChild(snakeTextNode);
            }

            element.replaceChild(lettersContainer, node);

            this._mapElement(lettersContainer, GameConstants.TEXT_CONTAINER_TAG_NAME);
            Array.from(lettersContainer.childNodes).forEach(n => this._mapElement(n, GameConstants.TEXT_TAG_NAME));
        }
    }

    _mapElement(element, tagName) {
        const elementDOMRectangle = element.getBoundingClientRect();

        const point2D = ObjectMapper._createPoint2DFromDOMRectangle(elementDOMRectangle);
        const domObject = new DomObject(element, point2D);

        if (!this.mappedObjects[tagName]) {
            this.mappedObjects[tagName] = [];
        }

        this.mappedObjects[tagName].push(domObject);
    }

    set mappedObjects(mappedObjects) {
        this._mappedObjects = mappedObjects;
    }

    get mappedObjects() {
        return this._mappedObjects;
    }

    static _createPoint2DFromDOMRectangle(elementDOMRectangle) {
        const coordinates = new Point(
            elementDOMRectangle.x + PageConstants.GET_PAGE_WIDTH_OFFSET(),
            elementDOMRectangle.y + PageConstants.GET_PAGE_HEIGHT_OFFSET()
        );

        return new Point2D(
            coordinates.x,
            coordinates.y,
            coordinates.x + elementDOMRectangle.width,
            coordinates.y + elementDOMRectangle.height
        );
    }
}