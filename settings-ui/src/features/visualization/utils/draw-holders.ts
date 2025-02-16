/* eslint-disable solid/reactivity */
import {
    HOLDER_SIZE,
    HOUR_BOX_WIDTH,
    HOUR_AMOUNT,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
} from 'src/constants';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawHolders(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    image: HTMLImageElement | undefined
}) {
    const ctx = props.canvasEl.getContext('2d');
    if (!ctx || !props.image || !props.image.width) {
        return;
    }

    const imageWidth = props.image.width;
    const imageHeight = props.image.height;
    const sizeRatio = imageWidth / imageHeight;

    const holderWidth = remapValue({
        value: HOLDER_SIZE,
        inMin: 0,
        inMax: 100,
        outMin: 0,
        outMax: props.canvasSize.width,
    });
    const holderHeight = holderWidth * sizeRatio;
    const hourWidth = remapValue({
        value: HOUR_BOX_WIDTH,
        inMin: 0,
        inMax: 100,
        outMin: 0,
        outMax: props.canvasSize.width,
    });
    const hourHeight = hourWidth * HOUR_BOX_HEIGHT_WIDTH_RATIO;
    const ledStripHeight = hourHeight * LED_STRIP_HOUR_BOX_HEIGHT_RATIO;

    const totalHoursWidth = hourWidth * HOUR_AMOUNT;
    const leftX = props.canvasSize.width / 2 - totalHoursWidth / 2 - holderWidth - holderWidth / 100;
    const y = props.canvasSize.height / 2 - hourHeight / 2 - ledStripHeight * 2 - holderHeight / 150;

    ctx.drawImage(props.image, leftX, y, holderWidth, holderHeight);

    const rightX = props.canvasSize.width / 2 + totalHoursWidth / 2 + holderWidth + holderWidth / 100;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(props.image, -rightX, y, holderWidth, holderHeight);
    ctx.restore();
}