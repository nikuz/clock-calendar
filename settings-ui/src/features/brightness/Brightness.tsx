import { JSX } from 'solid-js';
import { settingsMachineActor, useSettingsStateSelect } from 'src/state';
import { Slider } from 'src/components';
import './style.css';

export default function BrightnessSetter() {
    const brightness = useSettingsStateSelect('brightness');

    const setBrightnessHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        settingsMachineActor.send({
            type: 'SET_BRIGHTNESS',
            hour: Number(event.currentTarget.value),
        });
    };

    return (
        <div class="brightness-setter-container">
            <Slider
                label="Room brightness:"
                value={brightness()}
                min={0}
                max={100}
                class="room-brightness-slider"
                onInput={setBrightnessHandler}
            />
        </div>
    );
}