export class ProductImage {
    id?: string;
    image_url?: string;
    product_id: string;

    constructor(image_url: string, product_id: string) {
        this.image_url = image_url;
        this.product_id = product_id;
    }
}
