


export function resetQuery() {

    console.log("getting reset query")

    const retString = `
    DROP TABLE IF EXISTS purchases;
    DROP TABLE IF EXISTS accounts;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users;
    
    
    
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        first_name CHARACTER VARYING(255),
        last_name CHARACTER VARYING(255),
        password CHARACTER VARYING(255)
    );
      
    CREATE TABLE items (
        item_id SERIAL PRIMARY KEY,
        item_name CHARACTER VARYING(255),
        item_price DECIMAL,
        item_quantity INT
    );
      
      
    CREATE TABLE accounts (
        account_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        user_money DECIMAL
    );
      
    CREATE TABLE purchases (
        purchase_id SERIAL PRIMARY KEY,
        purchase_quantity INT,
        item_id INT REFERENCES items(item_id),
        user_id INT REFERENCES users(user_id)
    );

    
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public';     
    `

    return retString
    // return `INSERT INTO users (first_name, last_name, password) VALUES ('james', 'dean', 'bubblingBrook') RETURNING *;`

}