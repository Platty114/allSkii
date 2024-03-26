import {expect, jest, test} from '@jest/globals';
import {
    authenticate,
    getAllGeoJson,
    getGeoJsonBySkiHill,
} from "./../controllers/geoJsonController.js"

describe("Testing GeoJsonAuthenticate", () => {

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


describe("Testing GeoJson getAllGeoJson", () => {

    //user status 200 should return all geojson data
    test("User status 200 should return all geoJson data", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 200
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).not.toHaveBeenCalledWith(null);
    })

    //user status 200 should return all geojson data
    test("User status 500 should return error", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 500
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Internal service error"
        });
    })
     
    //user status 200 should return all geojson data
    test("Any other user status should return 401", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 300
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "unauthenticated user"
        });
    }) 
});

describe("Testing GeoJson getGeoJsonBySkiHill", () => {

    //user status 200 should return all geojson data
    test("User status 200 should return all geoJson data for specified hill", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 200
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).not.toHaveBeenCalledWith(null);
    })

    //user status 200 should return all geojson data
    test("User status 500 should return error", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 500
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Internal service error"
        });
    })
     
    //user status 200 should return all geojson data
    test("Any other user status should return 401", () => {
        const
            req = {},
            res = {
                json: jest.fn(),
                status: jest.fn()
            },
            user = {
                status: 300
            };

        res.status.mockImplementation((json) => {
            return { json: res.json}
        })

        getAllGeoJson(user, req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "unauthenticated user"
        });
    }) 
})