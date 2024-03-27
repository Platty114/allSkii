import {expect, jest, test} from '@jest/globals';
import {
    getProfile,
    updateName,
    updatePassword,
    authenticate
} from "./../controller/profileController.js";

describe("Testing profileController Authenticate", () => {

    //no session key
    test('no session key on request body should return status 401', async () => {
        let
            req = { cookies: {} },
            res;

        res = await authenticate(req, res);

        expect(res.status).toBe(401)
    })

    //incorrect session key should fail
    test('Incorrect session key should return status 401', async () => {
        let
            req = { cookies: { sessionToken: "someToken"} },
            res;

        res = await authenticate(req, res);

        expect(res.status).toBe(401)
    })

});


describe("Testing getProfile", () => {

    //using an email that exists should return 200 + data
    test('Valid email should return status 200 and data', async () => {
        const
            req = {
                body: {
                    email: "platt@gmail.com"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({
            firstName: "James",
            lastName: "Platt",
            username: "platt@gmail.com",
        });
    });

    //invaid email should return 401
    test('Invalid email should return 401', async () => {
        const
            req = {
                body: {
                    email: "jjjjjjjjjjjjjjjjj"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('Empty email should return 401', async () => {
        const
            req = {
                body: {
                    email: null
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('No email should return 401', async () => {
        const
            req = {
                body: {
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });
});


describe("Testing updateName", () => {
    //invaid email should return 401
    test('Invalid email should return 401', async () => {
        const
            req = {
                body: {
                    email: "jjjjjjjjjjjjjjjjj",
                    firstName: "test",
                    lastName: "lastName"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await updateName(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('Empty email should return 401', async () => {
        const
            req = {
                body: {
                    email: null,
                    firstName: "test"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await updateName(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('No email should return 401', async () => {
        const
            req = {
                body: {
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });
});

describe("Testing updatePassword", () => {
    //invaid email should return 401
    test('Invalid email should return 401', async () => {
        const
            req = {
                body: {
                    email: "jjjjjjjjjjjjjjjjj",
                    password: "supersecure"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await updateName(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('Empty email should return 401', async () => {
        const
            req = {
                body: {
                    email: null,
                    password: "newPass"
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await updateName(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });

    //invaid email should return 401
    test('No email should return 401', async () => {
        const
            req = {
                body: {
                }
            },
            res = {
                json: jest.fn(),
                status: jest.fn()
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        await getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({error: "invalid email"});
    });
});