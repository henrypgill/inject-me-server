export interface DbItem {
    item_id: number;
    name: string;
    price: number;
    quantity: number;
}

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
            name: itemName,
            price: randomPrice,
            quantity: randomQuantity,
        };
    });

    return items;
}

export function getInsertItemsQuery() {
    const items = getItems();
    const itemValuesString = items
        .map((item) => `('${item.name}', ${item.price}, ${item.quantity})`)
        .join(",\n ");
    const insertDataString = `INSERT INTO items\n (item_name, item_price, item_quantity) VALUES ${itemValuesString}\nRETURNING *;`;

    return insertDataString;
}

// console.log(getInsertItemsQuery());
