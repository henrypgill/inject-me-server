import { DbUser } from "./createUsers";

export interface DbAccount {
    account_id: number;
    user_id: number; //typeof DbUser.user_id
    user_money: number;
}

export function getInsertAccountsQuery(users: DbUser[]) {
    const createDbAccount = (user: DbUser): DbAccount => {
        return {
            account_id: -1,
            user_id: user.user_id,
            user_money: Math.random() * Math.random() * 100,
        };
    };

    const accounts = users.map(createDbAccount);

    const userValuesString = accounts
        .map((account) => `(${account.user_id}, '${account.user_money}')`)
        .join(", ");
    const insertDataString = `INSERT INTO accounts\n    (user_id, user_money) VALUES ${userValuesString} RETURNING *;`;

    return insertDataString;
}
