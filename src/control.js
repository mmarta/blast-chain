const Control = {
    codes: {},
    touchPos: null,
    controller: null,
    pressEndedToStart: false,
    x: null,
    y: null,
    mouseButton: false,
    usingTouch: false,
    init() {
        window.addEventListener('touchstart', (e) => {
            e.preventDefault();

            if(!this.usingTouch) this.usingTouch = true;

            const rect = Graphics.display.getBoundingClientRect();
            this.setControlPos(
                e.targetTouches[0].clientX - rect.left,
                e.targetTouches[0].clientY - rect.top
            );
        });

        window.addEventListener('touchend', (e) => {
            e.preventDefault();
            if(!e.targetTouches[0]) {
                this.pressEndedToStart = true;
                this.x = null;
                this.y = null;
            }
        });

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();

            const rect = Graphics.display.getBoundingClientRect();
            this.setControlPos(
                e.touches[0].clientX - rect.left,
                e.touches[0].clientY - rect.top
            );
        });

        window.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if(e.button === 0) this.mouseButton = true;
        });

        window.addEventListener('mouseup', (e) => {
            e.preventDefault();
            if(e.button === 0) {
                this.mouseButton = false;
                this.pressEndedToStart = true;
            }
        });

        window.addEventListener('mousemove', (e) => {
            e.preventDefault();
            const rect = Graphics.display.getBoundingClientRect();
            this.setControlPos(
                e.clientX - rect.left,
                e.clientY - rect.top
            );
        });

        Graphics.display.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            this.x = null;
            this.y = null;
        });
    },
    setControlPos(x, y) {
        const xRatio = Graphics.screenW / Graphics.display.width;
        const yRatio = Graphics.screenH / Graphics.display.height;
        this.x = (x / xRatio) >> 0;
        this.y = (y / yRatio) >> 0;
    }
};
