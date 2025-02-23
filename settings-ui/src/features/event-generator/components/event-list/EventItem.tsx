import { CalendarEvent } from 'src/types';
import { settingsMachineActor } from 'src/state';

interface Props extends CalendarEvent {
    index: number,
}

export function EventListItem(props: Props) {
    const mouseEnterHandler = () => {
        settingsMachineActor.send({
            type: 'SET_ACTIVE_EVENT',
            index: props.index,
        });
    }

    const mouseLeaveHandler = () => {
        settingsMachineActor.send({ type: 'CLEAR_ACTIVE_EVENT' });
    }

    return (
        <li>
            <div
                class="event-list-content"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                <span class="event-list-item-color" style={{ background: props.color }} />
                <span class="elc-summary">
                    {props.summary}
                </span>
            </div>
        </li>
    );
}