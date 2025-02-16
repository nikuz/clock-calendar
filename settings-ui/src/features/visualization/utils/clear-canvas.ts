export function clearCanvas(canvasEl: HTMLCanvasElement) {
    const ctx = canvasEl.getContext('2d');

    ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);
}