// import { createDbAccounts } from "./createAccounts";
import { DbAccount, DbItem, DbPurchase, DbUser } from "./DbTypes";
import { getInsertAccountsQuery } from "./createAccounts";
import { getInsertItemsQuery } from "./createItems";
import { getInsertPurchasesQuery } from "./createPurchases";
import { getInsertUsersQuery } from "./createUsers";
import { getResetQuery } from "./query-resetDb";
import { Client } from "pg";

export async function refreshDataBase(client: Client) {
    const resetQuery = getResetQuery();
    const usersQuery = getInsertUsersQuery();
    const itemsQuery = getInsertItemsQuery();

    const resetResponse = await client
        .query(resetQuery)
        .then((queryResult) => queryResult);

    const usersResponse = await client
        .query<DbUser>(usersQuery)
        .then((queryResult) => queryResult.rows);

    const accountsQuery = getInsertAccountsQuery(usersResponse);
    const accountsResponse = await client
        .query<DbAccount>(accountsQuery)
        .then((queryResult) => queryResult.rows);

    const itemsResponse = await client
        .query<DbItem>(itemsQuery)
        .then((queryResult) => queryResult.rows);

    const purchasesQuery = getInsertPurchasesQuery(
        usersResponse,
        itemsResponse
    );
    const purchasesResponse = await client
        .query<DbPurchase>(purchasesQuery)
        .then((queryResult) => queryResult.rows);

    return [usersResponse, itemsResponse, accountsResponse, purchasesResponse];
}
