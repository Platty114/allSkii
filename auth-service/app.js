import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {
    signup,
    verifyLogin,
    signin 
} from "./controllers/authController.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser());
//add cors secuirty stuff
app.use(cors());

app.post('/signup', async (request, response) => {
        console.log(request);
        await signup(request, response); 
    }
)
app.post('/verifyLogin', (request, response) => {
    verifyLogin(request, response);
})

app.post('/signin', async (request, response) => {
    await signin(request, response);
})

app.listen(port, () => {
    console.log(`Auth Service has now started on port ${port}`)
})
