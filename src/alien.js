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
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 0;
        this.speedTimeout = 0;
        this.w = Alien.SPRITE_SIZE;
        this.h = Alien.SPRITE_SIZE;
    }

    init(speed) {
        this.x = (Math.random() * 208) >> 0;
        this.y = -16;
        this.sX = 0;
        this.color = (Math.random() * 4) >> 0;
        this.score = 100 + (this.color * 100);
        this.sY = this.color * Alien.SPRITE_SIZE;
        this.speed = speed;
        this.resetSpeeds();
        this.zapTime = 0;
        this.animTime = 0;
        this.displayCombo = false;
        this.displayScore = null;
        this.active = true;
    }

    resetSpeeds(dir) {
        if(dir === 'l') this.speedX = ((Math.random() * (this.speed + 1)) >> 0) - this.speed;
        else if(dir === 'r') this.speedX = ((Math.random() * (this.speed + 1)) >> 0);
        else this.speedX = ((Math.random() * ((this.speed + 1) << 1)) >> 0) - this.speed;

        this.speedY = ((Math.random() * this.speed) >> 0) + 1;
        this.speedTimeout = 60;
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

        if(!this.speedTimeout) this.resetSpeeds();
        this.speedTimeout--;

        this.y += this.speedY;
        if(this.y >= Graphics.playArea.height) {
            this.active = false;
            Alien.missed++;
            return;
        }

        this.x += this.speedX;
        if(this.x + this.w + 8 >= Graphics.playArea.width)
            this.resetSpeeds('l');
        else if(this.x - 8 <= 0)
            this.resetSpeeds('r');

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
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.LEFT, this.speed);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.RIGHT, this.speed);
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
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_LEFT, this.speed);
                                break;
                            case 3:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_RIGHT, this.speed);
                                break;
                            case 2:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_LEFT, this.speed);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_RIGHT, this.speed);
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
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN, this.speed);
                                break;
                            case 5:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_LEFT, this.speed);
                                break;
                            case 4:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.DOWN_RIGHT, this.speed);
                                break;
                            case 3:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP, this.speed);
                                break;
                            case 2:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_LEFT, this.speed);
                                break;
                            case 1:
                                Shrapnel.pool[i].init(this.x + 4, this.y + 4, Shrapnel.UP_RIGHT, this.speed);
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
        
        AudioSystem.alienZap.stop();
        AudioSystem.alienZap.play();
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

Alien.missed = 0;
