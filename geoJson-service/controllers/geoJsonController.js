import dotenv from "dotenv";
import jsonWt from "jsonwebtoken";
import geoJsonData from "./../ski_run_hill_relation.json" assert { type: 'json' }

dotenv.config();

//uses authenticate service to check if req is authed
const
    authenticate = async (req, res) => {
        const sessionCookie = req.cookies['sessionToken'] || '';
        const jwtKey = 'ashdh3872dunqsudn2eh313';
        if (!sessionCookie) {
            return { status: 200 }
        }
        try {
            const decoded = jsonWt.verify(sessionCookie, jwtKey);
            return {
                message: 'Authenticated',
                user: decoded,
                status: 200
            };
        } catch (err) {
            return { status: 200}; 
        } 
    };


const
    getAllGeoJson = (user, req, res) => {
        console.log(user);
        //auth correctly
        if(user.status === 200){
            //send geoJsonData to client
            res.status(200).json(geoJsonData);
        }
        //auth service failure
        else if (user.status === 500){
            res.status(500).json({
                error: "Internal service error"
            });
        }
        //un authed
        else{
            res.status(401).json({
                error: "unauthenticated user"
            });
        }
    };

const 
    getGeoJsonBySkiHill = (user, req, res) => {
        //auth correctly
        if(user.status === 200){
            //send geoJsonData to client
            
            const response = {
                type: geoJsonData.type,
                features: (geoJsonData.features).filter((item) => {
                    //console.log(item.properties.ski_hill);
                    if(
                        item.properties.ski_hill === req.params.hillName
                        &&
                        item.properties.name !== null
                    ){
                        return true
                    }
                    else {
                        return false
                    }
                })
            }

            res.status(200).json(response);
        }
        //auth service failure
        else if (user.status === 500){
            res.status(500).json({
                error: "Internal service error"
            });
        }
        //un authed
        else{
            res.status(401).json({
                error: "unauthenticated user"
            });
        } 
    }


export {
    authenticate,
    getAllGeoJson,
    getGeoJsonBySkiHill
};