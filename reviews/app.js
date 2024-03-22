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
        const reviewJson = {
            name: req.body.name,
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
});

// review rating, comment, category - ski runs, food, accommodation, name of thing (is it a ski run, food place etc), ski hill

// get all entries
app.get("/read/all", async (req, res) => {
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
});

// get one entry
app.get("/read/:id", async (req, res) => {
    try {
        const reviewsRef = db.collection('Reviews').doc(req.params.id);
        const response = await reviewsRef.get();
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
        const newHill = "Whistler Blackcomb";
        const reviewsRef = await db.collection('Reviews').doc(id)
        .update({
            skiHill: newHill
        });
        res.send(reviewsRef);
    } catch(error) {
        res.send(error);
    }
});

// delete entry
app.delete('/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('Reviews').doc(req.params.id).delete();
        res.send(response);
    } catch(error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})