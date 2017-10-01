import { getDummyManager } from "../server/common/DummyEventManager"
import { Event } from "./Event"
export const PORT = 3000;

var testEvents = []
for (var i = 0; i < 24; i++) {
   
    var startDate = new Date();
    startDate.setHours(i);

    var endDate = new Date();
    endDate.setHours(i + 1)
   
    var event: Event = {
        cost: i.toString(),
        description: "Oh wow " + i,
        endDate: endDate,
        startDate: startDate,
        location: "Here",
        title: "Cool event " + i,
        url: "www.wow.com",
        id: ""
    }
    testEvents.push(event);
}

export let eventManager = getDummyManager(testEvents)