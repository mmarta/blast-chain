(function() {
    let gameMode = false, enemyGenTimeout = 10, gameOverTime = 0, readyTime = 0, speedUpTimeout, speed;

    function update() {
        let i;

        if(gameMode) {
            if(gameOverTime) {
                gameOverTime--;
                if(!gameOverTime) {
                    gameMode = false;

                    i = player.lasers.length;
                    while(i--) player.lasers[i].active = false;

                    i = Alien.pool.length;
                    while(i--) Alien.pool[i].active = false;

                    i = Shrapnel.pool.length;
                    while(i--) Shrapnel.pool[i].active = false;

                    player.comboMultiplier = 1;
                    player.comboMultiplierTime = 0;

                    Control.pressEndedToStart = false;
                    Background.refresh();
                }
            } else if(readyTime) {
                readyTime--;
                if(!readyTime) AudioSystem.bgm.play();
            } else {
                Collision.runAll();
                if(player.zapped || Alien.missed >= 5) {
                    gameOverTime = 120;
                    AudioSystem.bgm.stop();
                    return;
                }

                if(!speedUpTimeout) {
                    speedUpTimeout = 900;
                    speed++;
                }
                speedUpTimeout--;

                Background.update();

                if(!enemyGenTimeout) {
                    enemyGenTimeout = (20 / speed) >> 0;
                    i = Alien.pool.length;
                    while(i--) {
                        if(!Alien.pool[i].active) {
                            Alien.pool[i].init(speed);
                            break;
                        }
                    }
                }
                enemyGenTimeout--;

                player.update();

                i = Alien.pool.length;
                while(i--) Alien.pool[i].update();

                i = Shrapnel.pool.length;
                while(i--) Shrapnel.pool[i].update();
            }
        } else {
            Background.update();

            if(Control.pressEndedToStart) {
                player.start();
                readyTime = 60;
                enemyGenTimeout = (20 / speed) >> 0;
                speed = 2;
                speedUpTimeout = 900;
                Alien.missed = 0;
                Background.refresh();
                Control.pressEndedToStart = false;
                gameMode = true;
            }
        }
    }

    function render() {
        let i;
        Graphics.clear();

        if(gameMode) {
            if(readyTime) {
                Graphics.printString(Graphics.playAreaContext, 'Ready', 92, 104, 4);
            } else {
                Background.render();

                player.render();

                i = Alien.pool.length;
                while(i--) Alien.pool[i].render();

                i = Shrapnel.pool.length;
                while(i--) Shrapnel.pool[i].render();

                if(Graphics.tate) {
                    Graphics.printString(Graphics.preRenderContext, 'Missed', 88, 0, 1);
                    Graphics.printIntRight(Graphics.preRenderContext, Alien.missed, 108, 8, 0);
                } else {
                    Graphics.printString(Graphics.preRenderContext, 'Missed', 232, 136, 2);
                    Graphics.printIntRight(Graphics.preRenderContext, Alien.missed, 304, 144, 0);
                }

                if(gameOverTime) {
                    if(player.zapped)
                        Graphics.printString(Graphics.playAreaContext, 'Zapped', 88, 64, 2);
                    else if(Alien.missed >= 5)
                        Graphics.printString(Graphics.playAreaContext, 'Missed 5', 80, 64, 2);

                    Graphics.printString(Graphics.playAreaContext, 'Game Over', 76, 104, 3);
                }
            }
        } else {
            Background.render();

            Graphics.printString(Graphics.playAreaContext, 'Blast Chain', 68, 32, 7);

            Graphics.printString(Graphics.playAreaContext, 'Touch', 8, 72, 8);
            Graphics.printString(Graphics.playAreaContext, 'Mouse Move', 8, 80, 8);
            Graphics.printString(Graphics.playAreaContext, 'Move', 184, 80, 0);

            Graphics.printString(Graphics.playAreaContext, 'Touch', 8, 96, 8);
            Graphics.printString(Graphics.playAreaContext, 'Mouse Button 1 Click', 8, 104, 8);
            Graphics.printString(Graphics.playAreaContext, 'Fire', 184, 104, 0);

            Graphics.printString(Graphics.playAreaContext, 'Click or tap release to play', 0, 144, 5);

            Graphics.printString(Graphics.playAreaContext, 'By Marc Marta', 60, 168, 3);
            Graphics.printString(Graphics.playAreaContext, 'Howler.js Audio Handling', 16, 176, 3);
            Graphics.printString(Graphics.playAreaContext, 'Inspired by Japan', 44, 184, 0);
            Graphics.printString(Graphics.playAreaContext, 'Made in New York', 48, 192, 1);

            if(Graphics.useVsync)
                Graphics.printString(Graphics.playAreaContext, 'Using 60Hz Vsync', 48, 208, 0);
            else
                Graphics.printString(Graphics.playAreaContext, '60Hz Vsync Unavailable', 24, 208, 7);
        }

        Graphics.finishRender();
    }

    function mainLoop() {
        update();
        render();

        Graphics.nextFrame(mainLoop);
    }

    async function start() {
        Graphics.init();
        Background.init();

        try {
            await Graphics.loadGraphics();
            await AudioSystem.init();
            await Graphics.testAndSetRefreshMode();

            Control.init();
            Alien.poolInit();
            Shrapnel.poolInit();
            player.start();
            Background.refresh();

            Graphics.nextFrame(mainLoop);
        } catch(ex) {
            console.error(ex);
            Graphics.preRenderContext.fillStyle = '#000';
            Graphics.preRenderContext.fillRect(0, 0, Graphics.display.width, Graphics.display.height);
            if(Graphics.font) {
                Graphics.printString(Graphics.preRenderContext, ex.error, 8, 8, 1);
                Graphics.printString(Graphics.preRenderContext, ex.file, 16, 16, 2);
            } else {
                Graphics.preRenderContext.fillStyle = '#ff0000';
                Graphics.preRenderContext.font = "16px Arial";
                Graphics.preRenderContext.fillText('Could not load font.', 20, 20);
            }
            Graphics.renderToDisplay();
        }
    }

    start();
})();
