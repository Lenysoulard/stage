import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import globalRoute from "./routes/global.route.js";
import reponseRoute from "./routes/reponse.route.js";
import dilemmeContextualiseRoute from "./routes/dilemme_contextualise.route.js";
import dilemmeDefautRoute from "./routes/dilemme_defaut.route.js";

const app = express();

dotenv.config({path: "./config/.env"});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(userRoute);
app.use(globalRoute);
app.use(reponseRoute);
app.use(dilemmeContextualiseRoute);
app.use(dilemmeDefautRoute);

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