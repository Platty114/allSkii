import dotenv from "dotenv";
import axios from "axios";

import { db } from "../db/firebase.js";

dotenv.config();

const verifyUrl = process.env.VERIFICATION_URL;


//uses authenticate service to check if req is authed
const
    authenticate = async (req, res) => {
        try {
            return await axios.post(
                verifyUrl,
                req
            )
        }
        catch (err){
            //NEEDS TO BE CHANGED TO ENABLE AUTH!!!!
            console.log(err);
            return {status: 200}
        }
    };

const
    createReview = async (req, res) => {
        try {
            console.log(req.body);
            // const id = req.body.id;
            const reviewJson = {
                user: req.body.user,
                placeName: req.body.placeName,
                category: req.body.category,
                skiHill: req.body.skiHill,
                rating: req.body.rating,
                comments: req.body.comments
            };
            const response = await db.collection('Reviews').add(reviewJson);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

const
    getAllReviews = async (req, res) => {
        try {
            const reviewsRef = db.collection('Reviews');
            const response = await reviewsRef.get();
            let responseArray = [];
            response.forEach(document => {
                responseArray.push(document.data());
            });
            res.send(responseArray);
        } catch (error) {
            res.send(error);
        }
    };

const
    getReview = async (req, res) => {
        try {
            const reviewsRef = db.collection('Reviews').doc(req.params.id);
            const response = await reviewsRef.get();
            res.send(response.data());
        } catch (error) {
            res.send(error);
        }
    };

const 
    updateReview = async (req, res) => {
        try {
            const id = req.body.id;
            const newHill = "Whistler Blackcomb";
            const reviewsRef = await db.collection('Reviews').doc(id)
            .update({
                skiHill: newHill
            });
            res.send(reviewsRef);
        } catch(error) {
            res.send(error);
        }
    };

const
    deleteReview = async (req, res) => {
        try {
            const response = await db.collection('Reviews').doc(req.params.id).delete();
            res.send(response);
        } catch(error) {
            res.send(error);
        }
    };

export {
    authenticate,
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
}