import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import globalRoute from "./routes/global.route.js";
import reponseRoute from "./routes/reponse.route.js";
import dilemmeContextualiseRoute from "./routes/dilemme_contextualise.route.js";
import dilemmeDefautRoute from "./routes/dilemme_defaut.route.js";
import contexteRoute from "./routes/contexte.route.js";
import authRoute from "./routes/auth.route.js";
import statistiqueRoute from "./routes/statistique.route.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import session from "express-session";

const app = express();
const rootdirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path: "./config/.env"});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24* 7,
        secure: false
    },
}));

app.use((req, res, next) => {
    const {login} = req.session;
    if (login) {
        res.locals.login = req.session.login;
    }
    next();
});

app.use(
    "/public/css",
    express.static(join(rootdirname, "node_modules/bootstrap/dist/css"))
)
app.use(
    "/public/js",
    express.static(join(rootdirname, "node_modules/bootstrap/dist/js"))
)
app.use("/public/js", express.static(join(rootdirname, "node_modules/jquery/dist")))
app.use(express.static(join(rootdirname, 'public')));

app.use(userRoute);
app.use(globalRoute);
app.use(reponseRoute);
app.use(dilemmeContextualiseRoute);
app.use(dilemmeDefautRoute);
app.use(contexteRoute);
app.use(authRoute);
app.use(statistiqueRoute);


const start = () => {
    try {
        app.listen(process.env.PORT,  () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();