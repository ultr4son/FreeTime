import * as React from "react"
import { Logo, Footer } from "./Logo"

export interface AppPageProps {
}
export class AppPage extends React.PureComponent {
    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Logo />
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        )
    }
}