import { Event } from "../../common/Event"
import * as Promise from "bluebird"

export type CalendarInit = Promise<CalendarManager>

export interface CalendarManager {
    getEvents: (from?: Date, to?: Date) => Promise<Event[]>;
    putEvent: (event: Event) => Promise<void>;
    removeEvent: (id:string) => Promise<void>;
}