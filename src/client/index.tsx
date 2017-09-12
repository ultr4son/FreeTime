import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppPage } from "./Components/AppPage"
import { EventVeiw } from "./Components/EventView"
require('./public/index.html');
require('./public/index.css')
require('./public/favicon.ico')
require('./public/memphis-colorful.png')
require('../../node_modules/@blueprintjs/core/dist/blueprint.css')
require('../../node_modules/normalize.css/normalize.css')
require('../../node_modules/@blueprintjs/core/resources/icons/icons-16.ttf')
require('../../node_modules/@blueprintjs/core/resources/icons/icons-16.woff')



interface AppState {

}
class App extends React.Component<{}, AppState>
{
    constructor() {
        super()
        this.state = {}
    }
    render() {

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <AppPage>
                        <EventVeiw />
                    </AppPage>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("root"))