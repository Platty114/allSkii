import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { 
    authenticate, 
    getProfile, 
    updateName,
    updatePassword
} from "./controller/profileController.js"


dotenv.config()

const port = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cors());


//get profile info
//requies users email in body
// { email: example@gmail.com }
app.get("/profile/:email", async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await getProfile(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    }
});

//update a user accounts first and lastname
app.put("/updateNames", async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await updateName(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    }
});

//update a user accounts password
app.put("/updatePassword", async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await updatePassword(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    }
})




app.listen(port, () => {
    console.log("lisenting on port " + port);
})
