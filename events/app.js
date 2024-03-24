const express = require('express');
const app = express();

const admin = require("firebase-admin");
const credentials = require("./allskii-ecd4d-firebase-adminsdk-9lzcg-7efc3136c5.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

// adding entries
app.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        // const id = req.body.id;
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
});

// get all entries
app.get("/read/all", async (req, res) => {
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
});

// get one entry
app.get("/read/:id", async (req, res) => {
    try {
        const eventsRef = db.collection('Events').doc(req.params.id);
        const response = await eventsRef.get();
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
});

// update entry
// MAY NEED ID FOR EACH ENTRY TO MAKE THIS WORK < TO DO
app.post('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const newHill = "Nakiska";
        const eventsRef = await db.collection('Events').doc(id)
        .update({
            hill: newHill
        });
        res.send(eventsRef);
    } catch(error) {
        res.send(error);
    }
});

// delete entry
app.delete('/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('Events').doc(req.params.id).delete();
        res.send(response);
    } catch(error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
