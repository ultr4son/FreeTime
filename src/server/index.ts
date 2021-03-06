import * as express from "express";
import * as Settings from "../common/Settings"
import {GoogleAuth, authenticated, logout} from "./Routes/auth"
import * as morgan from "morgan"
import * as expressSession from "express-session"
import * as bodyParser from "body-parser"
import * as api from "./Routes/ServerAPI"
//import * as FileStore from "session-file-store"
var FileStore = require("session-file-store")(expressSession);

var app = express();

var googleAuth = new GoogleAuth();


app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "sntaoehstneoambrjblrc,a.buircloeaburceoabjlcroeabilrscao",
    store: new FileStore
})
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static("./dist/client/public"));

app.use(morgan("combined"))


googleAuth.init().then(() => {
    app.get("/api/user/events/list", api.getUserEvents);    
    app.post("/api/user/events", api.postUserEvent);
    app.post("/api/user/events/remove", api.postRemoveEvents);
    app.get("/api/events/list", api.getEvents);
 
    app.get("/auth/google", googleAuth.authUser);
    app.get("/auth/authenticated", authenticated)
    app.get("/loginCallback", googleAuth.loginCallback);
    app.post("/auth/logout", logout);

    app.listen(process.env.PORT || Settings.PORT, () =>
    {
        console.log("Listening on " + process.env.PORT || Settings.PORT)
    });

});




