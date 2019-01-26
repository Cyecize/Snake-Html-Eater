class Utils {
    static _finalizeDOMSnakeBody(snakeBody) {
        snakeBody.style.width = GameConstants.SNAKE_PARTICLE_SIZE + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
        snakeBody.style.height = GameConstants.SNAKE_PARTICLE_SIZE + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;

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

    static calculateUnitsForPage(snakeParticleSize, screenWidth, screenHeight) {
        return {
            width: Math.floor(screenWidth / snakeParticleSize),
            height: Math.floor(screenHeight / snakeParticleSize),
        };
    }
}