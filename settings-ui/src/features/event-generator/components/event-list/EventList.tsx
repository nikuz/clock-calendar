import { For } from 'solid-js';
import { useSettingsStateSelect } from 'src/state';
import { EventListItem } from './EventItem';
import './style.css';

export function EventsList() {
    const events = useSettingsStateSelect('events');
    
    return (
        <ul class="event-list">
            <For each={events()}>
                {(item) => <EventListItem {...item} />}
            </For>
        </ul>
    );
}