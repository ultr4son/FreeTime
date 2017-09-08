import * as express from "express";
import * as Settings from "../common/Settings"
import {GoogleAuth, authenticated, logout} from "./Routes/auth"
import * as morgan from "morgan"
import * as expressSession from "express-session"
import * as bodyParser from "body-parser"
import * as api from "./Routes/ServerAPI"


var app = express();

var googleAuth = new GoogleAuth();


app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "sntaoehstneoambrjblrc,a.buircloeaburceoabjlcroeabilrscao"
})
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static("./dist/client/public"));

app.use(morgan("combined"))


googleAuth.init().then(() => {
    app.get("/api/user/events/list", api.getUserEvents);    
    app.post("/api/user/events", api.postUserEvent);
    app.get("/api/events/list", api.getLocalEvents);
 
    app.get("/auth/google", googleAuth.authUser);
    app.get("/auth/authenticated", authenticated)
    app.get("/loginCallback", googleAuth.loginCallback);
    app.post("/auth/logout", logout);

    app.listen(Settings.PORT, () =>
    {
        console.log("Listening on " + Settings.PORT)
    });

});




