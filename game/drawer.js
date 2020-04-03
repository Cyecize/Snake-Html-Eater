class Drawer {
    constructor(snake) {
        this._snake = snake;
    }

    draw(frameNumber) {
        const snakeTail = this._snake.coordinates;

        for (const bodyElement of snakeTail) {

            const coordinates = bodyElement.position.microPoints[frameNumber];
            const domElement = bodyElement.domElement;

            if(!coordinates) {
                console.log(frameNumber);
                return;
            }

            domElement.style.left = coordinates.x + Constants.DIMENSION_TYPE;
            domElement.style.top = coordinates.y + Constants.DIMENSION_TYPE;
        }
    }
}
