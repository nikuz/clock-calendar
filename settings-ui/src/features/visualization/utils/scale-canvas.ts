import { getDevicePixelRatio } from './get-device-pixel-ratio';

export function scaleCanvas(canvasEl: HTMLCanvasElement) {
    const ctx = canvasEl.getContext('2d');
    const devicePixelRatio = getDevicePixelRatio();

    ctx?.resetTransform();
    ctx?.scale(devicePixelRatio, devicePixelRatio);
}