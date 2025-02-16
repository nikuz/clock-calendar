/* eslint-disable solid/reactivity */
import {
    HOUR_BOX_WIDTH,
    HOUR_AMOUNT,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
    DIFFUSER_COLOR,
} from 'src/constants';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawDiffuser(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
}) {
    const ctx = props.canvasEl.getContext('2d');
    if (!ctx) {
        return;
    }

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
    const x = props.canvasSize.width / 2 - totalHoursWidth / 2;
    const y = props.canvasSize.height / 2 + hourHeight / 2 - ledStripHeight * 2 - ledStripHeight / 10;
    const width = props.canvasSize.width / 2 + totalHoursWidth / 2 - x;

    ctx.save();
    ctx.filter = 'blur(5px)';
    ctx.fillStyle = DIFFUSER_COLOR;
    ctx.fillRect(x, y, width, ledStripHeight * 2);
    ctx.restore();
}