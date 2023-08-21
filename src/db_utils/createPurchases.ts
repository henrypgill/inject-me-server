import { DbItem, getItems } from "./createItems";
import { DbUser, getUsers } from "./createUsers";

export interface DbPurchase {
    purchase_id: number;
    purchase_quantity: number;
    item_id: number;
    user_id: number;
}

export function getInsertPurchasesQuery(users: DbUser[], items: DbItem[]) {
    const purchases: DbPurchase[] = [];

    function createDbPurchase(user_id: number): DbPurchase {
        return {
            purchase_id: -1,
            purchase_quantity: Math.floor(Math.random() * 100),
            user_id: user_id,
            item_id: items[Math.floor(Math.random() * items.length)].item_id,
        };
    }

    function createMultiplePurchases(user: DbUser) {
        const numberOfPurchases = Math.floor(Math.random() * 20);
        for (let i = 0; i < numberOfPurchases; i++) {
            purchases.push(createDbPurchase(user.user_id));
        }
    }

    users.forEach((user) => createMultiplePurchases(user));

    const userValuesString = purchases
        .map(
            (purchase) =>
                `(${purchase.purchase_quantity}, ${purchase.user_id}, ${purchase.item_id})`
        )
        .join(",\n   ");
    const insertDataString = `INSERT INTO purchases\n   (purchase_quantity, user_id, item_id) VALUES ${userValuesString}\nRETURNING *;`;

    return insertDataString;
}

// console.log(getInsertPurchasesQuery(getUsers(), getItems()));
