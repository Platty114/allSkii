//helper file for loading events into db
import { db } from "./db/firebase.js"
import { parse } from "csv-parse";
import * as fs from "fs";
const
    loadEventsDataIntoDb = async (req) => {
        try {
            const eventJson = {
                date: req.body.date,
                hill: req.body.hill,
                category: req.body.category,
                name: req.body.name,
                difficulty: req.body.difficulty,
                pricing: req.body.pricing
            };
            await db.collection('Events').add(eventJson);
        } catch (error) {
            console.log(error);
        }
    };

const
    main = async () => {
        fs.createReadStream("./ski_hill_events_and_lesson_plans.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", async (row) => {
                const
                    req = {
                        body: {
                            date: row[0],
                            hill: row[1],
                            category: row[2],
                            name: row[3],
                            difficulty: row[4],
                            pricing: row[5]
                        }
                    }

                await loadEventsDataIntoDb(req);
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", function () {
                console.log("finished");
            });
    };


main();
