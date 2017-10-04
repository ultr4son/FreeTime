var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

import { Request, Response } from "express"

import * as State from "../State"
import * as calendar from "../common/GoogleCalendarManager"



export function authenticated(req:Request, res:Response) {
    res.send(State.sessions[req.sessionID] !== undefined);
} 

export function logout(req:Request, res:Response) {
    if(req.sessionID && State.sessions[req.sessionID]) {
        req.session.destroy(err => {
            console.log(err)
        })
        delete State.sessions[req.sessionID];
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
    
}

export class GoogleAuth {

    oauth2Client: any;
    constructor() {
       
    }
    public init() {
        // return readFile("client_secret.json")
        // .then(file => JSON.parse(file.toString()))
        // .then(clientSecret => {
            
        //     this.oauth2Client = new OAuth2(
        //         //clientSecret.web.client_id,
        //         //clientSecret.web.client_secret,
        //         "http://localhost:3000/loginCallback"
        //     );
        // })
        this.oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "http://localhost:3000/loginCallback"
        )

    }
    public readonly authUser = (req: Request, res: Response) => {
        // generate a url that asks permissions for Google Calendar scope
        // var scopes = [
        //     'https://www.googleapis.com/auth/calendar',
        // ];

        var url = this.oauth2Client.generateAuthUrl({
            // If you only need one scope you can pass it as a string
            scope: "https://www.googleapis.com/auth/calendar",
            access_type: "offline"

            // Optional property that passes state parameters to redirect URI
            // state: { foo: 'bar' }
        });
        res.redirect(url);

    }

    public readonly loginCallback = (req: Request, res: Response) => {
        var code = req.query.code;
        this.oauth2Client.getToken(code, (err: any, tokens: any) => {
            // Now tokens contains an access_token and an optional refresh_token. Save them.
            if (!err) {
                console.log("we did it")
                this.oauth2Client.setCredentials(tokens);
                
                
                calendar.googleCalendar(this.oauth2Client).then((manager) => {
                    State.sessions[req.sessionID] = manager;
                }) 

                res.redirect("/")
            } else {
                console.log(err)
                res.redirect("/")
            }
        });

    }
}