/**
 * This class is responsible for managing the application's loops.
 */
class LoopManager {

    /**
     * @param operationCallback - function that accepts 2 params - fullFramePercentage, frames per tick (fpt).
     */
    constructor(operationCallback) {
        this._operation = operationCallback;
    }

    run() {
        this._running = true;
        this._initLoop();
        this._loop();
    }

    pause() {
        this._running = false;
    }

    _loop() {
        window.requestAnimationFrame((time) => {
            if (!this._running) {
                return;
            }

            this._loop();
            this._currentTickFrameCount++;

            const now = this._getNow();
            const elapsed = now - this._previousSecond;

            if (elapsed >= Constants.FULL_TICK_MILLIS) {
                this._operation(100, this._currentTickFrameCount);
                this._previousTickFrameCount = this._currentTickFrameCount;
                this._currentTickFrameCount = 0;
                this._previousSecond = now;
            } else {
                this._operation(Math.round(elapsed / Constants.FULL_TICK_MILLIS * 100), this._previousTickFrameCount);
            }
        });
    }

    _initLoop() {
        this._previousSecond = this._getNow();
        this._currentTickFrameCount = 0;
        this._previousTickFrameCount = 0;
    }

    _getNow() {
        return Date.now();
    }
}
