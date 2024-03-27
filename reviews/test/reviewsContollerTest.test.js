import {
    authenticate,
    createReview,
    getAllReviews,
    getHillReviews,
    getReview,
    updateReview,
    deleteReview
} from "./../controller/reviewsController.js";

import {expect, jest, test} from '@jest/globals';

// test for reviews authentication
describe("Testing Reviews authentication", () => {

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

// test for creating a review
describe('Testing create a review', () => {
    test('should add a review to the database and return a response', async () => {
        const req = { 
            body: { 
                user: 'Timmy Turner',
                placeName: 'Slap Juice Jamboree',
                category: 'Bar',
                skiHill: 'Blue Mountain', 
                rating: 4, 
                comments: 'THIS PLACE IS BUSSIN FRR FR!' } 
            };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await createReview(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for getting all reviews
describe('Testing get all reviews', () => {
    test('should return all reviews in the database', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await getAllReviews(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
        expect(Array.isArray(res.send.mock.calls[0][0])).toBe(true);
    });
});

// test for getting all reviews of a specific ski hill
describe('Testing get all reviews of a specific ski hill', () => {
    test('should return all reviews of a specific ski hill in the database', async () => {
        const req = { params: { id: 'skiHillID'} };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await getHillReviews(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
        expect(Array.isArray(res.send.mock.calls[0][0])).toBe(true);
    });
});

// test for getting a single review
describe('Testing get a single review', () => {
    test('should return a single review from the database', async () => {
        const req = { params: { id: 'reviewID'} };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await getReview(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for updating a review
describe('Testing update an review', () => {
    test('should update an review in the database and return a response', async () => {
        const req = { 
            body: { 
                id: 'jnkj84wrfdn89srgndjf903sjf',
                user: 'Drake',
                placeName: 'Tomato Town',
                category: 'Restaurant',
                skiHill: 'Oshawa Ski Resort', 
                rating: 2, 
                comments: 'THIS PLACE IS GARBAGE ONGG ONG!' } 
            };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await updateReview(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});

// test for deleting a review
describe('Testing delete a review', () => {
    test('should delete a review from the database and return a response', async () => {
        const req = { params: { id: 'reviewID'} };
        const res = {
            send: jest.fn(),
            status: jest.fn()
        };
        res.status.mockImplementation((send) => {
            return { send: res.send}
        })
        await deleteReview(req, res);
        expect(res.send).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).not.toHaveBeenCalledWith(null);
    });
});