import * as React from "react"
require('../public/logo-big.svg')
require('../public/logo.svg')

export function LogoSmall() {
    return <img src="logo.svg" />
}
export function Logo() {
    return <img src="logo-big.svg" style={{ transform: "scale(0.75,0.75)", margin: "auto" }} />
}

export function Eventful() {

    return (
        <div className="eventful-badge eventful-small" >
            <img src="http://api.eventful.com/images/powered/eventful_58x20.gif"
                alt="Local Events, Concerts, Tickets" />
            <p><a href="http://eventful.com/">Events</a> by Eventful</p>
        </div>
    )
}

export function Footer() {
    return (<div className="eventVeiw">
        <Eventful />
    </div>)

}