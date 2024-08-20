(function() {
    let gameMode = true, enemyGenTimeout = 10;

    function update() {
        let i;
        Background.update();

        if(gameMode) {
            Collision.runAll();

            if(!enemyGenTimeout) {
                enemyGenTimeout = 10;
                i = Alien.pool.length;
                while(i--) {
                    if(!Alien.pool[i].active) {
                        Alien.pool[i].init();
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
        } else {

        }
    }

    function render() {
        let i;
        Graphics.clear();
        Background.render();

        if(gameMode) {
            player.render();

            i = Alien.pool.length;
            while(i--) Alien.pool[i].render();

            i = Shrapnel.pool.length;
            while(i--) Shrapnel.pool[i].render();
        } else {

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
            await Graphics.testAndSetRefreshMode();

            Control.init();
            Alien.poolInit();
            Shrapnel.poolInit();
            player.start();
            Background.refresh();

            Graphics.nextFrame(mainLoop);
        } catch(ex) {
            console.error(ex);
            Graphics.displayContext.fillStyle = '#000';
            Graphics.displayContext.fillRect(0, 0, Graphics.display.width, Graphics.display.height);
            if(Graphics.font) {
                Graphics.printString(Graphics.displayContext, ex.error, 8, 8, 1);
                Graphics.printString(Graphics.displayContext, ex.file, 16, 16, 2);
            } else {
                Graphics.displayContext.fillStyle = '#ff0000';
                Graphics.displayContext.font = "16px Arial";
                Graphics.displayContext.fillText('Could not load font.', 20, 20);
            }
        }
    }

    start();
})();
