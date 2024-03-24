import express from "express";
import dotenv from "dotenv";
import geoJsonData from "./ski_run_hill_relation.json" assert { type: 'json' }

//using dotenv parameters
dotenv.config();

const
    app = express(),
    port = process.env.PORT,
    verifyUrl = process.env.VERIFICATION_URL;

const ski_hill_relation = geoJsonData.features;


app.use(express.json());
    
//only need to return data based on latitude and longitude
app
    .get("/", async (req, res) => {
        //verify that user making request is signed in 
        const
            user = await(async () => { 
                try{
                    return await axios.post(
                        verifyUrl,
                        req
                    ) 
                }
                catch(err){
                    //THIS NEEDS TO BE CHANGED
                    //SHOULD BE STATUS 500, only
                    //set to 200 right now for testing purposes.
                    return { status: 200}
                }
            })();

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
  });



app
    .get("/runs/:hillName", async (req, res) => {
        console.log(req.params.skiHill);
        //verify that user making request is signed in 
        const
            user = await(async () => { 
                try{
                    return await axios.post(
                        verifyUrl,
                        req
                    ) 
                }
                catch(err){
                    //THIS NEEDS TO BE CHANGED
                    //SHOULD BE STATUS 500, only
                    //set to 200 right now for testing purposes.
                    return { status: 200}
                }
            })();

        //auth correctly
        if(user.status === 200){
            //send geoJsonData to client
            
            const response = {
                type: geoJsonData.Type,
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
});


//listen
app.listen(port);
console.log("listening on port" + port);
