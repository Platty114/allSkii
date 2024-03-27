import {
    authenticate,
    createEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
} from "./../controller/eventsController.js";

import {expect, jest, test} from '@jest/globals';

// test for events authentication
describe("Testing Events authentication", () => {

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

// test for creating an event
describe('Testing create an event', () => {
    test('should add an event to the database and return a response', async () => {
        const req = { 
            body: { 
                date: '2022-02-06 11:52:32', 
                hill: 'Fernie', 
                category: 'Snowboarding', 
                name: 'Wipeout', 
                difficulty: 'Hard', 
                pricing: 20 } 
            };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await createEvent(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for getting all events
describe('Testing get all events', () => {
    test('should return all events in the database', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await getAllEvents(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
        expect(Array.isArray(res.send.mock.calls[0][0])).toBe(true);
    });
});

// test for getting a single event
describe('Testing get a single event', () => {
    test('should return a single event from the database', async () => {
        const req = { params: { id: 'eventID'} };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await getEvent(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for updating an event
describe('Testing update an event', () => {
    test('should update an event in the database and return a response', async () => {
        const req = { 
            body: { 
                id: 's8dfbnidjfgi3d99df',
                date: '2019-11-16 01:22:52', 
                hill: 'COP', 
                category: 'Skiing', 
                name: 'Whiteout', 
                difficulty: 'Easy', 
                pricing: 75 } 
            };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await updateEvent(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for deleting an event
describe('Testing delete an event', () => {
    test('should delete an event from the database and return a response', async () => {
        const req = { params: { id: 'eventID'} };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await deleteEvent(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});