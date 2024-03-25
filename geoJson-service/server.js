import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
    authenticate,
    getAllGeoJson,
    getGeoJsonBySkiHill,
} from "./controllers/geoJsonController.js"

//using dotenv parameters
dotenv.config();

const
    app = express(),
    port = process.env.PORT;


app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS

    
//only need to return data based on latitude and longitude
app
    .get("/", async (req, res) => {
        //verify that user making request is signed in 
        const
            user = await authenticate(req, res); 

        getAllGeoJson(user, req, res); 
  });



app
    .get("/runs/:hillName", async (req, res) => {
        //verify that user making request is signed in 
        const
            user = await authenticate(req, res); 

        getGeoJsonBySkiHill(user, req, res);
});


//listen
app.listen(port);
console.log("listening on port" + port);
