import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppPage } from "./Components/AppPage"
require("./public/about.html")


function AboutBody() {
    return (
        <div style = {{margin:"10px auto", width: "80%"}}>
            <h2>About Freetime</h2>
            <div className="pt-text">
                FreeTime is a simple web application that allows you to simplify finding and adding events to your calendar. Events that conflict with your current schedule are automatically removed and events you are interested in can be easily added to your calendar.
            </div>
            <h2>About Me</h2>
            <div className="pt-text">
                My name is Tristan Thompson, and I am a college sophomore at <a href = "http://oregonstate.edu">OSU</a>. I am very excited about programming and fill my spare time with projects like this one.
            </div>
        </div>
    )
}

function About() {
    return (
    <AppPage>
        <div className="pt-card">
            <AboutBody />
        </div>
    </AppPage>
    )
}

ReactDOM.render(<About />, document.getElementById("root"))