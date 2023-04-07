"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const database_1 = __importDefault(require("../database"));
const ThrowError_1 = require("../utils/ThrowError");
class CartRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM carts';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(user_id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM carts WHERE user_id=$1';
            const result = await conn.query(sql, [user_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(cart) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO carts(total_price, user_id, order_status) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                cart.total_price,
                cart.user_id,
                cart.order_status,
            ]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async update(user_id, cart) {
        const conn = await database_1.default.connect();
        try {
            const checkSql = 'SELECT id FROM carts WHERE user_id=$1';
            const checkResult = await conn.query(checkSql, [user_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResult, 'Cart');
            const sql = 'UPDATE carts SET total_price=$1, user_id=$2, order_status=$3 WHERE user_id=$2 RETURNING *';
            const result = await conn.query(sql, [
                cart.total_price,
                cart.user_id,
                cart.order_status,
                user_id,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(user_id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM carts WHERE user_id=$1 RETURNING *';
            const result = await conn.query(sql, [user_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async addProduct(quantity, cart_id, product_id) {
        const conn = await database_1.default.connect();
        try {
            const checkSql = 'SELECT order_status FROM carts WHERE id=$1';
            const checkResult = await conn.query(checkSql, [cart_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResult, 'cart');
            const checkSqlProduct = 'SELECT id FROM products WHERE id=$1';
            const checkResultProduct = await conn.query(checkSqlProduct, [cart_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResultProduct, 'product');
            if (checkResult.rows[0].order_status === 'complete') {
                (0, ThrowError_1.throwBadRequestError)(`Cannot add product ${product_id} to order ${cart_id} since it is a completed order`);
            }
            const checkCartItemSql = 'SELECT id FROM cart_items WHERE product_id=$1 AND cart_id=$2';
            const checkCartItemResult = await conn.query(checkCartItemSql, [product_id, cart_id]);
            const cartItem = checkCartItemResult.rows[0];
            if (cartItem) {
                // Add to quantity if product is added to cart already
                const sql = 'UPDATE cart_items SET quantity=$1 + quantity WHERE id=$2 RETURNING *';
                const result = await conn.query(sql, [quantity, cartItem.id]);
                return result.rows[0];
            }
            else {
                const sql = 'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                const result = await conn.query(sql, [cart_id, product_id, quantity]);
                return result.rows[0];
            }
        }
        finally {
            conn.release();
        }
    }
    async delete_item_from_cart(id, product_id) {
        const conn = await database_1.default.connect();
        try {
            const sql = `DELETE FROM cart_items WHERE cart_id=$1 AND product_id=$2`;
            const result = await conn.query(sql, [id, product_id]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.CartRepository = CartRepository;
exports.default = new CartRepository();
