import { JSX } from 'solid-js';
import { settingsMachineActor, useSettingsStateSelect } from 'src/state';
import { Slider } from 'src/components';
import './style.css';

export default function TimeSetter() {
    const hour = useSettingsStateSelect('hour');
    const minute = useSettingsStateSelect('minute');

    const setHourHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        settingsMachineActor.send({
            type: 'SET_HOUR',
            hour: Number(event.currentTarget.value),
        });
    };
    
    const setMinuteHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        settingsMachineActor.send({
            type: 'SET_MINUTE',
            minute: Number(event.currentTarget.value),
        });
    };

    return (
        <div class="time-setter-container">
            <h2>Time</h2>

            <Slider
                label="Hour:"
                value={hour()}
                min={0}
                max={23}
                onInput={setHourHandler}
            />
            <Slider
                label="Minute:"
                value={minute()}
                min={0}
                max={59}
                onInput={setMinuteHandler}
            />
        </div>
    );
}