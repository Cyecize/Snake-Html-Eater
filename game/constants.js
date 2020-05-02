const Constants = {
    FULL_TICK_MILLIS: 90,
    SNAKE_SIZE: 14,
    DIMENSION_TYPE: 'px',
    MICRO_POSITIONS_PER_SECOND: 60,
    INITIAL_SNAKE_BODY_SIZE: 5,
    CHECK_FOR_SELF_COLLISION: true,
};

const StyleConstants = {
    SNAKE_BODY_STYLE: function () {
        const SNAKE_BODY_BACKGROUNDS = [
            'linear-gradient(rgba(238, 130, 238, 0.7), rgba(0, 0, 0, 0.8));',
            'linear-gradient(rgba(113, 24, 82, 1), rgba(255, 165, 0, 0.9), rgba(9, 16, 104, 1));',
        ];

        let style = document.createElement('style');
        style.setAttribute("type", "text/css");
        style.innerHTML = '.snake, .snake-head {' +
            'background: ' + SNAKE_BODY_BACKGROUNDS[Math.floor(Math.random() * SNAKE_BODY_BACKGROUNDS.length)] +
            ' border-radius: 6px;z-index: 100000;position: absolute;' +
            '} .snake-head {' +
            'background: radial-gradient(rgba(255, 0, 0, 1), rgba(0, 0, 0, 1)); border-radius: 50%' +
            '}' +
            '.snake-html-scoreboard {' +
            'position: fixed;top: 50px;right: 50px;padding: 10px;box-sizing: border-box;' +
            ' box-shadow:  1px 1px 2px black;border-radius: 5px;background: rgba(255, 255, 255, 0.9);z-index: 99999999; max-width: 400px;' +
            '}';
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }(),
};
