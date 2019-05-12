class SnakeDrawer {
    constructor(snake, levelManager) {
        this.snake = snake;
        this.levelManager = levelManager;
        this.scoreboardDOM = Utils.createDOMScoreboard();
        this.previousSnakeHeadPos = this.snake.snakeBody[0];
    }

    draw() {
        const snakeTail = this.snake.snakeBody;

        for (const snakeTailElement of snakeTail) {
            const coordinates = snakeTailElement.coordinates;

            snakeTailElement.DOMElement.style.left = coordinates.x + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
            snakeTailElement.DOMElement.style.top = coordinates.y + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
        }

        let behaviour = "smooth";
        if (Utils.isPointsSpaceMoreThanSnakeParticle(this.previousSnakeHeadPos, snakeTail[0].coordinates)) {
            behaviour = "instant";
        }

        snakeTail[0].DOMElement.scrollIntoView({block: "center", behavior: behaviour});

        this.previousSnakeHeadPos = snakeTail[0].coordinates;
    }

    updateScore() {
        let level = this.levelManager.level;

        this.scoreboardDOM.setLevelName(level.id, level.name);
        this.scoreboardDOM.setLevelDescription(level.description);
        this.scoreboardDOM.setScoreToBeat(level.pointsToAdvance);
        this.scoreboardDOM.setYourScore(this.levelManager.points);
    }
}