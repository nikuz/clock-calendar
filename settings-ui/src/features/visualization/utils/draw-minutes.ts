/* eslint-disable solid/reactivity */
import {
    HOUR_AMOUNT,
    HOUR_BOX_WIDTH,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
    LEDS_PER_HOUR,
    LED_DOT_DEFAULT_COLOR,
    MINUTE_DEFAULT_ACTIVE_COLOR,
    NIGHT_BRIGHTNESS_THRESHOLD,
    NIGHT_TIME_COLOR,
} from 'src/constants';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawMinutes(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    activeHour: number,
    activeMinute: number,
    brightness: number,
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
    const ledDotWidth = hourWidth / LEDS_PER_HOUR;
    const ledDotInnerWidth = ledDotWidth / 100 * 83;
    const ledDotSpacing = ledDotWidth - ledDotInnerWidth;
    const y = props.canvasSize.height / 2 + hourHeight / 2 - ledStripHeight * 2 + ledStripHeight / 5;
    const totalHoursWidth = hourWidth * HOUR_AMOUNT;

    for (let i = 0; i < HOUR_AMOUNT; i++) {
        const hourX = props.canvasSize.width / 2 - totalHoursWidth / 2 + hourWidth * i;
        for (let j = 0; j < LEDS_PER_HOUR; j++) {
            ctx.globalAlpha = props.brightness / 100;

            const x = hourX + ledDotSpacing / 2 + ledDotWidth * j;
            
            ctx.fillStyle = LED_DOT_DEFAULT_COLOR;
            ctx.fillRect(x, y, ledDotInnerWidth, ledDotInnerWidth);

            if (i === props.activeHour && props.activeMinute / 10 >= j) {
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.fillStyle = MINUTE_DEFAULT_ACTIVE_COLOR;
                if (props.brightness <= NIGHT_BRIGHTNESS_THRESHOLD) {
                    ctx.fillStyle = NIGHT_TIME_COLOR;
                }
                ctx.arc(x + ledDotInnerWidth / 2, y + ledDotInnerWidth / 2, ledDotInnerWidth / 2, 0, 10);
                ctx.fill();
            }
        }
    }

    ctx.globalAlpha = props.brightness / 100;
}