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
    constructor(point, microPoints) {
        this.point = point;
        this.microPoints = microPoints;
    }
}

class SnakeBodyPart {

    constructor(position, domElement) {
        this.position = position;
        this.domElement = domElement;
    }
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

    get head() {
        return this._head;
    }

    set headPosition(position) {
        let oldPos = this.head.position;
        this.head.position = position;

        //swap position of body parts to
        for (const bodyElement of this._body) {
            let temp = bodyElement.position;
            bodyElement.position = oldPos;
            oldPos = temp;
        }
    }
}

class SnakeManager {
    constructor(config) {
        this._config = config;
        this._init();
    }

    move() {
        const oldPoint = this._snake.head.position.point;
        const newPoint = this._getNextPoint();
        const microPoints = this._getMicroPoints(oldPoint);

        //TODO: detect self collision.
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

    _init() {
        this._snake = new Snake(this._createHead());
        this._direction = Direction.RIGHT;
        this._lastPerformedDirection = this._direction;
        this.addFood();
        this.addFood();
        this.addFood();
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
        const frames = this._config.fps;

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
        const numberOfPositions = this._config.fps;
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
}
