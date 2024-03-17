import express from "express";
import dotenv from "dotenv";
import axios from "axios";

//using dotenv parameters
dotenv.config();



//add cross access code here 
//may be necessary, have had issues in the past with it.
//


const
    app = express(),
    port = process.env.PORT,
    apiKey = process.env.API_KEY;


app.use(express.json());
    

const
    getWeatherInformation = async () => {
        try {
             
        }
        catch (err) {
            console.log("Error retrieving weather data")
        }
    };


//only need to return data based on latitude and longitude
app
  .get("/:lat/:long", (req, res) => {

      //Grab openWeather data using axios
       
      

  });


//listen
app.listen(port);
