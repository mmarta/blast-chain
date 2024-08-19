class PlayerLaser extends DrawableObject {
    constructor() {
        super();
        this.animTime = 0;
        this.sY = 0;
        this.w = PlayerLaser.SPRITE_SIZE;
        this.h = PlayerLaser.SPRITE_SIZE;
    }

    init(x, y) {
        this.sX = 0;
        this.x = x;
        this.y = y;
        this.animTime = 0;
        this.active = true;
    }

    update() {
        if(!this.active) return;

        this.y -= 4;
        if(this.y < -this.h) {
            this.active = false;
            return;
        }

        switch(this.animTime) {
            case 0:
                this.sX = 0;
                break;
            case 6:
            case 30:
                this.sX = 8;
                break;
            case 12:
            case 24:
                this.sX = 16;
                break;
            case 18:
                this.sX = 24;
                break;
        }
        this.animTime++;
        if(this.animTime >= 36) this.animTime = 0;
    }

    render() {
        if(!this.active) return;

        Graphics.playAreaContext.drawImage(
            Graphics.spriteLaser, this.sX, this.sY, this.w, this.h,
            this.x, this.y, this.w, this.h
        );
    }
}

PlayerLaser.SPRITE_SIZE = 8;
