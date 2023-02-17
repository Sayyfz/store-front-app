import client from '../../database';
import { Order } from '../order';
import { Product } from '../product';

export class DatabaseQueries {
    async current_orders_by_user(userId: number): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
            const result = await conn.query(sql, [userId]);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
    }

    async completed_orders_by_user(userId: number): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
            const result = await conn.query(sql, [userId]);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by user: ${userId}: ${err}`);
        }
    }

    async products_by_category(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders by category ${category}: ${err}`);
        }
    }
}
