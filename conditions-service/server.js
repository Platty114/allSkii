import express from "express";
import dotenv from "dotenv";
import axios from "axios";

//using dotenv parameters
dotenv.config();



//add cross access code here 
//may be necessary, have had issues in the past with it.
//


const
    app = express(),
    port = process.env.PORT,
    apiKey = process.env.API_KEY,
    baseUrl = process.env.BASE_URL,
    verifyUrl = process.env.VERIFICATION_URL;


app.use(express.json());
    


const
    getWeatherInformation = async (latitude, longitude) => {
    //helper function that makes a call to openWeather api, and then
    //formats the returned information.
        try {
           const
                requrestUrl = `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
                response = await (async () => {
                    const 
                        original = await axios.get(
                            requrestUrl
                        ),
                        modifiedResponse = {};

                    modifiedResponse.lat = latitude;
                    modifiedResponse.long = longitude;
                    modifiedResponse.temp = original.data.main.temp;
                    modifiedResponse.feelsLike = original.data.main.feels_like;
                    modifiedResponse.description = original.data.weather.description;
                    modifiedResponse.visibility = original.data.visibility;
                    modifiedResponse.wind = original.data.wind.speed;
                    modifiedResponse.cloudCoverage = original.data.clouds.all + "%";
                    modifiedResponse.lastHourSnow = (original.data.snow) 
                        ? original.data.snow["1h"]
                        : 0
                    modifiedResponse.last3HourSnow = (original.data.snow) 
                        ? original.data.snow["3h"]
                        : 0
                    
                    return  modifiedResponse;
                })();

            return response;
        }
        catch (err) {
            console.log(err);
            console.log("Error retrieving weather data")

            return {error : "There was an error on openWeathers end."};
        }
    };


//only need to return data based on latitude and longitude
app
    .get("/:lat/:long", async (req, res) => {
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
                    return { status: 500}
                }
            })();

        //auth correctly
        if(
            user.status === 200
        ){
            //Grab openWeather data using axios 
            try{
                const 
                    latitude = Number(
                        req.params.lat
                    ),
                    longitude = Number(
                        req.params.long
                    ),
                    response = await getWeatherInformation(
                        latitude,
                        longitude
                    );

                res.status(200).json(response);
            }
            catch(err){
                console.log(err);
                res.status(500).json({});
            }
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
