import * as React from "react"
import Geosuggest from "react-geosuggest"
import {Suggest} from "react-geosuggest"

export interface MapDropdownProps {
    onConfirm: (value: {latitude: string, longitude:string}) => void
}
export function MapDropdown(props: MapDropdownProps) {
    let onSuggestSelect = (suggest:Suggest) => {
        props.onConfirm({
                latitude: suggest.location.lat,
                longitude: suggest.location.lng
        })
    }
    return <Geosuggest 
        onSuggestSelect={onSuggestSelect} 
        placeholder={"Please enter location"}
        />
}