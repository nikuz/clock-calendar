/* eslint-disable solid/reactivity */
import {
    HOUR_AMOUNT,
    HOUR_BOX_WIDTH,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
    LEDS_PER_HOUR,
    LED_DOT_DEFAULT_COLOR,
    NIGHT_BRIGHTNESS_THRESHOLD,
} from 'src/constants';
import { CalendarEvent } from 'src/types';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawCalendar(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    events: CalendarEvent[],
    activeEvent?: number,
    blinkCycleHight: boolean,
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
    const y = props.canvasSize.height / 2 + hourHeight / 2 - ledStripHeight;
    const totalHoursWidth = hourWidth * HOUR_AMOUNT;
    let eventIndex = 0;
    let event = props.events[eventIndex];

    for (let i = 0; i < HOUR_AMOUNT; i++) {
        const hourX = props.canvasSize.width / 2 - totalHoursWidth / 2 + hourWidth * i;
        for (let j = 0; j < LEDS_PER_HOUR; j++) {
            ctx.globalAlpha = props.brightness / 100;
            const ledIndex = i * LEDS_PER_HOUR + j;
            const x = hourX + ledDotSpacing / 2 + ledDotWidth * j;

            ctx.fillStyle = LED_DOT_DEFAULT_COLOR;
            ctx.fillRect(x, y, ledDotInnerWidth, ledDotInnerWidth);

            if (event && ledIndex >= event.startLedIndex && ledIndex <= event.endLedIndex) {
                if (props.brightness > NIGHT_BRIGHTNESS_THRESHOLD) {
                    ctx.globalAlpha = Math.min(props.brightness / 100 * 2, 1);
                }

                let dotOpacity = 1;

                if (props.activeEvent !== undefined && (eventIndex !== props.activeEvent || !props.blinkCycleHight)) {
                    dotOpacity = 0.5;
                }
                
                ctx.save();
                ctx.filter = `opacity(${dotOpacity})`;
                ctx.beginPath();
                ctx.fillStyle = event.color;
                ctx.arc(x + ledDotInnerWidth / 2, y + ledDotInnerWidth / 2, ledDotInnerWidth / 2, 0, 10);
                ctx.fill();
                ctx.restore();
                
                if (ledIndex === event.endLedIndex) {
                    eventIndex++;
                    event = props.events[eventIndex];
                }
            }
        }        
    }

    ctx.globalAlpha = props.brightness / 100;
}