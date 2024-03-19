const express = require('express');
const app = express();

const admin = require("firebase-admin");
const credentials = require("./allskii-ecd4d-firebase-adminsdk-9lzcg-7efc3136c5.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const eventJson = {
            date: req.body.date,
            hill: req.body.hill,
            category: req.body.category,
            name: req.body.name,
            difficulty: req.body.difficulty,
            pricing: req.body.pricing
        };
        const response = db.collection('Events').doc(id).set(eventJson);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

const db = admin.firestore();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})