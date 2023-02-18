export class Product {
    id?: number;
    name: string;
    price: number;
    category: string;

    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
