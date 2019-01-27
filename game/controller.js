class Controller {
    constructor() {
        this._init();
        this._initEvents();
    }

    run() {
        this.isGameRunning = true;
        this.snakeRunInterval = setInterval(function () {
            this.snake.move();
        }.bind(this), GameConstants.SNAKE_REFRESH_MILLIS);

        this._loopGame();
    }

    _loopGame() {
        if (this.isGameRunning) {
            this.levelManager.update();
            this.drawer.draw();
            window.requestAnimationFrame(this._loopGame.bind(this));
        }
    }

    _init() {
        this.units = Utils.calculateUnits(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT(), false);
        this.snake = new Snake(GameConstants.SNAKE_PARTICLE_SIZE, this.units.width, this.units.height);
        this.objectMapper = new ObjectMapper();
        this.levelManager = new LevelManager(this.objectMapper.mappedObjects, this.snake);
        this.drawer = new SnakeDrawer(this.snake, this.levelManager);
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
            this.units = Utils.calculateUnits(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
            this.snake.setNewUnitValues(this.units.width, this.units.height);

            this.objectMapper.update();
        }.bind(this));
    }
}

let controller = new Controller();
controller.run();