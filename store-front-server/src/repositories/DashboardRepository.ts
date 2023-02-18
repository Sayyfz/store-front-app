import client from '../database';
import { Order } from '../models/OrderModel';
import { Product } from '../models/ProductModel';

export class DatabaseQueries {
    async current_orders_by_user(userId: number): Promise<Order[]> {
        const conn = await client.connect();
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [userId]);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        } finally {
            conn.release();
        }
    }

    async completed_orders_by_user(userId: number): Promise<Order[]> {
        const conn = await client.connect();
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
            const result = await conn.query(sql, [userId]);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        } finally {
            conn.release();
        }
    }

    async products_by_category(category: string): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by category ${category}: ${err}`);
        } finally {
            conn.release();
        }
    }
}

export default new DatabaseQueries();
