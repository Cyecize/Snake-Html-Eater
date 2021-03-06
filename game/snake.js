const Direction = {
    LEFT: {
        oppositeDirection: 'RIGHT',
        keyMappings: ['a', 'ArrowLeft'],
    },
    UP: {
        oppositeDirection: 'DOWN',
        keyMappings: ['w', 'ArrowUp'],
    },
    RIGHT: {
        oppositeDirection: 'LEFT',
        keyMappings: ['d', 'ArrowRight'],
    },
    DOWN: {
        oppositeDirection: 'UP',
        keyMappings: ['s', 'ArrowDown'],
    },
};

class Position {
    constructor(point, microPositions) {
        this.point = point;
        this.microPositions = microPositions;
    }

    getMicroPosition(numberOfMicroPosition) {
        return this.microPositions[numberOfMicroPosition];
    }

    collidesWith(point) {
        return this.point.equals(point);
    }
}

class SnakeBodyPart {

    constructor(position, domElement) {
        this.position = position;
        this.domElement = domElement;
    }
}

class SnakeAteHerselfException extends Error {

}

class Snake {

    constructor(head) {
        this._head = head;
        this._body = [];
    }

    addBodyPart(snakeBodyPart) {
        this._body.push(snakeBodyPart);
    }

    get coordinates() {
        return [this.head].concat(this._body);
    }

    get bodyCoordinates() {
        return this._body;
    }

    get head() {
        return this._head;
    }

    set headPosition(position) {
        let oldPos = this.head.position;
        this.head.position = position;

        //swap position of body parts to
        for (let i = 0; i < this._body.length; i++) {
            let bodyElement = this._body[i];
            let temp = bodyElement.position;
            bodyElement.position = oldPos;
            oldPos = temp;
        }
    }
}

class SnakeManager {
    constructor() {
        this._init();
    }

    move() {
        const oldPoint = this._snake.head.position.point;
        const newPoint = this._getNextPoint();
        const microPoints = this._getMicroPoints(oldPoint);

        if (Constants.CHECK_FOR_SELF_COLLISION) {
            this._checkSelfCollision(newPoint);
        }

        this._snake.headPosition = new Position(newPoint, microPoints);
        this._lastPerformedDirection = this._direction;
    }

    changeDirection(direction) {
        const opposite = Direction[direction.oppositeDirection];

        if (opposite === this._direction ||
            this._direction === direction ||
            opposite === this._lastPerformedDirection) {
            return;
        }

        this._direction = direction;
    }

    addFood() {
        this._snake.addBodyPart(this._createBodyPart());
    }

    getNumberOfMicroPosition(framePercentage) {
        return Math.max(0, Math.floor(framePercentage / 100 * Constants.MICRO_POSITIONS_PER_SECOND) - 1);
    }

    get snakeCoordinates() {
        return this._snake.coordinates;
    }

    _init() {
        this._snake = new Snake(this._createHead());
        this._direction = Direction.RIGHT;
        this._lastPerformedDirection = this._direction;
        for (let i = 0; i < Constants.INITIAL_SNAKE_BODY_SIZE; i++) {
            this.addFood();
        }
    }

    _createHead() {
        const position = this._createPosition(10, 10);
        const domElement = DomUtils.createDOMHead();

        return new SnakeBodyPart(position, domElement);
    }

    _createBodyPart() {
        const position = this._createPosition();
        const domElement = DomUtils.createDOMFood();

        return new SnakeBodyPart(position, domElement);
    }

    _createPosition(x, y) {
        const frames = Constants.MICRO_POSITIONS_PER_SECOND;

        const point = new Point(x ?? -100, y ?? 0);
        const microPositions = [];

        for (let i = 0; i < frames; i++) {
            microPositions.push(point);
        }

        return new Position(point, microPositions);
    }

    _getNextPoint() {
        const snakeHeadPos = this._snake.head.position.point;
        const pageHeight = DomUtils.getPageHeight();
        const pageWidth = DomUtils.getPageWidth();

        let newHeadPos = new Point(snakeHeadPos.x, snakeHeadPos.y);

        switch (this._direction) {
            case Direction.UP:
                newHeadPos.y = snakeHeadPos.y - Constants.SNAKE_SIZE;
                if (newHeadPos.y < 0) newHeadPos.y = pageHeight - Constants.SNAKE_SIZE;
                break;
            case Direction.DOWN:
                newHeadPos.y = snakeHeadPos.y + Constants.SNAKE_SIZE;
                if (newHeadPos.y > pageHeight - Constants.SNAKE_SIZE - 10) newHeadPos.y = 0;
                break;
            case Direction.LEFT:
                newHeadPos.x = snakeHeadPos.x - Constants.SNAKE_SIZE;
                if (newHeadPos.x < 0) newHeadPos.x = pageWidth - Constants.SNAKE_SIZE;
                break;
            case Direction.RIGHT:
                newHeadPos.x = snakeHeadPos.x + Constants.SNAKE_SIZE;
                if (newHeadPos.x >= pageWidth - Constants.SNAKE_SIZE - 10) newHeadPos.x = 0;
                break;
        }

        return newHeadPos;
    }

    _getMicroPoints(oldPoint) {
        const numberOfPositions = Constants.MICRO_POSITIONS_PER_SECOND;
        const interval = Constants.SNAKE_SIZE / numberOfPositions;

        let appendX = 0;
        let appendY = 0;

        switch (this._direction) {
            case Direction.UP:
                appendY -= interval;
                break;
            case Direction.DOWN:
                appendY += interval;
                break;
            case Direction.LEFT:
                appendX -= interval;
                break;
            case Direction.RIGHT:
                appendX += interval;
                break;
        }

        let currentX = oldPoint.x;
        let currentY = oldPoint.y;

        let microPositions = [];

        for (let i = 0; i < numberOfPositions; i++) {
            currentX += appendX;
            currentY += appendY;

            microPositions.push(
                new Point(currentX, currentY)
            );
        }

        return microPositions;
    }

    _checkSelfCollision(newPoint) {
        const body = this._snake.bodyCoordinates;

        for (let i = 0; i < body.length; i++) {
            const bodyPart = body[i];
            if (bodyPart.position.collidesWith(newPoint)) {
                throw new SnakeAteHerselfException();
            }
        }
    }
}
