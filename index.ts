import express from "express";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { Config } from "./config/config";


dotEnv.config();

//setting up express app
const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

//TODO: initialize routes
app.use("/api", require("./routers/roleRouter"));


//listening for requests 
const PORT = Config.PORT || 3000;
const HOST = "0.0.0.0"

app.listen(PORT, HOST, () => {
    console.log(`server running on port ${Config.PORT} and host ${HOST}`);
});

//error handling error
app.use(function (err: any, res: any) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {},
    });
});