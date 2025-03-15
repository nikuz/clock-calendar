import packageSettings from '../package.json';

export const BACKGROUND_COLOR = '#71706F';
export const HOUR_AMOUNT = 24;
export const HOUR_BOX_WIDTH = 3.5; // percents of the screen width
export const HOUR_BOX_HEIGHT_WIDTH_RATIO = 1.159;
export const HOUR_BOX_COLOR = 'rgb(183, 183, 183)';
export const HOUR_BOX_SEPARATOR_COLOR = '#D0D0D0';
export const HOUR_DIGIT_FONT_SIZE_RATIO = 1.2;
export const HOUR_DIGIT_DEFAULT_COLOR = 'rgba(104, 104, 104, 0.1)';
export const HOUR_DIGIT_DEFAULT_ACTIVE_COLOR = '#FFF';
export const HOUR_FONT_URL = `/${packageSettings.name}/Rubik-font.woff2`;
export const LED_DOT_DEFAULT_COLOR = 'rgba(183, 183, 183, 0.4)';
export const LED_STRIP_HOUR_BOX_HEIGHT_RATIO = 0.2;
export const LEDS_PER_HOUR = 6;
export const MINUTE_DEFAULT_ACTIVE_COLOR = '#00FF00';
export const HOLDER_IMAGE_URL = `/${packageSettings.name}/holder.svg`;
export const HOLDER_SIZE = 5.8; // percents of the screen width
export const LINER_COLOR = 'rgba(200, 200, 200, 0.5)';
export const NIGHT_BRIGHTNESS_THRESHOLD = 10; // %
export const NIGHT_TIME_COLOR = '#F00';

export const EVENT_COLORS = [
    '#00ffff',    // Cyan
    '#ff4500',    // Orange Red
    '#ffa600',    // Orange
    '#8a2be2',    // Blue Violet
    '#ff00ff',    // Magenta
    '#8b4513',    // Brown
    '#32cd32',    // Lime
    '#ffd900',    // Gold
    '#40e0d0',    // Turquoise
    '#ffc0cb',    // Pink
    '#dc143c',    // Crimson
    '#e6e6fa',    // Lavender
    '#808000',    // Olive
    '#00ff7f',    // Spring Green
    '#4682b4',    // Steel Blue
    '#daa520',    // Goldenrod
    '#ff69b4',    // Hot Pink
    '#228b22',    // Forest Green
    '#800000',    // Maroon
];