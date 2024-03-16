import express from "express";
import dotenv from "dotenv";


//using dotenv parameters
dotenv.config();



//add cross access code here
//
//


const app = express();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;


app.use(express.json());

//add routes



//listen
app.listen(port);
