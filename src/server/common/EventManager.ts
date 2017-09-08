import {Event} from "../../common/Event"
import * as Promise from "bluebird"

export type EventInit = Promise<EventManager>

export interface EventManager {
    getEvents(lat:string, long:string, from:Date, to:Date):Promise<Event[]>;

}