import client from '../database';
import { CartItem } from '../types/CartItem';
import { throwErrorOnNotFound } from '../utils/ThrowError';

export class CartItemRepository {
    async index(): Promise<CartItem[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM cart_items';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'Cart Item');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async create(cartItem: CartItem): Promise<CartItem> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO cart_items(product_id, cart_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                cartItem.product_id,
                cartItem.cart_id,
                cartItem.quantity,
            ]);
            throwErrorOnNotFound(result, 'Cart Item');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<CartItem> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM cart_items WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'Cart Item');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}

export default new CartItemRepository();
