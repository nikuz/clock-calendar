import { CalendarEvent } from 'src/types';

export function EventListItem(props: CalendarEvent) {
    return (
        <li class="event-list-item">
            <span class="event-list-item-color" style={{ background: props.color }} />
            {props.summary}
        </li>
    );
}