/* eslint-disable solid/reactivity */
import {
    HOUR_BOX_WIDTH,
    HOUR_BOX_HEIGHT_WIDTH_RATIO,
    HOUR_BOX_COLOR,
    HOUR_BOX_SEPARATOR_COLOR,
    HOUR_DIGIT_FONT_SIZE_RATIO,
    HOUR_DIGIT_DEFAULT_COLOR,
    HOUR_DIGIT_DEFAULT_ACTIVE_COLOR,
} from 'src/constants';
import { Size } from '../types';
import { remapValue } from './remap-value';

export function drawHours(props: {
    canvasEl: HTMLCanvasElement,
    canvasSize: Size,
    activeHour: number,
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
    const hoursAmount = 24;
    const totalHoursWidth = hourWidth * hoursAmount;

    const fontSize = hourWidth * HOUR_DIGIT_FONT_SIZE_RATIO;
    const textMarginY = remapValue({
        value: 7,
        inMin: 0,
        inMax: 100,
        outMin: 0,
        outMax: fontSize,
    });

    for (let i = 0; i < hoursAmount; i++) {
        const x = props.canvasSize.width / 2 - totalHoursWidth / 2 + hourWidth * i;
        const y = props.canvasSize.height / 2 - hourHeight / 2;

        ctx.fillStyle = HOUR_BOX_COLOR;
        ctx.fillRect(x, y, hourWidth, hourHeight);

        
        if (i > 0) {
            ctx.strokeStyle = HOUR_BOX_SEPARATOR_COLOR;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + hourHeight);
            ctx.stroke();
        }

        const hourText = i > 12 ? i - 12 : i;

        ctx.fillStyle = i === props.activeHour ? HOUR_DIGIT_DEFAULT_ACTIVE_COLOR : HOUR_DIGIT_DEFAULT_COLOR;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${fontSize}px Rubik`;

        if (hourText >= 10) {
            ctx.textAlign = 'right';
            ctx.fillText(
                Math.trunc(hourText / 10).toString(),
                x + hourWidth / 2,
                y + hourHeight / 2 + textMarginY,
                hourWidth,
            );
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.font = `${fontSize / 1.5}px Rubik`;
            const smallDigitMarginY = remapValue({
                value: 9,
                inMin: 0,
                inMax: 100,
                outMin: 0,
                outMax: fontSize,
            });
            ctx.fillText(
                (hourText % 10).toString(),
                x + hourWidth - hourWidth / 3,
                y + hourHeight - smallDigitMarginY,
                hourWidth,
            );
        } else {
            ctx.fillText(
                hourText.toString(),
                x + hourWidth / 2,
                y + hourHeight / 2 + textMarginY,
                hourWidth,
            );
        }
    }
}