"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor(total_price, user_id, order_status) {
        this.total_price = total_price;
        this.user_id = user_id;
        this.order_status = order_status;
    }
}
exports.Cart = Cart;
