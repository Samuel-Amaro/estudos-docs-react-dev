export class FadeInAnimation {
    node: HTMLElement;
    duration = 0;
    startTime= 0;
    frameId = 0;

    constructor(node: HTMLElement) {
        this.node = node;
    }
    
    start(duration: number) {
        this.duration = duration;
        if (this.duration === 0) {
        // Jump to end immediately
        this.onProgress(1);
        } else {
        this.onProgress(0);
        // Start animating
        this.startTime = performance.now();
        this.frameId = requestAnimationFrame(() => this.onFrame());
        }
    }

    onFrame() {
        const timePassed = performance.now() - this.startTime;
        const progress = Math.min(timePassed / this.duration, 1);
        this.onProgress(progress);
        if (progress < 1) {
        // We still have more frames to paint
        this.frameId = requestAnimationFrame(() => this.onFrame());
        }
    }

    onProgress(progress: number) {
        this.node.style.opacity = String(progress).toString();
    }
    
    stop() {
        cancelAnimationFrame(this.frameId);
        this.startTime = 0;
        this.frameId = 0;
        this.duration = 0;
    }
}
