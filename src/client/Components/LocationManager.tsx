import * as React from "react"
import { MapDropdown } from "./MapDropdown"
import {Spinner} from "@blueprintjs/core"

export interface LocationManagerProps {
    onLocationGet: (location: {latitude:string, longitude:string}) => void
}

export interface LocationManagerState {
    geolocationAllowed: boolean
}

export class LocationManager extends React.Component<LocationManagerProps, LocationManagerState> {
    constructor(props: LocationManagerProps) {
        super(props);
        this.state = { geolocationAllowed: true };
    }
    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.props.onLocationGet({latitude: pos.coords.latitude.toString(), longitude: pos.coords.longitude.toString()});
            }, (err) => {
                this.setState({geolocationAllowed: false})
            })
        }
        else {
            this.setState({geolocationAllowed: false})
        }

    }
    render() {
        if(this.state.geolocationAllowed) {
            return <Spinner/>
        } else {
            return <MapDropdown onConfirm = {this.props.onLocationGet} />
        }
    }
}