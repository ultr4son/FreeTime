import * as React from "react";


export interface CalendarPickerProps
{
    options:string[]
    onOptionClick:(option:string) => void
}

export class CalendarPicker extends React.Component<CalendarPickerProps, {}>
{
    constructor(props:CalendarPickerProps)
    {
        super(props);
    }
    optionClick = (name:string) =>
    {
        return () =>
        {
            this.props.onOptionClick(name);
        }
    }
    render()
    {
        
        var elements = this.props.options.map(o => <button type = "button" className = "pt-button flexUiElement" onClick = {this.optionClick(o)}>{o}</button>);
        
        const style =
        {
            "justify-content":"center"
        }
        return (
            <div className = "rowList eventList" style = {style}>
                <h3>Pick a calendar method</h3>
                {elements}
            </div>
        )

    }

}