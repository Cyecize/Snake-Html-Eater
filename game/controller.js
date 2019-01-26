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
        this.units = Utils.calculateUnitsForPage(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
        this.snake = new Snake(GameConstants.SNAKE_PARTICLE_SIZE, this.units.width, this.units.height);
        this.drawer = new SnakeDrawer(this.snake);
    }

    _initEvents() {
        document.onkeydown = function (eventArgs) {
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
        }.bind(this);

        window.onresize = function () {
            let newUnits = Utils.calculateUnitsForPage(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.PAGE_WIDTH(), PageConstants.PAGE_HEIGHT());
            this.snake.setNewUnitValues(newUnits.width, newUnits.height);
        }.bind(this);
    }

}

new Controller().run();