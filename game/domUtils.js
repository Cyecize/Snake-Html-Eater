class DomUtils {
    static _finalizeDOMSnakeBody(snakeBody) {
        snakeBody.style.width = Constants.SNAKE_SIZE + Constants.DIMENSION_TYPE;
        snakeBody.style.height = Constants.SNAKE_SIZE + Constants.DIMENSION_TYPE;

        return snakeBody;
    }

    static createDOMFood() {
        let DOMElement = document.createElement('div');

        DOMElement.classList.add('snake');
        document.body.appendChild(DOMElement);

        return this._finalizeDOMSnakeBody(DOMElement);
    }

    static createDOMHead() {
        let DOMElement = document.createElement('div');

        DOMElement.classList.add('snake-head');
        document.body.appendChild(DOMElement);

        return this._finalizeDOMSnakeBody(DOMElement);
    }

    static getPageWidth() {
        return document.documentElement.scrollWidth;
    }

    static getPageHeight() {
        return document.documentElement.scrollHeight
    }

    static getPageXOffset() {
        return window.pageXOffset;
    }

    static getPageYOffset() {
        return window.pageYOffset;
    }
}
