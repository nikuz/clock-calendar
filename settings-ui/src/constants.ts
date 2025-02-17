import packageSettings from '../package.json';

export const BACKGROUND_COLOR = 'rgb(113, 112, 111)';
export const HOUR_AMOUNT = 24;
export const HOUR_BOX_WIDTH = 3.5; // percents of the screen width
export const HOUR_BOX_HEIGHT_WIDTH_RATIO = 1.159;
export const HOUR_BOX_COLOR = 'rgb(183, 183, 183)';
export const HOUR_BOX_SEPARATOR_COLOR = '#D0D0D0';
export const HOUR_DIGIT_FONT_SIZE_RATIO = 1;
export const HOUR_DIGIT_DEFAULT_COLOR = 'rgba(104, 104, 104, 0.1)';
export const HOUR_DIGIT_DEFAULT_ACTIVE_COLOR = '#FFF';
export const HOUR_FONT_URL = `/${packageSettings.name}/Rubik-font.woff2`;
export const LED_DOT_DEFAULT_COLOR = 'rgba(183, 183, 183, 0.4)';
export const LED_STRIP_LENGTH = 144; // amount of LED dots
export const LED_STRIP_HOUR_BOX_HEIGHT_RATIO = 0.2;
export const LEDS_PER_HOUR = 6;
export const MINUTE_DEFAULT_ACTIVE_COLOR = '#00FF00';
export const HOLDER_IMAGE_URL = `/${packageSettings.name}/holder.svg`;
export const HOLDER_SIZE = 5.8; // percents of the screen width
export const LINER_COLOR = 'rgba(200, 200, 200, 0.5)';