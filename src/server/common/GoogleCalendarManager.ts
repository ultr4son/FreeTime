import { CalendarInit } from "./CalendarManager"
import { Event } from "../../common/Event"
import * as Promise from "bluebird"
var google = require("googleapis");
var calendar = google.calendar("v3");

interface GoogleEvent {
    "kind": "calendar#event",
    "etag": string,
    "id": string,
    "status": string,
    "htmlLink": string,
    "created": Date,
    "updated": Date,
    "summary": string,
    "description": string,
    "location": string,
    "colorId": string,
    "creator": {
        "id": string,
        "email": string,
        "displayName": string,
        "self": boolean
    },
    "organizer": {
        "id": string,
        "email": string,
        "displayName": string,
        "self": boolean
    },
    "start": {
        "date": string,
        "dateTime": string,
        "timeZone": string
    },
    "end": {
        "date": string,
        "dateTime": string,
        "timeZone": string
    },
    "endTimeUnspecified": boolean,
    "recurrence": [
        string
    ],
    "recurringEventId": string,
    "originalStartTime": {
        "date": Date,
        "dateTime": Date,
        "timeZone": string
    },
    "transparency": string,
    "visibility": string,
    "iCalUID": string,
    "sequence": number,
    "attendees": [
        {
            "id": string,
            "email": string,
            "displayName": string,
            "organizer": boolean,
            "self": boolean,
            "resource": boolean,
            "optional": boolean,
            "responseStatus": string,
            "comment": string,
            "additionalGuests": number
        }
    ],
    "attendeesOmitted": boolean,
    "extendedProperties": {
        "private": {
            [key: string]: string
        },
        "shared": {
            [key: string]: string
        }
    },
    "hangoutLink": string,
    "gadget": {
        "type": string,
        "title": string,
        "link": string,
        "iconLink": string,
        "width": number,
        "height": number,
        "display": string,
        "preferences": {
            [key: string]: string
        }
    },
    "anyoneCanAddSelf": boolean,
    "guestsCanInviteOthers": boolean,
    "guestsCanModify": boolean,
    "guestsCanSeeOtherGuests": boolean,
    "privateCopy": boolean,
    "locked": boolean,
    "reminders": {
        "useDefault": boolean,
        "overrides": [
            {
                "method": string,
                "minutes": number
            }
        ]
    },
    "source": {
        "url": string,
        "title": string
    },
    "attachments": [
        {
            "fileUrl": string,
            "title": string,
            "mimeType": string,
            "iconLink": string,
            "fileId": string
        }
    ]
}

function getEvents(authClient: any) {
    return (from?: Date, to?: Date) => {
        return new Promise<Event[]>((resolve, reject) => {
            let params: any = {
                auth: authClient,
                calendarId: 'primary',
                maxResults: 250,
                singleEvents: true,
                orderBy: 'startTime'
            }
            if (from) {
                params.timeMin = from.toISOString();
            }
            if (to) {
                params.timeMax = to.toISOString();
            }
            calendar.events.list(params
                , (err: any, response: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        var events = response.items.map((event: any) => {
                            return {
                                startDate: event.start.dateTime,
                                endDate: event.end.dateTime,
                                location: event.location,
                                title: event.summary,
                                description: event.description,
                            }
                        });
                        resolve(events);
                    }
                });
        });


    }
}


function putEvent(authClient: any) {
    return (event: Event) => {
        return new Promise<any>((resolve, reject) => {
            calendar.events.insert({
                auth: authClient,
                calendarId: 'primary',
                resource: {
                    summary: event.title,
                    description: event.description,
                    start: {
                        dateTime: event.startDate.toISOString(),
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    },
                    end: {
                        dateTime: event.endDate.toISOString(),
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    },
                    location: event.location,
                } as GoogleEvent
            }, (err: any, evt: any) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(JSON.stringify(evt))
                    resolve(evt)
                }
            })
        })
    }
}

export function googleCalendar(authClient: any): CalendarInit {
    return Promise.resolve({
        putEvent: putEvent(authClient),
        getEvents: getEvents(authClient)
    });
}