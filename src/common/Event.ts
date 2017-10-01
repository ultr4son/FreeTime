/**
 * Representation of an event to be shown to the user.
 * Not the javascript kind.
 */
export interface Event
{
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    url: string;
    cost: string;
    id:string;
}

/**
 * Event sent over the network. startDate and endDate are commonly milliseconds since epoch
 */
export interface SendEvent {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    url: string;
    cost: string;
    id:string;


}