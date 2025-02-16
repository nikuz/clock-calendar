import { createMemo, Accessor } from 'solid-js';
import { settingsMachineActor } from '../../state';
import { SettingsStateContext } from '../../types';

export function useSettingsStateSelect<K extends keyof SettingsStateContext>(key: K): Accessor<SettingsStateContext[K]> {
    /* eslint-disable-next-line solid/reactivity */
    return createMemo(() => settingsMachineActor.context[key]);
}