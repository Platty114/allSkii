const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jsonWt = require('jsonwebtoken');
const cors = require('cors');
const {getFirestore} = require('firebase-admin/firestore');
const admin = require("firebase-admin");
const serviceAccount = require("./allskii-ecd4d-firebase-adminsdk-9lzcg-7efc3136c5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 2345;

app.use(bodyParser.json());
app.use(cookieParser());
//add cors secuirty stuff
app.use(cors());

const jwtKey = 'ashdh3872dunqsudn2eh313';

app.post('/signup', async (request, response) => {
        const 
            email = request.body.email,
            password = request.body.password,
            firstName = request.body.firstName,
            lastName = request.body.lastName;

        const hash = bcrypt.hashSync(password, 10);
        const db = getFirestore();
        const userRef = db.collection('Users').doc(email);
        const doc = await userRef.get();
        const expiresIn = 60 * 60 * 24 * 7 * 1000;
        if (!doc.exists) {
            await userRef.set({
                username: email, 
                password: hash,
                firstName: firstName,
                lastName: lastName
            });
            const token = jsonWt.sign({email: email}, jwtKey, {expiresIn: expiresIn});
            response.cookie('sessionToken', token)
            response.status(200).send({
                message: 'Username created'
            })
        } else {
            response.status(400).send({
                error: 'Username already exists'
            })
        }
    }
)
app.post('/verfiyLogin', (request, response) => {
    const sessionCookie = request.cookies['sessionToken'] || '';
    if (!sessionCookie) {
        response.status(401).send({
            error: "Session token either incorrect or not passed"
        })
    }
    try {
        const decoded = jsonWt.verify(sessionCookie, jwtKey);
        response.status(200).send({
            message: 'Authenticated',
            user: decoded
        })
    } catch (err) {
        response.status(401).send({
            error: 'Invalid session token'
        })
    }


})

app.post('/signin', async (request, response) => {

    const {email, password} = request.body;
    const db = getFirestore();
    const userRef = db.collection('Users').doc(email);
    const doc = await userRef.get();
    const expiresIn = 60 * 60 * 24 * 7 * 1000;
    if (!doc.exists) {
        response.status(400).send({
            error: 'Username does not exist'
        })
    } else {
        const userData = doc.data();
        bcrypt.compare(password, userData.password, function (err, result) {
            if (result === false) {
                response.status(400).send({
                    error: 'Invalid Password'
                })
            } else {
                const token = jsonWt.sign({email: email}, jwtKey, {expiresIn: expiresIn});
                response.cookie('sessionToken', token)
                response.status(200).send({
                    message: 'New token issues, now signed in'
                })
            }
        });

    }

})

app.listen(port, () => {
    console.log(`Auth Service has now started on port ${port}`)
})
