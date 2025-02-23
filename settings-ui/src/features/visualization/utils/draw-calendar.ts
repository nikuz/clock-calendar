/* eslint-disable solid/reactivity */
import {
    HOUR_AMOUNT,
    HOUR_BOX_WIDTH,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
    LEDS_PER_HOUR,
    LED_DOT_DEFAULT_COLOR,
} from 'src/constants';
import { CalendarEvent } from 'src/types';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawCalendar(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    events: CalendarEvent[],
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
    const y = props.canvasSize.height / 2 + hourHeight / 2 - ledStripHeight;
    const totalHoursWidth = hourWidth * HOUR_AMOUNT;
    let eventIndex = 0;
    let event = props.events[eventIndex];

    for (let i = 0; i < HOUR_AMOUNT; i++) {
        const hourX = props.canvasSize.width / 2 - totalHoursWidth / 2 + hourWidth * i;
        for (let j = 0; j < LEDS_PER_HOUR; j++) {
            const ledIndex = i * LEDS_PER_HOUR + j;
            const x = hourX + ledDotSpacing / 2 + ledDotWidth * j;

            ctx.fillStyle = LED_DOT_DEFAULT_COLOR;
            ctx.fillRect(x, y, ledDotInnerWidth, ledDotInnerWidth);

            let fillStyle = LED_DOT_DEFAULT_COLOR;

            if (event && ledIndex >= event.startLedIndex && ledIndex <= event.endLedIndex) {
                fillStyle = event.color;
                
                if (ledIndex === event.endLedIndex) {
                    eventIndex++;
                    event = props.events[eventIndex];
                }
            }

            ctx.save();
            ctx.filter = 'blur(5px) opacity(0.5)';
            ctx.beginPath();
            ctx.fillStyle = fillStyle;
            ctx.arc(x + ledDotInnerWidth / 2, y + ledDotInnerWidth / 2, ledDotInnerWidth / 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            ctx.beginPath();
            ctx.fillStyle = fillStyle;
            ctx.arc(x + ledDotInnerWidth / 2, y + ledDotInnerWidth / 2, ledDotInnerWidth / 2.5, 0, 10);
            ctx.fill();
        }        
    }
}