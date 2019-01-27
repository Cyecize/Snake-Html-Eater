const PageConstants = {
    PAGE_WIDTH: () => document.documentElement.scrollWidth,
    PAGE_HEIGHT: () => document.documentElement.scrollHeight,
    ELEMENT_SIZE_DIMENSION_TYPE: 'px',
};

const StyleConstants = {
    SNAKE_BODY_STYLE: function () {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.snake, .snake-head {background: linear-gradient( rgb(113,24,82), rgba(255, 165, 0, 0.9), rgb(9,16,104));' +
            ' border-radius: 5px;z-index: 100000;position: absolute;} .snake-head {background: black; border-radius: 10px}';
        document.getElementsByTagName('head')[0].appendChild(style);
        return style;
    }(),
};

const GameConstants = {
    SNAKE_PARTICLE_SIZE: 18,
    SNAKE_REFRESH_MILLIS: 50,
    UNMAPPED_HTML_TAGS: ['HTML', 'HEAD', 'LINK', 'SCRIPT', 'STYLE', 'BODY'],
};

const Directions = {
    LEFT: {
        oppositeDirection: 'right',
        name: 'left',
        keyMappings: ['a', 'ArrowLeft'],
    },
    UP: {
        oppositeDirection: 'down',
        name: 'up',
        keyMappings: ['w', 'ArrowUp'],
    },
    RIGHT: {
        oppositeDirection: 'left',
        name: 'right',
        keyMappings: ['d', 'ArrowRight'],
    },
    DOWN: {
        oppositeDirection: 'up',
        name: 'down',
        keyMappings: ['s', 'ArrowDown'],
    },
};