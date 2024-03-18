const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jsonWt = require('jsonwebtoken');
const {getFirestore} = require('firebase-admin/firestore');

const admin = require("firebase-admin");
const credentials = require("./allskii-ecd4d-firebase-adminsdk-9lzcg-7efc3136c5.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.post('/create', async (req, res) => {
    try {

    }
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})