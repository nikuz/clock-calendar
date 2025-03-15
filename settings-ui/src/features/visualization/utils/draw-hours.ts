/* eslint-disable solid/reactivity */
import {
    HOUR_AMOUNT,
    HOUR_BOX_WIDTH,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    HOUR_BOX_COLOR,
    HOUR_BOX_SEPARATOR_COLOR,
    HOUR_DIGIT_FONT_SIZE_RATIO,
    HOUR_DIGIT_DEFAULT_COLOR,
    HOUR_DIGIT_DEFAULT_ACTIVE_COLOR,
    LED_STRIP_HOUR_BOX_HEIGHT_RATIO,
    NIGHT_BRIGHTNESS_THRESHOLD,
    NIGHT_TIME_COLOR,
} from 'src/constants';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawHours(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    activeHour: number,
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
    const y = props.canvasSize.height / 2 - hourHeight / 2 - ledStripHeight * 2;
    const totalHoursWidth = hourWidth * HOUR_AMOUNT;

    const fontSize = hourWidth * HOUR_DIGIT_FONT_SIZE_RATIO;
    
    for (let i = 0; i < HOUR_AMOUNT; i++) {
        ctx.globalAlpha = props.brightness / 100;

        const isActiveHour = i === props.activeHour;
        const x = props.canvasSize.width / 2 - totalHoursWidth / 2 + hourWidth * i;

        ctx.fillStyle = HOUR_BOX_COLOR;
        ctx.fillRect(x, y, hourWidth, hourHeight);
        
        if (i > 0) {
            ctx.strokeStyle = HOUR_BOX_SEPARATOR_COLOR;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + hourHeight);
            ctx.stroke();
        }

        const hour = i > 12 ? i - 12 : i;

        ctx.fillStyle = isActiveHour ? HOUR_DIGIT_DEFAULT_ACTIVE_COLOR : HOUR_DIGIT_DEFAULT_COLOR;

        if (isActiveHour && props.brightness < NIGHT_BRIGHTNESS_THRESHOLD) {
            ctx.fillStyle = NIGHT_TIME_COLOR;
        }

        ctx.textAlign = 'center';

        if (isActiveHour) {
            ctx.globalAlpha = 1;
        }
        if (hour >= 10) {
            ctx.font = `${fontSize}px Rubik`;
            const firstHourDigitText = Math.trunc(hour / 10).toString();
            const firstHourDigitSize = measureTextSize(ctx, firstHourDigitText);
            ctx.textAlign = 'right';
            ctx.fillText(
                firstHourDigitText,
                x + hourWidth / 2 + (hourWidth / 100 * 3),
                y + hourHeight + getFirstHourDigitYShift(firstHourDigitSize),
                hourWidth,
            );
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.font = `${fontSize / 1.5}px Rubik`;

            const secondHourDigit = (hour % 10).toString();
            const secondHourDigitSize = measureTextSize(ctx, secondHourDigit);
            ctx.fillText(
                secondHourDigit,
                x + hourWidth - hourWidth / 3.5,
                y + hourHeight + getSecondHourDigitYShift(secondHourDigitSize),
                hourWidth,
            );
        } else {
            ctx.font = `${fontSize}px Rubik`;
            const hourText = hour.toString();
            const hourSize = measureTextSize(ctx, hourText);
            ctx.fillText(
                hourText,
                x + hourWidth / 2,
                y + hourHeight + getFirstHourDigitYShift(hourSize),
                hourWidth,
            );
        }
    }

    ctx.globalAlpha = props.brightness / 100;
}

function measureTextSize(ctx: CanvasRenderingContext2D, text: string): TextMetrics {
    return ctx.measureText(text);
}

function getFirstHourDigitYShift(size: TextMetrics): number {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    return isFirefox ? size.ideographicBaseline : size.ideographicBaseline / 2;
}

function getSecondHourDigitYShift(size: TextMetrics): number {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    return isFirefox ? size.ideographicBaseline * 1.5 : size.ideographicBaseline / 1.3;
}