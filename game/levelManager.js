const Levels = {
    1: {
        id: 1,
        name: 'Crook',
        description: 'Eat text to advance!',
        foodType: [],
        pointsToAdvance: 20,
    },
    2: {
        id: 2,
        name: 'Hustler',
        description: 'Eat span, i, small, strong tags to proceed',
        foodType: [
            {tag: 'SPAN', points: 3},
            {tag: 'I', points: 2},
            {tag: 'SMALL', points: 2},
            {tag: 'STRONG', points: 2},
        ],
        pointsToAdvance: 100,
    },
    3: {
        id: 3,
        name: 'Boss',
        description: 'Eat anchors, field, buttons, headings to proceed',
        foodType: [
            {tag: 'A', points: 5},
            {tag: 'P', points: 5},
            {tag: 'BUTTON', points: 5},
            {tag: 'H1', points: 4},
            {tag: 'H2', points: 4},
            {tag: 'INPUT', points: 6},
            {tag: 'PRE', points: 10},
            {tag: 'SELECT', points: 4},
            {tag: 'TD', points: 4},
            {tag: 'TH', points: 4},
            {tag: 'TR', points: 4},
        ],
        pointsToAdvance: 200,
    },
    4: {
        id: 4,
        name: "That's how Mafia works!",
        description: 'You have reached the final level. You can eat big chunks of HTML. Bon appétit!',
        foodType: [
            {tag: 'ASIDE', points: 50},
            {tag: 'DIV', points: 150},
            {tag: 'FOOTER', points: 250},
            {tag: 'FORM', points: 100},
            {tag: 'IFRAME', points: 300},
            {tag: 'IMG', points: 500},
            {tag: 'NAV', points: 150},
            {tag: 'TABLE', points: 100},
            {tag: 'TBODY', points: 50},
            {tag: 'THREAD', points: 50},
            {tag: 'TITLE', points: 50},
        ],
        pointsToAdvance: Number.MAX_SAFE_INTEGER,
    },
};

class LevelManager {
    constructor(mappedObjects, snake) {
        this.mappedObjects = mappedObjects;
        this.snake = snake;
        this._init();
        this._levelUp();
        this._levelUp();
    }

    update() {

        //check for collisions with elements from the current or previous levels
        let collisions = CollisionUtils.getCollidingDOMObjects(this.watchedTagsArray, this.snake.snakeHeadPos);

        for (let collision of collisions) {
            if (!collision.DOMObject.isHidden) {
                collision.DOMObject.hide();
                this.snake.addFood();
                this.currentPoints += this.tagPointsMap[collision.tag];

                if (this.currentPoints >= this.level.pointsToAdvance) {
                    this._levelUp();
                }
            }
        }

        //check for text collisions

    }

    _levelUp() {
        this.currentLevel = Levels[this.levels.pop()];

        let foodTypes = this.currentLevel.foodType;
        for (let foodType of foodTypes) {
            //set score in tagPoints map
            this.tagPointsMap[foodType.tag] = foodType.points;

            //if a tag is present in the DOM, move it from unwatched to watched array
            if (this.unwatchedTagsMap[foodType.tag]) {
                this.watchedTagsArray = this.watchedTagsArray.concat(this.unwatchedTagsMap[foodType.tag]);
                delete this.unwatchedTagsMap[foodType.tag];
            }
        }
    }

    _init() {
        this.currentPoints = 0;
        this.tagPointsMap = {};

        this.levels = Object.keys(Levels).reverse();

        this.unwatchedTagsMap = [];
        for (let tagName in this.mappedObjects) {
            this.unwatchedTagsMap[tagName] = this.mappedObjects[tagName];
        }

        this.watchedTagsArray = [];
    }

    get points() {
        return this.currentPoints;
    }

    get level() {
        return this.currentLevel;
    }
}