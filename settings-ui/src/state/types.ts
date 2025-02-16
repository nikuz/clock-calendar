export interface SettingsStateContext {
    hour: number,
    minute: number,
}

export interface SetHourEvent {
    type: 'SET_HOUR',
    hour: number,
}

export interface SetMinuteEvent {
    type: 'SET_MINUTE',
    minute: number,
}

export type SettingsStateEvents =
    | SetHourEvent
    | SetMinuteEvent;