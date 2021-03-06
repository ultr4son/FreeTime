import * as React from "react"
import { Event } from "../../common/Event"
import { EventList } from "./EventList"
import { CalendarPicker } from "./CalendarPicker"
import { CalendarManager } from "./CalendarManager"
import { LocationManager } from "./LocationManager"
import * as request from "request-promise"
import * as blueprint from "@blueprintjs/core"


export interface EventVeiwState {
    events: Event[]
    userEvents: Event[]
    selectedEvent: number
    authenticated: boolean
    userEventsLoading: boolean
    eventsLoading: boolean
    location: { latitude: string, longitude: string }
}

export interface EventVeiwProps {

}

export class EventVeiw extends React.Component<EventVeiwProps, EventVeiwState>
{
    readonly topToaster = new blueprint.Toaster({position: blueprint.Position.TOP})
    readonly redirect: { [name: string]: string } = {
        "Google": "/auth/google"
    }

    constructor(props: EventVeiwProps) {
        super(props);
        this.state = { location: null, userEventsLoading: true, eventsLoading: true, events: [], userEvents: [], selectedEvent: null, authenticated: false }
    }
    _strToDate = (events: Event[]) => {
        return events.map(e => {
            e.startDate = new Date(e.startDate);
            e.endDate = new Date(e.endDate);
            return e;
        })
    }
    onPickerOptionClick = (name: string) => {
        location.href = this.redirect[name] || location.href
    }

    componentWillMount() {
        request(location.origin + "/auth/authenticated")
            .then(auth => {
                var authenticated = auth == "true"
                if (authenticated) {
                    this.getUserEvents();
                }
                this.setState({ authenticated: authenticated })
            })
            .catch(() => {
                this.topToaster.show({
                    intent: blueprint.Intent.DANGER,
                    message: "Could not authenticate."
                })
            })
    }

    intersects(a: Event, b: Event) {
        var sects = a.startDate.getTime() <= b.startDate.getTime() && a.endDate.getTime() >= b.startDate.getTime()
            || a.startDate.getTime() <= b.endDate.getTime() && a.endDate.getTime() >= b.endDate.getTime()
        return sects;
    }

    getUserEvents() {
        var qs: any = { from: new Date().getTime() }
        return request(location.origin + "/api/user/events/list", { qs: qs })
            .then(response => JSON.parse(response))
            .then(this._strToDate)
            .then(events => {
                this.setState({ userEvents: events, userEventsLoading: false })
                this.filterEvents();
            })
            .catch(() => {
                this.topToaster.show({
                    intent: blueprint.Intent.DANGER,
                    message: "Could not get user's events."
                })
            })

    }

    filterEvents() {
        var filteredEvents = this.state.events.filter(event => {
            let f = (u: Event) => {
                return this.intersects(u, event)
            }
            return !this.state.userEvents.some(f);
        })
        this.setState({ events: filteredEvents })
    }

    getEvents(place: { latitude: string, longitude: string }) {

        return request(location.origin + "/api/events/list", { qs: { lat: place.latitude, long: place.longitude, from: new Date() } })
            .then(response => JSON.parse(response))
            .then(this._strToDate)
            .then(events => {
                this.setState({ events: events, eventsLoading: false });
            })
            .catch(() => {
                this.topToaster.show({
                    intent:blueprint.Intent.DANGER,
                    message: "Could not get events."
                })
    
            })
    }

    onAdd = (index: number) => {
        var addedEvent: Event = this.state.events[index];
        var toSend: any = {
            cost: addedEvent.cost,
            description: addedEvent.description,
            endDate: addedEvent.endDate.getTime(),
            startDate: addedEvent.startDate.getTime(),
            location: addedEvent.location,
            title: addedEvent.title,
            url: addedEvent.url
        }
        request(location.origin + "/api/user/events", { method: "POST", body: toSend, json: true })
            .then(() => {
                this.topToaster.show({
                    intent: blueprint.Intent.SUCCESS,
                    message: "Event added!"
                })
                this.getUserEvents()
            })
            .catch(() => {
                this.topToaster.show({
                    intent: blueprint.Intent.DANGER,
                    message: "Could not add event."
                })
            })
    }

    onRemove = (index:number) => {
        var event = this.state.userEvents[index];
        let fail = () => {
            this.topToaster.show({
                intent:blueprint.Intent.DANGER,
                message: "Could not remove event."
            })
        }
        if(event.id) {
            request(location.origin + "/api/user/events/remove", {method: "POST", body: {id: event.id}, json: true})
            .then(() => {
                this.topToaster.show({
                    intent: blueprint.Intent.SUCCESS,
                    message: "Removed event."
                })
            }).catch(fail)
        } else {
            fail();
        }
    }

    onEventListItemClick = (index: number) => {
        if (index == this.state.selectedEvent) {
            this.setState({ selectedEvent: null });
        }
        else {
            this.setState({ selectedEvent: index });
        }
    }

    onPlaceChange = (place: { latitude: string, longitude: string }) => {
        this.getEvents(place)
            .then(() => this.setState({ location: place }))

    }

    onChangeLocationClick = () => {
        this.setState({ location: null })
    }

    onLogoutClick = () => {
        request(location.origin + "/auth/logout", { method: "POST" })
            .finally(() => {
                this.setState({ authenticated: false })
            })
    }

    render() {
        var eventsVeiw;
        if (!this.state.location) {
            eventsVeiw = <LocationManager onLocationGet={this.onPlaceChange} />
        } else {
            if (this.state.eventsLoading) {
                eventsVeiw = <div style={{ display: "table", margin: "auto" }}><blueprint.Spinner /></div>
            } else {
                eventsVeiw = <EventList addableItems = {this.state.authenticated} events={this.state.events} onAddClick={this.onAdd} onItemClick={this.onEventListItemClick} selectedItem={this.state.selectedEvent} />
            }
        }


        var userEventsVeiw;
        if (this.state.authenticated) {
            if (this.state.userEventsLoading) {
                userEventsVeiw = <div style={{ display: "table", margin: "auto" }}><blueprint.Spinner /></div>
            } else {
                userEventsVeiw = <CalendarManager onRemove = {this.onRemove} events={this.state.userEvents} toAdd={this.state.events[this.state.selectedEvent]} />
            }

        } else {
            userEventsVeiw = <CalendarPicker options={Object.keys(this.redirect)} onOptionClick={this.onPickerOptionClick} />
        }

        return (
            <div className="eventVeiw" style={{ margin: "auto", width:"80%" }}>
                <div className="pt-card flexUiElement primaryUiElement">
                    <h4>Events</h4>
                    <hr />
                    {eventsVeiw}
                    {this.state.location && !this.state.eventsLoading &&<button className="pt-button" style={{margin: "10px"}} onClick={this.onChangeLocationClick}>Change Location</button>}

                </div>
                <div className="pt-card flexUiElement primaryUiElement">
                    <h4>Your Events</h4>
                    <hr />
                    {userEventsVeiw}
                    {this.state.authenticated && !this.state.userEventsLoading && <button className="pt-button" style={{margin: "10px"}} onClick={this.onLogoutClick}>Logout</button>}
                </div>
            </div>
        )

    }
}