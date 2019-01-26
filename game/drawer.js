class SnakeDrawer {
    constructor(snake) {
        this.snake = snake;
    }

    printSnakeBody() {
        let snakeTail = this.snake.snakeBody.reverse();

        for (let snakeTailElement of snakeTail) {
            let coordinates = snakeTailElement.coordinates;

            snakeTailElement.DOMElement.style.left = (GameConstants.SNAKE_PARTICLE_SIZE * coordinates.x) + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
            snakeTailElement.DOMElement.style.top = (GameConstants.SNAKE_PARTICLE_SIZE * coordinates.y) + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
        }
    }
}