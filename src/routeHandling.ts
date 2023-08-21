// import cors from "cors";
import dotenv from "dotenv";
import core from "express";
import { Client } from "pg";
// import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";

//Configure express routes

export function appRoutes(app: core.Express) {
    dotenv.config(); //Read .env file lines as though they were env vars.

    const dbClientConfig = setupDBClientConfig();
    const client = new Client(dbClientConfig);

    app.get("/hello", async (req, res) => {
        res.json({ msg: "Hello! There's nothing interesting for GET /" });
    });

    app.get("/reset/database", async (req, res) => {
        console.log("resetting");
        // const response = await client.query(`
        // SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`);
        // const query = resetQuery()
        // console.log(query);
        // const response = await client.query(query);
        const response = await client.query("SELECT * FROM users;");
        // res.json(response.rows)
        console.log(response.rows);
        // res.json({query: resetQuery()})
        res.json({ status: "done" });
        console.log("ive responded now");
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
    app.get("/search/:query", async (req, res) => {
        const response = await client.query(
            `SELECT * FROM data WHERE name=${req.params.query} RETURNING *;`
        );
        res.json(response.rows);
    });

    app.get("/query/:query", async (req, res) => {
        client.query(req.params.query);
    });
}
