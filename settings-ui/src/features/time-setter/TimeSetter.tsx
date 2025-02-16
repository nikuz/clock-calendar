import { JSX } from 'solid-js';
import { SettingsStateContext, SettingsStateEvents } from '../../state/types';
import './style.css';

interface Props {
    settingsContext: SettingsStateContext,
    settingsSend: (event: SettingsStateEvents) => void,
}

export default function TimeSetter(props: Props) {
    const setHourHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        props.settingsSend({
            type: 'SET_HOUR',
            hour: Number(event.currentTarget.value),
        });
    };
    
    const setMinuteHandler: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        props.settingsSend({
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
                    value={props.settingsContext.hour}
                    class="slider"
                    onInput={setHourHandler}
                />
                <div class="time-setter-value">{props.settingsContext.hour}</div>
            </div>

            <div class="time-setter-item">
                <div class="time-setter-label">Minute:</div>
                <input
                    type="range"
                    min={0}
                    max={59}
                    value={props.settingsContext.minute}
                    class="slider"
                    onInput={setMinuteHandler}
                />
                <div class="time-setter-value">{props.settingsContext.minute}</div>
            </div>
        </div>
    );
}