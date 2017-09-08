import {EventManager, EventInit} from "./EventManager"
import {Event} from "../../common/Event"
import * as Promise from "bluebird"

export let getEvent = (events:Event[]) => (location:string):Promise<Event[]> => {
    return Promise.resolve(events);
}

export let getDummyManager = (events:Event[]):EventInit => {
    return Promise.resolve({
        getEvents: getEvent(events)
    } as EventManager)
}