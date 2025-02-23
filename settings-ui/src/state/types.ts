import { CalendarEvent } from 'src/types';

export interface SettingsStateContext {
    hour: number,
    minute: number,

    events: CalendarEvent[],
    activeEvent?: number,

    brightness: number,
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

export interface SetActiveEventEvent {
    type: 'SET_ACTIVE_EVENT',
    index: number,
}

export interface ClearActiveEventEvent { type: 'CLEAR_ACTIVE_EVENT' }

export interface SetBrightnessEvent {
    type: 'SET_BRIGHTNESS',
    hour: number,
}

export type SettingsStateEvents =
    | SetHourEvent
    | SetMinuteEvent
    | SetEventsEvent
    | SetActiveEventEvent
    | ClearActiveEventEvent
    | SetBrightnessEvent;