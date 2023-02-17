"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQueries = void 0;
const database_1 = __importDefault(require("../../database"));
class DatabaseQueries {
    async current_orders_by_user(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
    }
    async completed_orders_by_user(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
    }
    async products_by_category(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by category ${category}: ${err}`);
        }
    }
}
exports.DatabaseQueries = DatabaseQueries;
