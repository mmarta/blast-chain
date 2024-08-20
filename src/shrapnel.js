class Shrapnel extends DrawableObject {
    constructor() {
        super();
        this.sY = 0;
        this.w = 8;
        this.h = 8;
        this.speedX = 0;
        this.speedY = 0;
    }

    init(x, y, dir) {
        this.x = x;
        this.y = y;

        switch(dir) {
            case Shrapnel.UP:
                this.sX = 24;
                this.speedX = 0;
                this.speedY = -4;
                break;
            case Shrapnel.DOWN:
                this.sX = 24;
                this.speedX = 0;
                this.speedY = 4;
                break;
            case Shrapnel.LEFT:
                this.sX = 16;
                this.speedX = -4;
                this.speedY = 0;
                break;
            case Shrapnel.RIGHT:
                this.sX = 16;
                this.speedX = 4;
                this.speedY = 0;
                break;
            case Shrapnel.UP_LEFT:
                this.sX = 8;
                this.speedX = -3;
                this.speedY = -3;
                break;
            case Shrapnel.DOWN_RIGHT:
                this.sX = 8;
                this.speedX = 3;
                this.speedY = 3;
                break;
            case Shrapnel.UP_RIGHT:
                this.sX = 0;
                this.speedX = 3;
                this.speedY = -3;
                break;
            default:
                this.sX = 0;
                this.speedX = -3;
                this.speedY = 3;
        }
        this.dir = dir;
        this.active = true;
    }

    update() {
        if(!this.active) return;

        this.x += this.speedX;
        this.y += this.speedY;

        if(
            this.x < -this.w || this.x >= Graphics.playArea.width
            || this.y < -this.h || this.y >= Graphics.playArea.height
        ) this.active = false;
    }

    render() {
        if(!this.active) return;

        Graphics.playAreaContext.drawImage(
            Graphics.spriteShrapnel, this.sX, this.sY, this.w, this.h,
            this.x, this.y, this.w, this.h
        );
    }
}

Shrapnel.UP = 0;
Shrapnel.UP_RIGHT = 1;
Shrapnel.RIGHT = 2;
Shrapnel.DOWN_RIGHT = 3;
Shrapnel.DOWN = 4;
Shrapnel.DOWN_LEFT = 5;
Shrapnel.LEFT = 6;
Shrapnel.UP_LEFT = 7;

Shrapnel.pool = new Array(20);

Shrapnel.poolInit = function() {
    let i = Shrapnel.pool.length;
    while(i--) Shrapnel.pool[i] = new Shrapnel();
}
