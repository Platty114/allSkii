import dotenv from "dotenv";
import axios from "axios";
import jsonWt from "jsonwebtoken";
//using dotenv parameters
dotenv.config();

const
    apiKey = process.env.API_KEY,
    baseUrl = process.env.BASE_URL,
    verifyUrl = process.env.VERIFICATION_URL;


//uses authenticate service to check if req is authed
const
    authenticate = async (req, res) => {
        const sessionCookie = req.cookies['sessionToken'] || '';
        const jwtKey = 'ashdh3872dunqsudn2eh313';
        if (!sessionCookie) {
            //needs to be changed for deployment
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
            //needs to be changed for deployment
            return { status: 200}; 
        } 
    };

//helper function that grabs weather info from openWeatherAPI and formats response.
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


//controller function for grabbing weather information
const
    getWeather = async (user, req, res) => {

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
    }


export {
    authenticate,
    getWeather
}