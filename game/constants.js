const Constants = {
    SNAKE_SIZE: 17,
    DIMENSION_TYPE: 'px',
};

const StyleConstants = {
    SNAKE_BODY_STYLE: function () {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.snake, .snake-head {' +
            'background: linear-gradient( rgb(113,24,82), rgba(255, 165, 0, 0.9), rgb(9,16,104));' +
            ' border-radius: 5px;z-index: 100000;position: absolute;' +
            '} .snake-head {' +
            'background: radial-gradient(black, white); border-radius: 15px' +
            '}' +
            '.snake-transition {\n' +
            '    transition: left 50ms linear, top 50ms linear;\n' +
            '}' +
            '.snake-html-scoreboard {' +
            'position: fixed;top: 50px;right: 50px;padding: 10px;box-sizing: border-box;' +
            ' box-shadow:  1px 1px 2px black;border-radius: 5px;background: rgba(255, 255, 255, 0.9);z-index: 99999999; max-width: 400px;' +
            '}';
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }(),
};
