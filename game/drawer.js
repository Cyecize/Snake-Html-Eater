class SnakeDrawer {
    constructor(snake, levelManager) {
        this.snake = snake;
        this.levelManager = levelManager;
        this.scoreboardDOM = Utils.createDOMScoreboard();
    }

    draw() {
        let snakeTail = this.snake.snakeBody.reverse();

        for (let snakeTailElement of snakeTail) {
            let coordinates = snakeTailElement.coordinates;

            snakeTailElement.DOMElement.style.left = coordinates.x + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
            snakeTailElement.DOMElement.style.top = coordinates.y + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
        }

        snakeTail[0].DOMElement.scrollIntoView({block: "center"});
    }

    updateScore() {
        let level = this.levelManager.level;

        this.scoreboardDOM.setLevelName(level.id, level.name);
        this.scoreboardDOM.setLevelDescription(level.description);
        this.scoreboardDOM.setScoreToBeat(level.pointsToAdvance);
        this.scoreboardDOM.setYourScore(this.levelManager.points);
    }
}