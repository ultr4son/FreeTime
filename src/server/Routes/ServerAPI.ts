import { Request, Response } from "express"
import * as State from "../State"
import * as Settings from "../../common/Settings"
import {Event} from "../../common/Event"

function strToDate(time: any) {
    let date = new Date();
    date.setTime(Number.parseInt(time));
    return date;
}


export function postUserEvent(req:Request, res:Response) {
    if(req.sessionID && State.sessions[req.sessionID]) {
        let manager = State.sessions[req.sessionID];
        
        let toAdd:Event = req.body;
        toAdd.startDate = strToDate(toAdd.startDate);

        toAdd.endDate = strToDate(toAdd.endDate)

        manager.putEvent(toAdd)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {

            res.sendStatus(500)
        })
    
        
    } else {
        res.sendStatus(401);
    }
}

export function getUserEvents(req: Request, res: Response) {

    if (req.sessionID && State.sessions[req.sessionID]) {
        let from: string = req.query.from;
        let fromDate: Date;
        if (from) {
            fromDate = strToDate(from);
        }
        
        let to: string = req.query.to;
        let toDate: Date;
        if (to) {
            toDate = strToDate(to);
        }
    
        let manager = State.sessions[req.sessionID];
        manager.getEvents(fromDate, toDate)
            .then(events => {
                res.send(events)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })

    } else {
        res.sendStatus(401);
    }
}

export function getLocalEvents(req: Request, res: Response) {
    let lat = req.query.lat;
    let long = req.query.long;

    let from: string = req.query.from;
    let fromDate: Date;
    if (from) {
        fromDate = strToDate(from);
    }

    let to: string = req.query.to;
    let toDate: Date;
    if (to) {
        toDate = strToDate(to);
    }
    Settings.userEventManager
        .then(manager => {
            manager.getEvents(lat, long, fromDate, toDate)
                .then(events => res.send(events))
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })

}