import * as React from "react"
import { Footer, Header } from "./Logo"

export interface AppPageProps {
}
export class AppPage extends React.PureComponent {
    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Header/>
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        )
    }
}