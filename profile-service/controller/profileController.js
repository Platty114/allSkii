import dotenv from "dotenv";
import jsonWt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { db } from "../db/firebase.js";

dotenv.config();

//uses authenticate service to check if req is authed
const
    authenticate = async (req, res) => {
        const sessionCookie = req.cookies['sessionToken'] || '';
        const jwtKey = 'ashdh3872dunqsudn2eh313';
        console.log(req.cookies);
        if (!sessionCookie) {
            return { status: 200 }
        }
        try {
            const decoded = jsonWt.verify(sessionCookie, jwtKey);
            return {
                message: 'Authenticated',
                user: decoded,
                status: 200
            };
        } catch (err) {
            return { status: 200}; 
        } 
    };


const
    getProfile = async (req, res) => {
        const userEmail = req.body.email === null ? "" : req.body.email;
        console.log(userEmail);
        const 
            userRef = db.collection('Users').doc(userEmail),
            doc = await userRef.get();
        
        if(doc.exists){
            //format data and send
            const userData = {
                username: doc.data().username,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName
            }

            res.status(200).json(userData);
        } 
        else {
            //email dosen't exist so send error
            res.status(400).json({error: "invalid email"});
        }

    };

const
    updateName = async (req, res) => {
        //grab user if it exists, and then update it 
        const 
            userEmail = req.body.email === null ? "" : req.body.email, //error handling
            firstName = req.body.email === null ? "" : req.body.firstName,
            lastName = req.body.email === null ? "" : req.body.lastName;

        const 
            userRef = db.collection('Users').doc(userEmail);
            const doc = await userRef.get();
        if(doc.exists){
            //format data and send
            await userRef.update({
                firstName: firstName,
                lastName: lastName 
            })

            res.status(200).json({ success: "true"});
        } 
        else {
            //email dosen't exist so send error
            res.status(400).json({error: "invalid email"});
        }


    };

const
    updatePassword = async (req, res) => {
         //grab user if it exists, and then update it 
        const 
            userEmail = req.body.email === null ? "" : req.body.email, //error handling
            userPassword = req.body.password;
        const 
            userRef = db.collection('Users').doc(userEmail);
            const doc = await userRef.get();
        if(
            doc.exists
            &&
            userPassword !== null
        ){
            const hash = bcrypt.hashSync(userPassword, 10);
            
            //format data and send
            await userRef.update({
                password: hash
            })

            res.status(200).json({ success: "true"});
        } 
        else {
            //email dosen't exist so send error
            res.status(400).json({error: "invalid email"});
        }

    };

export {
    getProfile,
    updateName,
    updatePassword,
    authenticate
}
