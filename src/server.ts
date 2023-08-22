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

app.get<string>("/free-query/:query", async (req, res) => {
    console.log("received1");
    try {
        const query = req.params.query;
        const response = await client.query(query);
        res.json({ query: query, data: response.rows });
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(200).json("no items found matching that name");
    }
});

app.get<string>("/interpolated-query/:query", async (req, res) => {
    try {
        const query = `SELECT (item_name, item_price) FROM items WHERE LOWER(item_name) LIKE LOWER('%${req.params.query}%')`;
        console.log(query);
        const response = await client.query(query);
        res.json({ query: query, data: response.rows });
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(200).json("no items found matching that name");
    }
});

app.get<string>("/restricted-query/:query", async (req, res) => {
    try {
        const query =
            "SELECT item_name, item_price FROM items WHERE LOWER(item_name) LIKE LOWER($1)";
        const response = await client.query(query, [`%${req.params.query}%`]);
        res.json({ query: query, data: response.rows });
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(200).json("no items found matching that name");
    }
});

app.get<string>("/all-data/:table", async (req, res) => {
    const query = `SELECT * FROM ${req.params.table};`;
    const response = await client.query(query);
    res.json(response.rows);
});

// app.get<string>("/all-data/users", async (req, res) => {
//     const query = "SELECT * FROM $;"
//     const response = await client.query(query);
//     res.json(response.rows);
// });

// app.get<string>("/all-data/items", async (req, res) => {
//     const query = "SELECT * FROM $;"
//     const response = await client.query(query);
//     res.json(response.rows);
// });

// app.get<string>("/all-data/accounts", async (req, res) => {
//     const query = "SELECT * FROM $;"
//     const response = await client.query(query);
//     res.json(response.rows);
// });

// app.get<string>("/all-data/purchases", async (req, res) => {
//     const query = "SELECT * FROM $;"
//     const response = await client.query(query);
//     res.json(response.rows);
// });

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
