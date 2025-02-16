import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { SettingsStateContext, SettingsStateEvents } from './types';

const createSettingsMachine = () => {
    const [context, setContext] = createStore<SettingsStateContext>({
        hour: 0,
        minute: 0,
    });

    const send = (event: SettingsStateEvents) => {
        switch (event.type) {
            case 'SET_HOUR':
                setContext('hour', event.hour);
                break;
            
            case 'SET_MINUTE':
                setContext('minute', event.minute);
                break;
        }
    };

    return {
        context,
        send,
    };
};

export const settingsMachineActor = createRoot(() => createSettingsMachine());