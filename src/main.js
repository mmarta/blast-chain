(function() {
    let gameMode = true;

    function update() {
        Background.update();

        if(gameMode) {
            player.update();
        } else {

        }
    }

    function render() {
        Graphics.clear();
        Background.render();

        if(gameMode) {
            player.render();
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
