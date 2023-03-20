"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DatabaseQueries {
    async current_orders_by_user(userId) {
        const conn = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [userId]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
        finally {
            conn.release();
        }
    }
    async completed_orders_by_user(userId) {
        const conn = await database_1.default.connect();
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
            const result = await conn.query(sql, [userId]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
        finally {
            conn.release();
        }
    }
    async products_by_category(category) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get orders by category ${category}: ${err}`);
        }
        finally {
            conn.release();
        }
    }
}
exports.DatabaseQueries = DatabaseQueries;
exports.default = new DatabaseQueries();
