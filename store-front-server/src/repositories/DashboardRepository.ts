import client from '../database';
import { Product } from '../models/ProductModel';
import { reformatProducts } from '../utils/Helpers';

export class DatabaseQueries {
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

    async products_by_category(categoryId: number): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = `SELECT p.*, pi.image_url, pi.id as image_id FROM products p LEFT JOIN product_images pi ON p.id=pi.product_id
                RIGHT JOIN categories ON p.category_id=categories.id WHERE category_id=$1`;
            const result = await conn.query(sql, [categoryId]);

            return reformatProducts(result.rows) as Product[];
        } finally {
            conn.release();
        }
    }

    async products_search(query: string): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = `SELECT p.*, pi.image_url, pi.id as image_id FROM products p LEFT JOIN product_images pi
            ON p.id=pi.product_id WHERE name LIKE $1`;
            const result = await conn.query(sql, [`%${query}%`]);
            return reformatProducts(result.rows) as Product[];
        } finally {
            conn.release();
        }
    }
}

export default new DatabaseQueries();
