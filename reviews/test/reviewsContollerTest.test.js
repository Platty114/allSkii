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

describe("Testing ReviewsAuthenticate", () => {

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
