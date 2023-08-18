import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";
import { appRoutes } from "./routeHandling";
import { resetQuery } from "./db_utils/query-resetDb";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

// type ExpressType = ReturnType<typeof express> 
//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.get("/hello", async (req, res) => {
    res.json({ msg: "Hello! There's nothing interesting for GET /" });
});


app.get("/reset/database", async (req, res) => {
    console.log("resetting")
    // const response = await client.query(`
    // SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);
    const query = resetQuery()
    const response = await client.query(query)
    // console.log(response.rows)
    res.json(response.rows)
    console.log(response.rows)
    
})

















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
