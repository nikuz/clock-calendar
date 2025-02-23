import { JSX } from 'solid-js';
import './style.css';

interface Props {
    label: string,
    value: number,
    min: number,
    max: number,
    class?: string,
    onInput: JSX.EventHandler<HTMLInputElement, InputEvent>,
}

export function Slider(props: Props) {
    return (
        <div class={`slider-container ${props.class ?? ''}`}>
            <div class="slider-label">{props.label}</div>
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={props.value}
                class="slider"
                onInput={(event) => props.onInput(event)}
            />
            <div class="slider-value">{props.value}</div>
        </div>
    );
}