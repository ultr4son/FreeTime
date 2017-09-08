/**
 * Representation of an event to be shown to the user.
 * Not the javascript kind.
 * TODO: use eventful definition.
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
}