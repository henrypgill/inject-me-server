import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import { refreshDataBase } from "./db_utils/populateDb";
// import { appRoutes } from "./routeHandling";
// import { resetQuery } from "./db_utils/query-resetDb";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

// type ExpressType = ReturnType<typeof express>
//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.get("/reset/database", async (req, res) => {
    console.log("reset requested");
    const refreshResponse = await refreshDataBase(client);
    res.json(refreshResponse);
});

app.get<string>("/plain-query/:query", async (req, res) => {
    const response = await client.query(req.params.query);
    res.json(response.rows);
});

app.get("/health-check", async (req, res) => {
    try {
        //For this to be successful, must connect to db
        await client.query("select now()");
        res.status(200).send("system ok");
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    console.log("Attempting to connect to db");
    await client.connect();
    console.log("Connected to db!");

    // appRoutes(app)

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}
