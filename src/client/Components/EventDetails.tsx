import * as React from "react";
import {Event} from "../../common/Event"
import {Slideshow} from "./Slideshow"

export interface EventDetailsProps
{
    event:Event
    index:number
    showAddButton:boolean
    onAddClick:(e:React.SyntheticEvent<HTMLButtonElement>) => void
}
export function EventDetails(props:EventDetailsProps)
{
    return (
        <div className = "eventDetails">
            {props.event.cost && <div className = "pt-card eventListItem">{props.event.cost}</div>}
            {props.event.description && <div className = "pt-card eventListItem">{props.event.description}</div>}
            {props.event.url && <div className = "pt-card eventListItem"><a href = {props.event.url}>{props.event.url}</a></div>}
            <Slideshow/>
            {props.showAddButton && <button onClick = {props.onAddClick} type = "button" className = "pt-button pt-fill pt-intent-primary">Add</button>}
        </div>
    )
}