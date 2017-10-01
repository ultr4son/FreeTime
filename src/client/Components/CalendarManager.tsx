import * as React from "react"
import { Event } from "../../common/Event"
import { EventList, EventListProps, EventListItem } from "./EventList"
import { Colors } from "@blueprintjs/core"


export interface CalendarManagerProps {
    toAdd: Event
    events: Event[]
    onRemove: (index:number) => void
}
export interface CalendarManagerState {
    selected: number
}
export class CalendarManager extends React.Component<CalendarManagerProps, CalendarManagerState> {
    constructor(props: CalendarManagerProps) {
        super(props);
        this.state = { selected: null }
    }

    componentWillMount() {

    }
    onEventListItemClick = (index: number) => {
        if (index == this.state.selected) {
            this.setState({ selected: null });
        }
        else {
            this.setState({ selected: index });
        }
    }

    render() {
        var totalEvents = this.props.events;
        var create =(props: EventListProps) => (e: Event, i: number): JSX.Element => {
            var style: any = { "background-color": Colors.LIGHT_GRAY5 }
            return <div>
                <EventListItem
                    event={e}
                    onAddClick={props.onAddClick}
                    onItemClick={props.onItemClick}
                    onRemoveClick = {props.onRemoveClick}
                    index={i}
                    open={i == props.selectedItem}
                    addable={props.addableItems}
                    style={style}
                    removable = {true}
                />
                <hr />
            </div>
        } ;
        if (this.props.toAdd) {
            totalEvents = this.props.events.concat([this.props.toAdd]).sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
            var addIndex = totalEvents.findIndex(v => v.startDate == this.props.toAdd.startDate && v.endDate == this.props.toAdd.endDate);

            create = (props: EventListProps) => (e: Event, i: number): JSX.Element => {
                var style: any = { "background-color": Colors.LIGHT_GRAY5 }
                if (i == addIndex) {
                    style["border-color"] = Colors.BLUE2;
                    style["border-style"] = "dashed";
                    style["border-width"] = "1px";
                }
                return <div>
                    <EventListItem
                        event={e}
                        onAddClick={props.onAddClick}
                        onItemClick={props.onItemClick}
                        index={i}
                        open={i == props.selectedItem}
                        addable={props.addableItems}
                        style={style}
                        removable = {i != addIndex}
                        onRemoveClick = {props.onRemoveClick}
                    />
                    <hr />
                </div>
            }
        }
        return <EventList onRemoveClick = {this.props.onRemove} addableItems={false} events={totalEvents} onAddClick={() => { }} onItemClick={this.onEventListItemClick} selectedItem={this.state.selected} createItem={create} />
    }
}
