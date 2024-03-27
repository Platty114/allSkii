import {expect, jest, test} from '@jest/globals';

import {
    signup,
    verifyLogin,
    signin
} from "./../controllers/authController.js"

describe("testing verifyLogin", () => {

    //no session token
    test("Missing session token should return status 401", () => {
        const
            req = {
                cookies: {

                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        verifyLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            error: "Session token either incorrect or not passed"
        });
    });

    //incorrect session token
    test("Incorrect session token should return status 401", () => {
        const
            req = {
                cookies: {
                    sessionToken: "token!"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        verifyLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            error:'Invalid session token' 
        });
    });

});

describe("Testing SignIn", () => {

    //no email
    test("Missing email should return status 401", async () => {
        const
            req = {
                body: {
                    password: "test1323"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            error: "Invalid Username or password"
        });
    });

    //no password
    test("Missing password should return status 401", async () => {
        const
            req = {
                body: {
                    email: "platt@gmail.com"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            error: "Invalid Username or password"
        });
    });

    //invalid email
    test("Invalid email should return status 401", async () => {
        const
            req = {
                body: {
                    email: "blah",
                    password:"blah123"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
                error: 'Username does not exist'
        });
    });

    //valid email bad password
    test("Wrong password should return status 401", async () => {
        const
            req = {
                body: {
                    email: "platt@gmail.com",
                    password:"blah123"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            error: 'Invalid Password'
        });
    });

    //valid email and password
    test("Valid credentials should return status 200", async () => {
        const
            req = {
                body: {
                    email: "platt@gmail.com",
                    password:"12345"
                }
            },
            res = {
                send: jest.fn(),
                status: jest.fn()
            };


        res.status.mockImplementation((send) => {
            return { send: res.send}
        })

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith({
            message: 'New token issues, now signed in',
            firstName: "bob",
            lastName: "burger"
        });
    });
})