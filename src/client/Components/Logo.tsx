import * as React from "react"
require('../public/logo-big.svg')
require('../public/logo.svg')

export function LogoSmall() {
    return <a href = "index.html"><img src="logo.svg" /></a>
}
export function Logo() {
    return <a href ="index.html" style = {{margin:"auto"}}><img src="logo-big.svg" style={{ transform: "scale(0.75,0.75)"}} /></a>
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
    return (<div className="eventVeiw" style={{margin:"auto"}}>
        <Eventful />
    </div>)

}

export function Header() {
    return (
        <div style = {{display:"flex", flexDirection:"column"}}> 
            <Logo/>
            <Navbar/>
        </div>
    )
}
export function Navbar() {
    return (
        <div style={{display:"flex", flexDirection:"row", margin: "auto"}}>
            <a href = "index.html" style = {{margin:"10px"}}>Home</a><a href = "about.html" style = {{margin:"10px"}}>About</a>
        </div>
    )
}