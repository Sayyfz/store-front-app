import { CartItem } from '../types/CartItem';

export class Cart {
    id?: string;
    total_price: number;
    user_id: number;
    order_status: string;

    constructor(total_price: number, user_id: number, order_status: string) {
        this.total_price = total_price;
        this.user_id = user_id;
        this.order_status = order_status;
    }
}
