
const snakeManager = new SnakeManager();
const drawer = new Drawer(snakeManager);

const loopManager = new LoopManager(
    (framePercentage, framesPerTick) => {
        drawer.draw(framePercentage, framesPerTick);

        if (framePercentage === 100) {
            console.log(framesPerTick);
            snakeManager.move();
        }
    }
);

loopManager.run();


document.addEventListener('keydown', (eventArgs) => {
    let keyName = eventArgs.key;

    const keyMapping = {
        p: () => {
            loopManager.pause();
           // debugger;
        },
        r: () => loopManager.run(),
        f: snakeManager.addFood,
        m: () => {
			snakeManager.move();
			drawer.draw(100, 60, true);
		},
        i: () => console.log(snakeManager._snake.head),
    };

    if (keyMapping[keyName]) {
        keyMapping[keyName].call(snakeManager);
    }

    Object.keys(Direction).forEach(direction => {
        if (Direction[direction].keyMappings.indexOf(keyName) !== -1) {
            snakeManager.changeDirection(Direction[direction]);
        }
    });
});
