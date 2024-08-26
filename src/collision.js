const Collision = {
    check(obj1, obj2) {
        if(
            obj1.x + obj1.w > obj2.x && obj2.x + obj2.w > obj1.x
            && obj1.y + obj1.h > obj2.y && obj2.y + obj2.h > obj1.y
        ) return true;
        return false;
    },
    runAll() {
        let i, j;

        i = Alien.pool.length;
        while(i--) {
            j = player.lasers.length;
            while(j--) {
                if(Alien.pool[i].isCollidable() && player.lasers[j].active) {
                    if(this.check(Alien.pool[i], player.lasers[j])) {
                        Alien.pool[i].zap(false);
                        player.lasers[j].active = false;
                        player.addScore(Alien.pool[i].score, false);
                        break;
                    }
                }
            }

            if(Alien.pool[i].isCollidable() && player.isCollidable()) {
                if(this.check(Alien.pool[i], player.hitbox)) {
                    player.zapped = true;
                    AudioSystem.playerZap.play();
                    break;
                }
            }
        }

        i = Shrapnel.pool.length;
        while(i--) {
            j = Alien.pool.length;
            while(j--) {
                if(Shrapnel.pool[i].active && Alien.pool[j].isCollidable()) {
                    if(this.check(Shrapnel.pool[i], Alien.pool[j])) {
                        Shrapnel.pool[i].active = false;
                        player.addScore(Alien.pool[j].score, true); // Add the combo multiplier
                        Alien.pool[j].zap(true);
                        break;
                    }
                }
            }

            if(Shrapnel.pool[i].active && player.isCollidable()) {
                if(this.check(Shrapnel.pool[i], player.hitbox)) {
                    player.zapped = true;
                    AudioSystem.playerZap.play();
                    break;
                }
            }
        }

    }
}
