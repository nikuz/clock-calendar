import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { useSettingsStateSelect } from 'src/state';
import { HOUR_FONT_URL, HOLDER_IMAGE_URL } from 'src/constants';
import {
    getDevicePixelRatio,
    clearCanvas,
    scaleCanvas,
    drawHours,
    drawMinutes,
    drawCalendar,
    drawHolders,
    drawLiner,
} from './utils';
import { Size } from './types';
import './style.css';

export default function Visualization() {
    const hour = useSettingsStateSelect('hour');
    const minute = useSettingsStateSelect('minute');
    const calendarEvents = useSettingsStateSelect('events');
    const calendarActiveEvent = useSettingsStateSelect('activeEvent');
    const brightness = useSettingsStateSelect('brightness');
    const [canvasSize, setCanvasSize] = createSignal<Size>({ width: 0, height: 0 });
    const [calendarEventsBlinkCycleHigh, setCalendarEventsBlinkCycleHigh] = createSignal(true);
    let canvasEl: HTMLCanvasElement | undefined;;
    let holderImageEl: HTMLImageElement | undefined;;
    let resizeObserver: ResizeObserver | undefined;
    let calendarEventsBlinkTimer: ReturnType<typeof setInterval>;

    const resizeHandler = (entries: ResizeObserverEntry[]) => {
        if (!canvasEl) {
            return;
        }
        const contentRect = entries[0].contentRect;
        const devicePixelRatio = getDevicePixelRatio();
        setCanvasSize({
            width: contentRect.width * devicePixelRatio,
            height: contentRect.height * devicePixelRatio,
        });
    }

    const drawHandler = () => {
        const ctx = canvasEl?.getContext('2d');
        if (!canvasEl || !ctx) {
            return;
        }

        ctx.globalAlpha = brightness() / 100;

        clearCanvas(canvasEl);

        drawLiner({
            canvasEl,
            canvasSize: canvasSize(),
        });
        drawHours({
            canvasEl,
            canvasSize: canvasSize(),
            activeHour: hour(),
            brightness: brightness(),
        });
        drawMinutes({
            canvasEl,
            canvasSize: canvasSize(),
            activeHour: hour(),
            activeMinute: minute(),
            brightness: brightness(),
        });
        drawCalendar({
            canvasEl,
            canvasSize: canvasSize(),
            events: calendarEvents(),
            activeEvent: calendarActiveEvent(),
            blinkCycleHight: calendarEventsBlinkCycleHigh(),
            brightness: brightness(),
        });
        drawHolders({
            canvasEl,
            canvasSize: canvasSize(),
            image: holderImageEl,
        });
    };

    createEffect(() => {
        if (!canvasEl) {
            return;
        }
        scaleCanvas(canvasEl);
    });

    createEffect(() => {
        drawHandler();
    });
    
    createEffect(() => {
        const font = new FontFace('Rubik', `url(${HOUR_FONT_URL})`);
        font.load().then(drawHandler);
    });
    
    createEffect(() => {
        const image = new Image();
        image.src = HOLDER_IMAGE_URL;
        image.onload = drawHandler;
    });

    createEffect(() => {
        if (calendarActiveEvent() === undefined) {
            setCalendarEventsBlinkCycleHigh(true);
            clearInterval(calendarEventsBlinkTimer);
        } else {
            calendarEventsBlinkTimer = setInterval(() => {
                if (calendarActiveEvent() !== undefined) {
                    setCalendarEventsBlinkCycleHigh(!calendarEventsBlinkCycleHigh());
                }
            }, 1000);
        }
    });

    onMount(() => {
        resizeObserver = new ResizeObserver(resizeHandler);
        if (canvasEl) {
            resizeObserver.observe(canvasEl);
        }
    });

    onCleanup(() => {
        if (canvasEl) {
            resizeObserver?.unobserve(canvasEl);
        }
        clearInterval(calendarEventsBlinkTimer);
    });

    return <>
        <canvas
            ref={canvasEl}
            id="visualization-canvas"
            width={canvasSize().width}
            height={canvasSize().height}
        />
        <img
            ref={holderImageEl}
            src={HOLDER_IMAGE_URL}
            id="visualization-holder-image"
        />
    </>;
}