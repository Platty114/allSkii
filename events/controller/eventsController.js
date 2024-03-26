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

//creates an event in the db
const
    createEvent = async (req, res) => {
        try {
            console.log(req.body);
            const eventJson = {
                date: req.body.date,
                hill: req.body.hill,
                category: req.body.category,
                name: req.body.name,
                difficulty: req.body.difficulty,
                pricing: req.body.pricing
            };
            const response = await db.collection('Events').add(eventJson);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

//gets all events from the db
const
    getAllEvents = async (req, res) => {
        try {
            const eventsRef = db.collection('Events');
            const response = await eventsRef.get();
            let responseArray = [];
            response.forEach(document => {
                responseArray.push(document.data());
            });
            res.send(responseArray);
        } catch (error) {
            res.send(error);
        }
    };

//gets a single event from the db
const
    getEvent = async (req, res) => {
        try {
            const eventsRef = db.collection('Events').doc(req.params.id);
            const response = await eventsRef.get();
            res.send(response.data());
        } catch (error) {
            res.send(error);
        }
    };

//updates an event in the db
const
    updateEvent = async (req, res) => {
        try {
            const id = req.body.id;
            const date = req.body.date;
            const hill = req.body.hill;
            const category = req.body.category;
            const name = req.body.name;
            const difficulty = req.body.difficulty;
            const pricing = req.body.pricing;
            const eventsRef = await db.collection('Events').doc(id)
            .update({
                date: req.body.date,
                hill: req.body.hill,
                category: req.body.category,
                name: req.body.name,
                difficulty: req.body.difficulty,
                pricing: req.body.pricing
            });
            res.send(eventsRef);
        } catch(error) {
            res.send(error);
        }
    };

//deletes an event from the db
const
    deleteEvent = async (req, res) => {
        try {
            const response = await db.collection('Events').doc(req.params.id).delete();
            res.send(response);
        } catch(error) {
            res.send(error);
        }
    };

export {
    authenticate,
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
}