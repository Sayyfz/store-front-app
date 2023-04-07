"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRepository = void 0;
const database_1 = __importDefault(require("../database"));
const ThrowError_1 = require("../utils/ThrowError");
class CartItemRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM cart_items';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart Item');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async create(cartItem) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO cart_items(product_id, cart_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                cartItem.product_id,
                cartItem.cart_id,
                cartItem.quantity,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart Item');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM cart_items WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Cart Item');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.CartItemRepository = CartItemRepository;
exports.default = new CartItemRepository();
