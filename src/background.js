class BackgroundStar {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.doubleSpeed = false;
        this.color = Graphics.createRandomColor();
    }

    refresh() {
        this.x = Math.random() * Graphics.playArea.width;
        this.y = Math.random() * Graphics.playArea.height;
        this.doubleSpeed = Math.random() >= 0.5;
        this.color = Graphics.createRandomColor();
    }

    moveToNext() {
        this.x = Math.random() * Graphics.playArea.width;
        this.y = 0;
        this.doubleSpeed = Math.random() >= 0.5;
        this.color = Graphics.createRandomColor();
    }

    update() {
        this.y = this.y + (this.doubleSpeed ? 2 : 1);
        if(this.y >= Graphics.playArea.height) this.moveToNext();
    }

    render() {
        Graphics.playAreaContext.fillStyle = this.color;
        Graphics.playAreaContext.fillRect(this.x, this.y, 1, 1);
    }
}

const Background = {
    stars: null,
    STAR_COUNT: 128,
    init() {
        this.stars = new Array(this.STAR_COUNT);
        for(let i = 0; i < this.stars.length; i++)
            this.stars[i] = new BackgroundStar();
    },
    refresh() {
        for(let i = 0; i < this.stars.length; i++)
            this.stars[i].refresh();
    },
    update() {
        for(let i = 0; i < this.stars.length; i++)
            this.stars[i].update();
    },
    render() {
        for(let i = 0; i < this.stars.length; i++)
            this.stars[i].render();
    }
};
