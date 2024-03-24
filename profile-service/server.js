import express from "express";
import dotenv from "dotenv";
import { authenticate, getProfile } from "./controller/profileController.js"


dotenv.config()

const port = process.env.PORT;
const app = express();


app.use(express.json());



//get profile info
app.get("/profileInfo", async (req, res) => {
    
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    getProfile(user, req, res);
});


app.listen(port, () => {
    console.log("lisenting on port " + port);
})
