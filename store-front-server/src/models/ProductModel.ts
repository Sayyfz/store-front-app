export class Product {
    id?: string;
    name: string;
    price: number;
    category: string;
    img?: string;

    constructor(name: string, price: number, category: string, img: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.img = img;
    }
}
