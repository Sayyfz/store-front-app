import { ProductType } from './Product';

export interface CartType {
    id: number;
    total_price: number;
    user_id: number;
    order_status: string;
    cart_items: CartItem[];
}

export interface CartItem extends ProductType {
    image_url: string;
    quantity: number;
}
