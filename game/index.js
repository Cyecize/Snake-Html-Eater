const FPS = 12;
const TICK_RATE = 150;

const config = new Config(FPS, TICK_RATE);
const snakeManager = new SnakeManager(config);
const drawer = new Drawer(snakeManager._snake);

const loopManager = new LoopManager(
    (frameNumber, hasFullTick) => {
        drawer.draw(frameNumber);

        if (hasFullTick) {
            snakeManager.move();
        }
    },
    config
);

loopManager.run();

let snake = snakeManager;
document.addEventListener('keydown', (eventArgs) => {
    let keyName = eventArgs.key;

    const keyMapping = {
        p: () => {
            debugger;
        },
        f: snake.addFood,
        m: snake.move,
        i: () => console.log(snake.snakeHeadPos),
    };

    if (keyMapping[keyName]) {
        keyMapping[keyName].call(snake);
    }

    Object.keys(Direction).forEach(direction => {
        if (Direction[direction].keyMappings.indexOf(keyName) !== -1) {
            snake.changeDirection(Direction[direction]);
        }
    });
});
