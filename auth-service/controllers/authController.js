
import bcrypt from "bcrypt";
import jsonWt from "jsonwebtoken";
import { 
    db 
} from "./../db/firebase.js";
const jwtKey = 'ashdh3872dunqsudn2eh313';



//signup
const
    signup = async (request, response) => {
        const 
            email = request.body.email,
            password = request.body.password,
            firstName = request.body.firstName,
            lastName = request.body.lastName;

        const hash = bcrypt.hashSync(password, 10);
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
    };

const
    verifyLogin = (request, response) => {
        const sessionCookie = request.cookies['sessionToken'] || '';
        console.log(sessionCookie);
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
    };


const
    signin = async (request, response) => {
        const {email, password} = request.body;
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

    };


export {
    signup,
    verifyLogin,
    signin
};