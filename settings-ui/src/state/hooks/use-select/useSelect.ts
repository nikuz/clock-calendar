import { createRoot, createMemo, Accessor } from 'solid-js';
import { fromActorRef } from '@xstate/solid';
import { settingsMachineActor } from '../../state';
import { SettingsStateContext } from '../../types';

const snapshot = createRoot(() => fromActorRef(settingsMachineActor));

export function useSettingsStateSelect<K extends keyof SettingsStateContext>(key: K): Accessor<SettingsStateContext[K]> {
    /* eslint-disable-next-line solid/reactivity */
    return createMemo(() => snapshot().context[key]);
}