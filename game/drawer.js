class Drawer {
    constructor(snakeManager) {
        this._snakeManager = snakeManager;
        this._previousPercentage = -1;
    }

    draw(framePercentage, fps) {
        if (this._previousPercentage === framePercentage) {
            return;
        }

        this._previousPercentage = framePercentage;

        const snakeTail = this._snakeManager.snakeCoordinates;
        const numberOfMicroPosition = this._snakeManager.getNumberOfMicroPosition(framePercentage);

        for (const bodyElement of snakeTail) {

            const coordinates = bodyElement.position.getMicroPosition(numberOfMicroPosition);
            const domElement = bodyElement.domElement;

            if (!coordinates) {
                console.log(numberOfMicroPosition);
            }

            if (domElement.style.left !== coordinates.x) {
                domElement.style.left = coordinates.x + Constants.DIMENSION_TYPE;
            }

            if (domElement.style.top !== coordinates.y) {
                domElement.style.top = coordinates.y + Constants.DIMENSION_TYPE;
            }
        }
    }
}
