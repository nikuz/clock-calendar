import Visualization from './features/visualization';
import TimeSetter from './features/time-setter';
import EventGenerator from './features/event-generator';
import BrightnessSetter from './features/brightness';
import { useSettingsStateSelect } from './state';
import { colorUtils } from './utils';
import { BACKGROUND_COLOR } from './constants';
import './App.css';

export default function App() {
  const brightness = useSettingsStateSelect('brightness');
  
  return (
    <div
      class="content"
      style={{
        background: colorUtils.hexToRgba(BACKGROUND_COLOR, brightness() / 100),
      }}
    >
      <Visualization />

      <BrightnessSetter />

      <div class="settings-grid">
        <TimeSetter />
        <EventGenerator />
      </div>
    </div>
  );
}
