import * as React from "react"

export function LogoSmall() {
    return <img src="logo.svg" style = {{margin: "10 auto"}} />
}
export function Logo() {
    return <img src="logo-big.svg" style = {{margin: "10 auto"}} />
}

export function Bottom() {
    return <div> <div className="eventful-badge eventful-small">
        <img src="http://api.eventful.com/images/powered/eventful_58x20.gif"
            alt="Local Events, Concerts, Tickets" />
        <p><a href="http://eventful.com/">Events</a> by Eventful</p>
    </div> </div>

}