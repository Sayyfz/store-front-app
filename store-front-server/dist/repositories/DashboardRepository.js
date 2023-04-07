"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQueries = void 0;
const database_1 = __importDefault(require("../database"));
const Helpers_1 = require("../utils/Helpers");
class DatabaseQueries {
    // async current_orders_by_user(userId: number): Promise<Order[]> {
    //     const conn = await client.connect();
    //     try {
    //         const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
    //         const result = await conn.query(sql, [userId]);
    //         return result.rows;
    //     } catch (err) {
    //         throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
    //     } finally {
    //         conn.release();
    //     }
    // }
    // async completed_orders_by_user(userId: number): Promise<Order[]> {
    //     const conn = await client.connect();
    //     try {
    //         const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
    //         const result = await conn.query(sql, [userId]);
    //         return result.rows;
    //     } catch (err) {
    //         throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
    //     } finally {
    //         conn.release();
    //     }
    // }
    async products_by_category(categoryId) {
        const conn = await database_1.default.connect();
        try {
            const sql = `SELECT p.*, pi.image_url, pi.id as image_id FROM products p LEFT JOIN product_images pi ON p.id=pi.product_id
                RIGHT JOIN categories ON p.category_id=categories.id WHERE category_id=$1`;
            const result = await conn.query(sql, [categoryId]);
            return (0, Helpers_1.reformatProducts)(result.rows);
        }
        finally {
            conn.release();
        }
    }
    async products_search(query) {
        const conn = await database_1.default.connect();
        try {
            const sql = `SELECT p.*, pi.image_url, pi.id as image_id FROM products p LEFT JOIN product_images pi
            ON p.id=pi.product_id WHERE name LIKE $1`;
            const result = await conn.query(sql, [`%${query}%`]);
            return (0, Helpers_1.reformatProducts)(result.rows);
        }
        finally {
            conn.release();
        }
    }
}
exports.DatabaseQueries = DatabaseQueries;
exports.default = new DatabaseQueries();
