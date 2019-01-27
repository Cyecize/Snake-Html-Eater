class Controller {
    constructor(props) {
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
            this.drawer.printSnakeBody();
            window.requestAnimationFrame(this._loopGame.bind(this));
        }
    }

    _init() {
        this.units = Utils.calculateUnits(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
        this.snake = new Snake(GameConstants.SNAKE_PARTICLE_SIZE, this.units.width, this.units.height);
        this.objectMapper = new ObjectMapper(this.units);
        this.drawer = new SnakeDrawer(this.snake);
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

            let directionKey = Object.keys(Directions).filter((direction) => Directions[direction].keyMappings.indexOf(keyName) !== -1).pop();
            if (directionKey) {
                this.snake.changeDirection(Directions[directionKey]);
            }
        }.bind(this));

        window.addEventListener('resize', function () {
            this.units = Utils.calculateUnits(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
            this.snake.setNewUnitValues(this.units.width, this.units.height);
        }.bind(this));
    }
}

new Controller().run();