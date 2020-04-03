class Config {
    constructor(fps, tickMillis) {
        this.fps = fps;
        this.tickMillis = tickMillis;
    }
}

/**
 * This class is responsible for managing the application's loops.
 */
class LoopManager {

    /**
     * @param operationCallback - function that accepts 2 params - frameNumber, hasFullTick.
     * @param config - config containing specified FPS.
     */
    constructor(operationCallback, config) {
        this._operation = operationCallback;
        this._config = config;
    }

    run() {
        this._running = true;
        this._initLoop();
        this._loop();
    }

    pause() {
        this._running = false;
    }

    /**
     * Requests animation frames.
     * Since frames are more that the specified, a logic to limit them is applied.
     * If 60 FPS is set, the callback will be called 60 times at equal intervals.
     *
     * On every passed second, the hasFullTick variable will be true.
     */
    _loop() {
        window.requestAnimationFrame((time) => {
            if (!this._running) {
                return;
            }

            this._loop();

            const now = this._getNow();
            const elapsed = now - this._then;

            if (elapsed > this._fpsInterval) {
                this._then = now - (elapsed % this._fpsInterval);
                const hasFullTick = (now - this._lastTick) % this._config.tickMillis < this._fpsInterval;

                this._operation(this._frameCount, hasFullTick);

                if (hasFullTick) {
                    this._frameCount = 0;
                } if (this._frameCount < this._config.fps - 1) {
                    this._frameCount++;
                }
            }
        });
    }

    _initLoop() {
        this._fpsInterval = this._config.tickMillis / this._config.fps;
        this._then = this._getNow();
        this._lastTick = this._then;
        this._frameCount = 0;
    }

    _getNow() {
        return Date.now();
    }
}
