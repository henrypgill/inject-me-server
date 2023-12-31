import { DbItem } from "./DbTypes";

export function getItems() {
    const itemNames = [
        "Shoes",
        "Backpack",
        "Phone",
        "Laptop",
        "Sunglasses",
        "Headphones",
        "Gaming Console",
        "Watch",
        "Camera",
        "Jacket",
        "Jeans",
        "T-shirt",
        "Dress",
        "Skirt",
        "Sweater",
        "Sneakers",
        "Guitar",
        "Bicycle",
        "Books",
        "Toothbrush",
        "Toothpaste",
        "Shampoo",
        "Conditioner",
        "Groceries",
        "Furniture",
        "Bedding",
        "Cookware",
        "Plant",
        "Paintings",
        "Fitness Equipment",
        "Coffee Maker",
        "Vacuum Cleaner",
        "Microwave",
        "Candles",
        "Perfume",
        "Chocolates",
        "Wine",
        "Bicycle",
        "Car",
        "Motorcycle",
        "Tickets",
        "Concert Tickets",
        "Movie Tickets",
        "Jewelry",
        "Gardening Tools",
        "Board Games",
        "Sports Equipment",
        "Art Supplies",
        "Pet Supplies",
        "Hiking Boots",
        "Swimsuit",
    ];

    const items: DbItem[] = itemNames.map((itemName) => {
        const randomPrice = Math.random() * 10;
        const randomQuantity = Math.floor(Math.random() * 20);

        return {
            item_id: -1,
            item_name: itemName,
            item_price: randomPrice,
            item_quantity: randomQuantity,
        };
    });

    return items;
}

export function getInsertItemsQuery() {
    const items = getItems();
    const itemValuesString = items
        .map(
            (item) =>
                `('${item.item_name}', ${item.item_price}, ${item.item_quantity})`
        )
        .join(",\n ");
    const insertDataString = `INSERT INTO items\n (item_name, item_price, item_quantity) VALUES ${itemValuesString}\nRETURNING *;`;

    return insertDataString;
}

// console.log(getInsertItemsQuery());
