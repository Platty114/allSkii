import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
    authenticate,
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
} from "./controller/reviewsController.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// adding entries
app.post('/create', async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await createReview(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    } 
});

// get all entries
app.get("/read/all", async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await getAllReviews(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    } 
});

// get one entry
app.get("/read/:id", async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await getReview(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    } 
});

// update entry
// MAY NEED ID FOR EACH ENTRY TO MAKE THIS WORK < TO DO
app.post('/update', async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await updateReview(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    } 
});

// delete entry
app.delete('/delete/:id', async (req, res) => {
    //verify that request is authenticated
    const
        user = await authenticate(req);
    
    //pass user, req and res to controller
    //make sure user is verified
    if(user.status === 200){
        await deleteReview(req, res);
    }
    else{
        res.status(200).json({error: "usernotauthed"});
    } 
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})