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

    static calculateUnits(snakeParticleSize, screenWidth, screenHeight, skipFloor = true) {
        let units = {
            width: screenWidth / snakeParticleSize,
            height: screenHeight / snakeParticleSize,
        };

        if (skipFloor) {
            return units;
        }

        units.width = Math.floor(units.width);
        units.height = Math.floor(units.height);

        return units;
    }

    static calculateUnitsForDOMElement(snakeParticleSize, boundingClientRect) {
        return this.calculateUnits(snakeParticleSize, boundingClientRect.width, boundingClientRect.height);
    }

    static calculateUnitsForCoordinates(snakeParticleSize, xAxis, yAxis) {
        let units = this.calculateUnits(snakeParticleSize, xAxis, yAxis);
        return new Point(units.width, units.height);
    }

    static isDOMElementVisible(elem) {
        return elem.offsetParent !== null;
    }
}