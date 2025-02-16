import { setup, assign } from 'xstate';
import { SettingsStateContext, SettingsStateEvents } from './types';

export const settingsMachine = setup({
    types: {
        context: {} as SettingsStateContext,
        events: {} as SettingsStateEvents,
    }
}).createMachine({
    id: 'SETTINGS',

    context: {
        hour: 0,
        minute: 0,
    },

    on: {
        SET_HOUR: {
            actions: assign(({ event }) => ({ hour: event.hour })),
        },
        SET_MINUTE: {
            actions: assign(({ event }) => ({ minute: event.minute })),
        },
    },
});