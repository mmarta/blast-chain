class Alien extends DrawableObject {
    constructor() {
        super();
        this.color = null;
        this.moveTime = null;
        this.zapTime = 0;
        this.animTime = 0;
        this.score = 0;
        this.displayScore = null;
        this.displayCombo = false;
        this.w = Alien.SPRITE_SIZE;
        this.h = Alien.SPRITE_SIZE;
    }

    init() {
        this.x = (Math.random() * 208) >> 0;
        this.y = -16;
        this.sX = 0;
        this.color = (Math.random() * 4) >> 0;
        this.score = 100 + (this.color * 100);
        this.sY = this.color * Alien.SPRITE_SIZE;
        this.zapTime = 0;
        this.animTime = 0;
        this.displayCombo = false;
        this.displayScore = null;
        this.active = true;
    }

    update() {
        if(!this.active) return;

        if(this.zapTime) {
            switch(this.zapTime) {
                case 1:
                    this.sY = 64;
                    this.sX = 0;
                    break;
                case 5:
                    this.sX = 16;
                    break;
                case 9:
                    this.sX = 32;
                    break;
                case 13:
                    this.sX = 48;
                    break;
                case 17:
                    if(!this.displayCombo) {
                        this.active = false;
                        return;
                    }
                    break;
                case 31:
                    this.active = false;
                    return;
            }

            this.zapTime++;
            return;
        }

        this.y += 2;
        if(this.y >= Graphics.playArea.height) {
            this.active = false;
            return;
        }

        switch(this.animTime) {
            case 0:
                this.sX = 0;
                break;
            case 10:
                this.sX = 16;
                break;
            case 20:
                this.sX = 32;
                break;
            case 30:
                this.sX = 48;
                break;
        }

        this.animTime++;
        if(this.animTime >= 40) this.animTime = 0;
    }

    render() {
        if(!this.active) return;

        if(this.zapTime >= 17 && this.displayCombo) {
            Graphics.printString(
                Graphics.playAreaContext, this.displayScore, this.x + 8 - (4 * this.displayScore.length), this.y + 4, 6
            );
            return;
        }

        Graphics.playAreaContext.drawImage(
            Graphics.spriteAlien, this.sX, this.sY, this.w, this.h,
            this.x, this.y, this.w, this.h
        );
    }

    zap(displayCombo) {
        let i = Shrapnel.pool.length, shrapnelCount = 0;
        switch(this.color) {
            case 1:
                shrapnelCount = 2;
                while(i--) {
                    if(!Shrapnel.pool[i].active) {
                        switch(shrapnelCount) {
                            case 2:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.LEFT);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.RIGHT);
                                break;
                        }
                        shrapnelCount--;
                        if(!shrapnelCount) break;
                    }
                }
                break;
            case 2:
                shrapnelCount = 4;
                while(i--) {
                    if(!Shrapnel.pool[i].active) {
                        switch(shrapnelCount) {
                            case 4:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_LEFT);
                                break;
                            case 3:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_RIGHT);
                                break;
                            case 2:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_LEFT);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_RIGHT);
                                break;
                        }
                        shrapnelCount--;
                        if(!shrapnelCount) break;
                    }
                }
                break;
            case 3:
                shrapnelCount = 6;
                while(i--) {
                    if(!Shrapnel.pool[i].active) {
                        switch(shrapnelCount) {
                            case 6:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN);
                                break;
                            case 5:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_LEFT);
                                break;
                            case 4:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_RIGHT);
                                break;
                            case 3:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP);
                                break;
                            case 2:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_LEFT);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_RIGHT);
                                break;
                        }
                        shrapnelCount--;
                        if(!shrapnelCount) break;
                    }
                }
                break;
        }

        this.zapTime = 1;
        this.displayCombo = displayCombo;
        this.displayScore = `${this.score * player.comboMultiplier}`;
    }

    isCollidable() {
        return this.active && !this.zapTime;
    }
}

Alien.SPRITE_SIZE = 16;
Alien.pool = new Array(20);
Alien.poolInit = function() {
    let i = Alien.pool.length;
    while(i--) Alien.pool[i] = new Alien();
}
