import { CalendarEvent } from 'src/types';

export interface SettingsStateContext {
    hour: number,
    minute: number,
    events: CalendarEvent[],
}

export interface SetHourEvent {
    type: 'SET_HOUR',
    hour: number,
}

export interface SetMinuteEvent {
    type: 'SET_MINUTE',
    minute: number,
}

export interface SetEventsEvent {
    type: 'SET_EVENTS',
    events: CalendarEvent[],
}

export type SettingsStateEvents =
    | SetHourEvent
    | SetMinuteEvent
    | SetEventsEvent;