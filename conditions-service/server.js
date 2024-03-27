import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { 
    authenticate,
    getWeather
} from "./controllers/conditionsController.js";

//using dotenv parameters
dotenv.config();

const
    app = express(),
    port = process.env.PORT || 8080;

//setup express / cors
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//only need to return data based on latitude and longitude
app
    .get("/:lat/:long", async (req, res) => {
        //verify that user making request is signed in 
        const
            user = await authenticate(req, res); 

        getWeather(user, req, res);
  });


//listen
app.listen(port);
console.log("listening on port" + port);
