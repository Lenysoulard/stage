import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import globalRoute from "./routes/global.route.js";
import reponseRoute from "./routes/reponse.route.js";
import dilemmeContextualiseRoute from "./routes/dilemme_contextualise.route.js";
import dilemmeDefautRoute from "./routes/dilemme_defaut.route.js";
import contexteRoute from "./routes/contexte.route.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const rootdirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({path: "./config/.env"});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.raw({
    type: 'application/json', 
    limit: '1mb'
}));

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

const start = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();