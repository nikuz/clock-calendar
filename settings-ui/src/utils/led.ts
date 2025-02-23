import { LEDS_PER_HOUR } from 'src/constants';

export function getLedIndexFromTime(minutes: number, inclusive = true) {
    let index = Math.trunc(minutes / 60) * LEDS_PER_HOUR + Math.trunc(minutes % 60 / 10);

    if (!inclusive && minutes > 0 && minutes % 10 === 0) {
        index--;
    }

    return index;
}