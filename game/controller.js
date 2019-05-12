class Controller {
    constructor() {
        this._init();
        this._initEvents();
    }

    run() {
        this.gameLoop = setInterval(this._loopGame.bind(this), GameConstants.SNAKE_REFRESH_MILLIS);
    }

    _loopGame() {
        window.requestAnimationFrame(() => {
            this.snake.move();
            this.drawer.draw();
        });
    }

    _init() {
        this.snake = new Snake(GameConstants.SNAKE_PARTICLE_SIZE, PageConstants.GET_PAGE_WIDTH(), PageConstants.GET_PAGE_HEIGHT());
        this.objectMapper = new ObjectMapper();
        this.drawer = new SnakeDrawer(this.snake, null); //TODO: put back level manager.
    }

    _initEvents() {
        document.addEventListener('keydown', (eventArgs) => {
            let keyName = eventArgs.key;

            const keyMapping = {
                p: () => {
                    debugger;
                },
                f: this.snake.addFood,
                m: this.snake.move,
                i: () => console.log(this.snake.snakeHeadPos),
            };

            if (keyMapping[keyName]) {
                keyMapping[keyName].call(this.snake);
            }

            Object.keys(Directions).forEach(direction => {
                if (Directions[direction].keyMappings.indexOf(keyName) !== -1) {
                    this.snake.changeDirection(Directions[direction]);
                }
            });
        });

        window.addEventListener('resize', () => {
            this.snake.setNewPageSize(PageConstants.GET_PAGE_WIDTH(), PageConstants.GET_PAGE_HEIGHT());
            this.objectMapper.update();
        });
    }
}

let controller = new Controller();
controller.run();