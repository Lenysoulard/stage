import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import globalRoute from "./routes/global.route.js";

const app = express();

dotenv.config({path: "./config/.env"});

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(userRoute);
app.use(globalRoute);

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