import { useMachine } from '@xstate/solid';
import { settingsMachine } from './state';
import Visualization from './features/visualization';
import TimeSetter from './features/time-setter';
import './App.css';

export default function App() {
  const [{ context: settingsContext }, settingsSend] = useMachine(settingsMachine);

  return <>
    <Visualization
      settingsContext={settingsContext}
      settingsSend={settingsSend}
    />
    <TimeSetter
      settingsContext={settingsContext}
      settingsSend={settingsSend}
    />
  </>;
}
