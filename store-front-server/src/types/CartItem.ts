export interface CartItem {
    id: string;
    product_id: string;
    cart_id: string;
    quantity: number;
    // frontend should have price and name keys  (appended on request)
}
