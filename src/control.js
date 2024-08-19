const Control = {
    codes: {},
    touchPos: null,
    controller: null,
    touchEndedToStart: false,
    x: null,
    y: null,
    mouseButton: false,
    usingTouch: false,
    init() {
        Graphics.display.addEventListener('touchstart', (e) => {
            e.preventDefault();

            if(!this.usingTouch) this.usingTouch = true;

            const rect = Graphics.display.getBoundingClientRect();
            this.setControlPos(
                e.targetTouches[0].clientX - rect.left,
                e.targetTouches[0].clientY - rect.top
            );
        });

        Graphics.display.addEventListener('touchend', (e) => {
            e.preventDefault();
            if(!e.targetTouches[0]) {
                this.touchEndedToStart = true;
                this.x = null;
                this.y = null;
            }
        });

        Graphics.display.addEventListener('touchmove', (e) => {
            e.preventDefault();

            const rect = Graphics.display.getBoundingClientRect();
            this.setControlPos(
                e.touches[0].clientX - rect.left,
                e.touches[0].clientY - rect.top
            );
        });

        Graphics.display.addEventListener('mousedown', (e) => {
            e.preventDefault();
            if(e.button === 0) this.mouseButton = true;
        });

        Graphics.display.addEventListener('mouseup', (e) => {
            e.preventDefault();
            if(e.button === 0) this.mouseButton = false;
        });

        Graphics.display.addEventListener('mousemove', (e) => {
            e.preventDefault();
            this.setControlPos(e.offsetX, e.offsetY);
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
