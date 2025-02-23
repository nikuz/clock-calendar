import { onMount } from 'solid-js';
import { settingsMachineActor } from 'src/state';
import { timeUtils, ledUtils } from 'src/utils';
import { CalendarEvent } from 'src/types';
import { EventsList } from './components';
import { EVENT_COLORS } from './constants';
import './style.css';

export default function EventGenerator() {
    const generateEventsHandler = () => {
        const events: CalendarEvent[] = [];
        const eventChunkSize = 15; // 15 minutes
        let dayStartTime = 8 * 60; // 8 AM
        let dayEndTime = 18 * 60; // 6 PM
        let currentTime = dayStartTime;
        let eventIndex = 0;

        while (currentTime < dayEndTime) {
            const eventLength = Math.round(Math.random() * (8 - 1) + 1);
            const afterEventRest = Math.round(Math.random() * (2 - 1) + 1);
            const startTime = currentTime;
            const endTime = currentTime + (eventLength * eventChunkSize);

            events.push({
                summary: timeUtils.formatTimeRange(startTime, endTime),
                startTime,
                endTime,
                startLedIndex: ledUtils.getLedIndexFromTime(startTime),
                endLedIndex: ledUtils.getLedIndexFromTime(endTime, false),
                color: EVENT_COLORS[eventIndex],
            });
            
            currentTime = endTime + (afterEventRest * eventChunkSize);
            eventIndex++;
        }

        settingsMachineActor.send({
            type: 'SET_EVENTS',
            events,
        });
    };

    onMount(() => {
        generateEventsHandler();
    });

    return (
        <div>
            <div class="events-generator-title-wrapper">
                <h2>Events</h2>
                <span class="events-generator-dash">
                    &mdash;
                </span>
                <button class="events-generator-btn" onClick={generateEventsHandler}>
                    Generate
                </button>
            </div>

            <EventsList />
        </div>
    );
}