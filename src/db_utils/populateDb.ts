// import { createDbAccounts } from "./createAccounts";
import { DbAccount, getInsertAccountsQuery } from "./createAccounts";
import { DbItem, getInsertItemsQuery } from "./createItems";
import { DbPurchase, getInsertPurchasesQuery } from "./createPurchases";
import { DbUser, getInsertUsersQuery } from "./createUsers";
import { getResetQuery } from "./query-resetDb";
import { Client } from "pg";

export async function refreshDataBase(client: Client) {
    const resetQuery = getResetQuery();
    const usersQuery = getInsertUsersQuery();
    const itemsQuery = getInsertItemsQuery();

    console.log("resetting db tables");
    const resetResponse = await client
        .query(resetQuery)
        .then((queryResult) => console.log(queryResult));
    console.log("reset response rows:", resetResponse);

    console.log("inserting users");
    const usersResponse = await client
        .query<DbUser>(usersQuery)
        .then((queryResult) => queryResult.rows);
    console.log("users created:", usersResponse);

    console.log("inserting accounts");
    const accountsQuery = getInsertAccountsQuery(usersResponse);
    const accountsResponse = await client
        .query<DbAccount>(accountsQuery)
        .then((queryResult) => queryResult.rows);
    console.log("accounts created:", accountsResponse);

    console.log("inserting items");
    const itemsResponse = await client
        .query<DbItem>(itemsQuery)
        .then((queryResult) => queryResult.rows);
    console.log("items created:", itemsResponse);

    const purchasesQuery = getInsertPurchasesQuery(
        usersResponse,
        itemsResponse
    );
    console.log("inserting purchases");
    const purchasesResponse = await client
        .query<DbPurchase>(purchasesQuery)
        .then((queryResult) => queryResult.rows);
    console.log("purchases created:", purchasesResponse);

    // const refreshAndPopulateDbQuery = `${resetQuery}\n
    // ${usersQuery}\n
    // ${itemsQuery}\n
    // ${usersQuery}\n
    // `

    // return [usersResponse, itemsResponse, accountsResponse, purchasesResponse]
    return [purchasesResponse];
}
