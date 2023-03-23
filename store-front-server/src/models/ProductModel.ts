export class Product {
    id?: string;
    name: string;
    price: number;
    category_id: string;
    img?: string;

    constructor(name: string, price: number, category_id: string, img: string) {
        this.name = name;
        this.price = price;
        this.category_id = category_id;
        this.img = img;
    }
}
