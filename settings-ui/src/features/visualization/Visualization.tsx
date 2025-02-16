import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { useSettingsStateSelect } from '../../state';
import {
    getDevicePixelRatio,
    clearCanvas,
    scaleCanvas,
    drawHours,
} from './utils';
import { FONT_URL } from './constants';
import { Size } from './types';
import './style.css';

export default function Visualization() {
    const hour = useSettingsStateSelect('hour');
    const [canvasSize, setCanvasSize] = createSignal<Size>({ width: 0, height: 0 });
    let canvasEl: HTMLCanvasElement | undefined;;
    let resizeObserver: ResizeObserver | undefined;

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

        clearCanvas(canvasEl);

        // drawBackground(canvasEl, canvasSize());
        drawHours({
            canvasEl,
            canvasSize: canvasSize(),
            activeHour: hour(),
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
        const font = new FontFace('Rubik', `url(${FONT_URL})`);
        font.load().then(drawHandler);
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
    });

    return (
        <canvas
            ref={canvasEl}
            id="visualization-canvas"
            width={canvasSize().width}
            height={canvasSize().height}
        />
    );
}