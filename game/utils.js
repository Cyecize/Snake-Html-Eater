class Utils {
    static _finalizeDOMSnakeBody(snakeBody) {
        snakeBody.style.width = GameConstants.SNAKE_PARTICLE_SIZE + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;
        snakeBody.style.height = GameConstants.SNAKE_PARTICLE_SIZE + PageConstants.ELEMENT_SIZE_DIMENSION_TYPE;

        return snakeBody;
    }

    static createDOMFood() {
        let DOMElement = document.createElement('div');

        DOMElement.classList.add('snake');
        DOMElement.classList.add(GameConstants.SMOOTH_SNAKE_CLASS_NAME);
        document.body.appendChild(DOMElement);

        return this._finalizeDOMSnakeBody(DOMElement);
    }

    static createDOMHead() {
        let DOMElement = document.createElement('div');

        DOMElement.classList.add('snake-head');
        document.body.appendChild(DOMElement);

        return this._finalizeDOMSnakeBody(DOMElement);
    }

    static createDOMScoreboard() {
        let DOMScoreboardContainer = document.createElement('div');

        DOMScoreboardContainer.classList.add('snake-html-scoreboard');
        document.body.appendChild(DOMScoreboardContainer);

        let header = document.createElement('h2');
        header.style.margin = '0';
        header.innerText = 'Scoreboard';
        DOMScoreboardContainer.appendChild(header);

        let levelNameElement = document.createElement('h3');
        levelNameElement.style.margin = '0';
        DOMScoreboardContainer.appendChild(levelNameElement);

        let levelDescription = document.createElement('p');
        levelNameElement.style.margin = '0';
        DOMScoreboardContainer.appendChild(levelDescription);

        let scoreToBeat = document.createElement('p');
        scoreToBeat.style.margin = '0';
        DOMScoreboardContainer.appendChild(scoreToBeat);

        let yourScore = document.createElement('p');
        yourScore.style.margin = '0';
        DOMScoreboardContainer.appendChild(yourScore);

        return {
            setLevelName: (number, name) => levelNameElement.innerText = `Level ${number}: ${name}`,
            setLevelDescription: (descr) => levelDescription.innerText = descr,
            setScoreToBeat: (score) => scoreToBeat.innerHTML = `Score to beat: <strong>${score}</strong>`,
            setYourScore: (score) => yourScore.innerHTML = `Your score: <strong>${score}</strong>`,
        }
    }

    static isDOMElementVisible(elem) {
        return elem.offsetParent !== null;
    }

    static isPointsSpaceMoreThanSnakeParticle(pointOne, pointTwo) {
        console.log(Math.abs(pointOne.x - pointTwo.x));
        return Math.abs(pointOne.x - pointTwo.x) > GameConstants.SNAKE_PARTICLE_SIZE
            || Math.abs(pointOne.y - pointTwo.y) > GameConstants.SNAKE_PARTICLE_SIZE;
    }
}