import { DbUser } from "./createUsers";

export interface Account {
    account_id: number;
    user_id: number;//typeof DbUser.user_id
    user_money: number;

}


// export function getAccounts(users) {

// const accounts = users.map(user => {
//     return {
//         account_id: -1;
//         user_id: user.
//     }
//     }
// )


// }