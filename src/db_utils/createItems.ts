

export interface DbItem {
    name: string;
    price: number;
    quantity: number;
}

export function getItems() {
    const itemNames = [
        'Shoes', 'Backpack', 'Phone', 'Laptop', 'Sunglasses', 'Headphones', 'Gaming Console', 'Watch', 'Camera', 'Jacket',
        'Jeans', 'T-shirt', 'Dress', 'Skirt', 'Sweater', 'Sneakers', 'Guitar', 'Bicycle', 'Books', 'Toothbrush', 'Toothpaste',
        'Shampoo', 'Conditioner', 'Groceries', 'Furniture', 'Bedding', 'Cookware', 'Plant', 'Paintings', 'Fitness Equipment',
        'Coffee Maker', 'Vacuum Cleaner', 'Microwave', 'Candles', 'Perfume', 'Chocolates', 'Wine', 'Bicycle', 'Car', 'Motorcycle',
        'Tickets', 'Concert Tickets', 'Movie Tickets', 'Jewelry', 'Gardening Tools', 'Board Games', 'Sports Equipment', 'Art Supplies',
        'Pet Supplies', 'Hiking Boots', 'Swimsuit'
      ];

      const items: DbItem[] = itemNames.map((itemName) => {
        
        const randomPrice = Math.random() * Math.random() * 10;
        const randomQuantity =  Math.floor(Math.random() * 20);

        return {
            name: itemName,
            price: randomPrice,
            quantity: randomQuantity,
        }
      })
      
      
    
    
    return items
}