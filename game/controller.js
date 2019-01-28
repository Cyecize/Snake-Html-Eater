class Controller {
    constructor() {
        this._init();
        this._initEvents();
    }

    run() {
        this.isGameRunning = true;
        window.requestAnimationFrame(this._loopGame.bind(this));
    }

    _loopGame(time) {
        if (time - this.gameLogicDeltaTime >= GameConstants.SNAKE_REFRESH_MILLIS) {
            this.gameLogicDeltaTime = time;
            this.snake.move();
            this.levelManager.update();
            this.drawer.updateScore();

            window.dispatchEvent(new Event('resize'));
        }

        if (this.isGameRunning) {
            this.drawer.draw();
            window.requestAnimationFrame(this._loopGame.bind(this));
        }
    }

    _init() {
        this.snake = new Snake(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
        this.objectMapper = new ObjectMapper();
        this.levelManager = new LevelManager(this.objectMapper.mappedObjects, this.snake);
        this.drawer = new SnakeDrawer(this.snake, this.levelManager);
        this.gameLogicDeltaTime = 0;
    }

    _initEvents() {
        document.addEventListener('keydown', function (eventArgs) {
            let keyName = eventArgs.key;

            if (keyName === 'p') {
                debugger;
            }

            if (keyName === 'f') {
                this.snake.addFood();
            }

            if (keyName === 'm') {
                this.snake.move();
            }

            if (keyName === 'i') {
                console.log(this.snake.snakeHeadPos);
            }

            let directionKey = Object.keys(Directions).filter((direction) => Directions[direction].keyMappings.indexOf(keyName) !== -1).pop();
            if (directionKey) {
                this.snake.changeDirection(Directions[directionKey]);
            }
        }.bind(this));

        window.addEventListener('resize', function () {
            this.snake.setNewPageSize(PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
            this.objectMapper.update();
        }.bind(this));
    }
}

let controller = new Controller();
controller.run();