class Player extends DrawableObject {
    constructor() {
        super();
        this.animTime = 0;
        this.sY = 0;
        this.w = Player.SPRITE_SIZE;
        this.h = Player.SPRITE_SIZE;
        this.y = Player.START_Y;
        this.score = 0;
        this.zapped = false;
        this.comboMultiplier = 1;
        this.comboMultiplierTime = 0;
        this.laserTime = 0;
        this.hitbox = {
            x: 0,
            y: 0,
            w: 4,
            h: 5
        },
        this.lasers = [
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser(),
            new PlayerLaser()
        ];
    }

    start() {
        if(!this.x) this.x = Player.START_X;
        else this.x = Control.x;
        this.sX = 0;
        this.x = (Graphics.playArea.width - this.w) >> 1;
        this.animTime = 0;
        this.score = 0;
        this.zapped = false;
        this.comboMultiplier = 1;
        this.comboMultiplierTime = 0;
        this.laserTime = 0;
        this.hitbox.x = this.x + 6;
        this.hitbox.y = this.y + 6;
        this.active = true;
    }

    addScore(score, useComboMultiplier) {
        if(useComboMultiplier) {
            if(this.comboMultiplier < 50) this.comboMultiplier++;
            this.comboMultiplierTime = 60;
            this.score += (score * this.comboMultiplier);
        } else this.score += score;

        if(this.score >= System.hi) System.hi = this.score;
    }

    update() {
        if(!this.active) return;

        for(let i = 0; i < this.lasers.length; i++) this.lasers[i].update();

        // Movement controls
        const centerX = this.x + (Player.SPRITE_SIZE >> 1);
        if(Control.x === null);
        // else this.x = Control.x - (Player.SPRITE_SIZE >> 1);
        else if(Control.x >= centerX + 32) this.x += 4;
        else if(Control.x >= centerX + 4) this.x += 2;
        else if(Control.x >= centerX + 1) this.x += 1;
        else if(Control.x <= centerX - 32) this.x -= 4;
        else if(Control.x <= centerX - 4) this.x -= 2;
        else if(Control.x <= centerX - 1) this.x -= 1;

        if(this.x < 8) this.x = 8;
        else if(this.x > 200) this.x = 200;

        this.hitbox.x = this.x + 6;
        this.hitbox.y = this.y + 6;

        // Laser controls
        if(Control.mouseButton || (Control.usingTouch && Control.x)) {
            this.laserTime++;
            if(this.laserTime === 1 || this.laserTime === 7) {
                // Create next laser
                for(let i = 0; i < this.lasers.length; i++) {
                    if(!this.lasers[i].active) {
                        this.lasers[i].init(this.x + 4, this.y);
                        break;
                    }
                }
                this.laserTime = 1;
            }
        } else if(this.laserTime) this.laserTime = 0;

        // Laser updates

        switch(this.animTime) {
            case 0:
                this.sX = 0;
                break;
            case 3:
            case 15:
                this.sX = 16;
                break;
            case 6:
            case 12:
                this.sX = 32;
                break;
            case 9:
                this.sX = 48;
                break;
        }

        // Combo multiplier
        if(this.comboMultiplierTime) {
            this.comboMultiplierTime--;
            if(!this.comboMultiplierTime) this.comboMultiplier = 1;
        }

        this.animTime++;
        if(this.animTime >= 18) this.animTime = 0;
    }

    render() {
        if(!this.active) return;

        for(let i = 0; i < this.lasers.length; i++) this.lasers[i].render();

        Graphics.playAreaContext.drawImage(
            Graphics.spritePlayer, this.sX, this.sY, this.w, this.h,
            this.x, this.y, this.w, this.h
        );
    }

    renderStatsTate() {
        Graphics.printString(Graphics.displayContext, 'Score', 8, 0, 2);
        Graphics.printIntRight(Graphics.displayContext, this.score, 56, 8, 0);

        if(this.comboMultiplier > 1) {
            Graphics.printString(Graphics.displayContext, 'Shrapnel Combo x', 0, 240, 0);
            Graphics.printIntRight(Graphics.displayContext, this.comboMultiplier, 144, 240, 0);

            Graphics.displayContext.fillStyle = '#0080ff';
            Graphics.displayContext.fillRect(160, 240, this.comboMultiplierTime, 8);
        }
    }

    renderStatsYoko() {
        Graphics.printString(Graphics.displayContext, 'Score', 232, 8, 2);
        Graphics.printIntRight(Graphics.displayContext, this.score, 304, 16, 0);

        if(this.comboMultiplier > 1) {
            Graphics.printString(Graphics.displayContext, 'Shrapnel', 232, 160, 0);
            Graphics.printString(Graphics.displayContext, 'Combo x', 232, 168, 0);
            Graphics.printIntRight(Graphics.displayContext, this.comboMultiplier, 304, 168, 0);

            Graphics.displayContext.fillStyle = '#0080ff';
            Graphics.displayContext.fillRect(232, 176, this.comboMultiplierTime, 8);
        }
    }

    isCollidable() {
        return this.active && !this.zapped;
    }
}

Player.START_X = 104;
Player.START_Y = 200;
Player.SPRITE_SIZE = 16;

const player = new Player();
