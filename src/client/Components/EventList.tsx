import * as React from "react";
import { Event } from "../../common/Event"
import { Collapse, Colors } from "@blueprintjs/core"
import { EventDetails } from "./EventDetails"
import * as Util from "../Util"


export interface EventListProps {
    events: Event[];
    selectedItem: number
    onAddClick: (index: number) => void;
    onRemoveClick?: (index:number) => void;
    onItemClick: (index: number) => void;
    addableItems: boolean
    removableItems?:boolean
    createItem?: (props: EventListProps) => (e: Event, i: number) => JSX.Element
}
export function EventList(props: EventListProps) {
    let create = (e: Event, i: number) => {
        return <div>
            <EventListItem
                event={e}
                onAddClick={props.onAddClick}
                onItemClick={props.onItemClick}
                index={i}
                open={i == props.selectedItem}
                addable={props.addableItems}
                removable={props.removableItems}
                style={{ "background-color": Colors.LIGHT_GRAY5 }}

            />
            <hr />
        </div>
    }

    if (props.createItem) {
        create = props.createItem(props)
    }

    var elements = props.events.map(create);

    return <div className="rowList" style={{ height: "500px" }}>{elements}</div>

}


export interface EventListItemProps {
    event: Event
    index: number
    open: boolean
    addable: boolean
    removable?: boolean
    onRemoveClick?: (index:number) => void
    style?: {}
    onAddClick: (index: number) => void;
    onItemClick: (index: number) => void
}
export interface EventListItemState {
}

export class EventListItem extends React.Component<EventListItemProps, EventListItemState>
{
    constructor(props: EventListItemProps) {
        super(props)
        this.state = { open: false };
    }

    handleClick = (handler: (index: number) => void) => {
        return () => handler(this.props.index)
    }



    render() {
        var style = {};
        if (this.props.style !== undefined) {
            style = this.props.style;
        }
        return (
            <div className={"pt-card pt-interactive eventListItem"} style={style} onClick={this.handleClick(this.props.onItemClick)}>
                <div className="pt-ui-text-large">{this.props.event.title}</div>
                <div className="pt-ui-text">{Util.dateSpanToString(this.props.event.startDate, this.props.event.endDate)}</div>
                <Collapse isOpen={this.props.open}>
                    <EventDetails onRemoveClick = {this.handleClick(this.props.onRemoveClick)} showRemoveButton = {this.props.removable} showAddButton={this.props.addable} event={this.props.event} index={this.props.index} onAddClick={this.handleClick(this.props.onAddClick)} />
                </Collapse>
            </div>)
    }
}