import { createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import { SettingsStateContext, SettingsStateEvents } from './types';

const createSettingsMachine = () => {
    const now = new Date();
    const [context, setContext] = createStore<SettingsStateContext>({
        hour: now.getHours(),
        minute: now.getMinutes(),

        events: [],

        brightness: 100,
    });

    const send = (event: SettingsStateEvents) => {
        switch (event.type) {
            case 'SET_HOUR':
                setContext('hour', event.hour);
                break;
            
            case 'SET_MINUTE':
                setContext('minute', event.minute);
                break;
            
            case 'SET_EVENTS':
                setContext('events', event.events);
                break;
            
            case 'SET_ACTIVE_EVENT':
                setContext('activeEvent', event.index);
                break;
            
            case 'CLEAR_ACTIVE_EVENT':
                setContext('activeEvent', undefined);
                break;
            
            case 'SET_BRIGHTNESS':
                setContext('brightness', event.value);
                break;
        }
    };

    return {
        context,
        send,
    };
};

export const settingsMachineActor = createRoot(() => createSettingsMachine());