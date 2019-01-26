class Snake {
    constructor(snakeBodySize, maxWidthUnits, maxHeightUnits) {
        this.setNewUnitValues(maxWidthUnits, maxHeightUnits);
        this.snakeBodySize = snakeBodySize;
        this._initSnake();
    }

    move() {
        let newHeadPos = new Point(this.snakeHeadPos.x, this.snakeHeadPos.y);

        switch (this.direction) {
            case Directions.UP:
                newHeadPos.y = this.snakeHeadPos.y - 1;
                if (newHeadPos.y < 0) newHeadPos.y = this.maxUnitsHeight - 1;
                break;
            case Directions.DOWN:
                newHeadPos.y = this.snakeHeadPos.y + 1;
                if (newHeadPos.y > this.maxUnitsHeight) newHeadPos.y = 0;
                break;
            case Directions.LEFT:
                newHeadPos.x = this.snakeHeadPos.x - 1;
                if (newHeadPos.x < 0) newHeadPos.x = this.maxUnitsWidth - 1;
                break;
            case Directions.RIGHT:
                newHeadPos.x = this.snakeHeadPos.x + 1;
                if (newHeadPos.x >= this.maxUnitsWidth) newHeadPos.x = 0;
                break;
        }

        //TODO check here for collisions with the newHeadPos.
        //TODO synchronize direction change if required with this.reservedDirectionMove.

        //Checks for body collision.
        if (this._collidesWithSelf(newHeadPos)) {
            alert('Snake ate herself!');
        }

        //Adjusts food positions.
        let furthestFoodFromHead = this.foodStack.shift();
        furthestFoodFromHead.coordinates = this.snakeHeadPos;
        this.foodStack.push(furthestFoodFromHead);

        //Updates the new Snake head position.
        this.snakeHeadPos = newHeadPos;

        this.lastPerformedDirection = this.direction;
    }

    addFood() {
        this.foodStack.unshift({
            coordinates: new Point(-1, -1),
            DOMElement: Utils.createDOMFood()
        });
    }

    changeDirection(direction) {
        if (this.direction.oppositeDirection === direction.name || this.direction === direction ||
            (this.lastPerformedDirection && this.lastPerformedDirection.oppositeDirection === direction.name)) {
            return;
        }

        this.direction = direction;
        //this.move(); //TODO synchronize
    }

    setNewUnitValues(width, height) {
        this.maxUnitsWidth = width;
        this.maxUnitsHeight = height;
    }

    get snakeBody() {
        return this.foodStack.concat([{
            coordinates: this.snakeHeadPos,
            DOMElement: this.snakeHeadDOMElement,
        }]);
    }

    _initSnake() {
        this.foodStack = [];
        this.direction = Directions.RIGHT;

        //Set snake head position.
        this.snakeHeadPos = new Point(1, 1);
        this.snakeHeadDOMElement = Utils.createDOMHead();

        //Add initial food tail.
        this.addFood();
        this.addFood();
        this.addFood();
    }

    _collidesWithSelf(newSnakePos) {
        for (let foodStackElement of this.foodStack) {
            if (newSnakePos.x === foodStackElement.coordinates.x && newSnakePos.y === foodStackElement.coordinates.y) {
                return true;
            }
        }

        return false;
    }
}