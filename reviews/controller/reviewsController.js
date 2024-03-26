import dotenv from "dotenv";
import jsonWt from "jsonwebtoken";

import { db } from "../db/firebase.js";

dotenv.config();

const verifyUrl = process.env.VERIFICATION_URL;


//uses authenticate service to check if req is authed
const
    authenticate = async (req, res) => {
        const sessionCookie = req.cookies['sessionToken'] || '';
        const jwtKey = 'ashdh3872dunqsudn2eh313';
        if (!sessionCookie) {
            // change back to 401 later when deployed
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
            // change back to 400 later when deployed
            return { status: 200}; 
        } 
    };

//creates a review in the db
const
    createReview = async (req, res) => {
        try {
            console.log(req.body);
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

//gets all reviews from the db
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

//gets a single review from the db
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

//updates a review in the db
const 
    updateReview = async (req, res) => {
        try {
            const id = req.body.id;
            const user = req.body.user;
            const placeName = req.body.placeName;
            const category = req.body.category;
            const skiHill = req.body.skiHill;
            const rating = req.body.rating;
            const comments = req.body.comments;
            const reviewsRef = await db.collection('Reviews').doc(id)
            .update({
                user: req.body.user,
                placeName: req.body.placeName,
                category: req.body.category,
                skiHill: req.body.skiHill,
                rating: req.body.rating,
                comments: req.body.comments
            });
            res.send(reviewsRef);
        } catch(error) {
            res.send(error);
        }
    };

//deletes a review from the db
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