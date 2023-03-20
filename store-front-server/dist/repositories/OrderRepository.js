"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const database_1 = __importDefault(require("../database"));
const ThrowError_1 = require("../utils/ThrowError");
class OrderRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'orders');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'order', `Cannot find order with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(order) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.status]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'order');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'order', `Cannot find order with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async update(id, newOrder) {
        const conn = await database_1.default.connect();
        try {
            const checkUsersql = 'SELECT * FROM users WHERE id=($1)';
            const checkUserResult = await conn.query(checkUsersql, [newOrder.user_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkUserResult, 'user');
            const sql = 'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
            const result = await conn.query(sql, [newOrder.user_id, newOrder.status, id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'order');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async addProduct(quantity, order_id, product_id) {
        const conn = await database_1.default.connect();
        try {
            const checkSql = 'SELECT status FROM orders WHERE id=$1';
            const checkResult = await conn.query(checkSql, [order_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResult, 'order');
            const checkSqlProduct = 'SELECT id FROM products WHERE id=$1';
            const checkResultProduct = await conn.query(checkSqlProduct, [order_id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResultProduct, 'product');
            if (checkResult.rows[0].status === 'complete') {
                (0, ThrowError_1.throwBadRequestError)(`Cannot add product ${product_id} to order ${order_id} since it is a completed order`);
            }
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.OrderRepository = OrderRepository;
exports.default = new OrderRepository();
