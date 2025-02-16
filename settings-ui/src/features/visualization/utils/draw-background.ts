import { BACKGROUND_COLOR } from '../constants';
import { Size } from '../types';

export function drawBackground(canvasEl: HTMLCanvasElement, canvasSize: Size) {
    const ctx = canvasEl.getContext('2d');
    if (!ctx) {
        return;
    }

    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
}