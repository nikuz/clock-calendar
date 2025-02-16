import { JSX } from 'solid-js';
import { settingsMachineActor, useSettingsStateSelect } from 'src/state';
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
            <div class="time-setter-item">
                <div class="time-setter-label">Hour:</div>
                <input
                    type="range"
                    min={0}
                    max={23}
                    value={hour()}
                    class="slider"
                    onInput={setHourHandler}
                />
                <div class="time-setter-value">{hour()}</div>
            </div>

            <div class="time-setter-item">
                <div class="time-setter-label">Minute:</div>
                <input
                    type="range"
                    min={0}
                    max={59}
                    value={minute()}
                    class="slider"
                    onInput={setMinuteHandler}
                />
                <div class="time-setter-value">{minute()}</div>
            </div>
        </div>
    );
}