import Visualization from './features/visualization';
import TimeSetter from './features/time-setter';
import EventGenerator from './features/event-generator';
import BrightnessSetter from './features/brightness';
import './App.css';

export default function App() {
  return <>
    <Visualization />

    <BrightnessSetter />
    
    <div class="settings-grid">
      <TimeSetter />
      <EventGenerator />
    </div>
  </>;
}
