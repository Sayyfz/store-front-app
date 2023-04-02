import { Cart } from '../models/CartModel';
import IBaseRepository from './interfaces/IBaseRepository';
import client from '../database';
import { throwBadRequestError, throwErrorOnNotFound } from '../utils/ThrowError';

export class CartRepository implements IBaseRepository<Cart> {
    async index(): Promise<Cart[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM carts';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'Cart');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(user_id: string): Promise<Cart> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM carts WHERE user_id=$1';
            const result = await conn.query(sql, [user_id]);
            throwErrorOnNotFound(result, 'Cart');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(cart: Cart): Promise<Cart> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO carts(total_price, user_id, order_status) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                cart.total_price,
                cart.user_id,
                cart.order_status,
            ]);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async update(user_id: string, cart: Cart): Promise<Cart> {
        const conn = await client.connect();
        try {
            const checkSql = 'SELECT id FROM carts WHERE user_id=$1';
            const checkResult = await conn.query(checkSql, [user_id]);
            throwErrorOnNotFound(checkResult, 'Cart');

            const sql =
                'UPDATE carts SET total_price=$1, user_id=$2, order_status=$3 WHERE user_id=$2 RETURNING *';
            const result = await conn.query(sql, [
                cart.total_price,
                cart.user_id,
                cart.order_status,
                user_id,
            ]);
            throwErrorOnNotFound(result, 'Cart');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(user_id: string): Promise<Cart> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM carts WHERE user_id=$1 RETURNING *';
            const result = await conn.query(sql, [user_id]);
            throwErrorOnNotFound(result, 'Cart');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async addProduct(
        quantity: number,
        cart_id: string,
        product_id: string,
    ): Promise<{ quantity: number; product_id: string; cart_id: string }> {
        const conn = await client.connect();
        try {
            const checkSql = 'SELECT order_status FROM carts WHERE id=$1';
            const checkResult = await conn.query(checkSql, [cart_id]);
            throwErrorOnNotFound(checkResult, 'cart');

            const checkSqlProduct = 'SELECT id FROM products WHERE id=$1';
            const checkResultProduct = await conn.query(checkSqlProduct, [cart_id]);
            throwErrorOnNotFound(checkResultProduct, 'product');

            if (checkResult.rows[0].order_status === 'complete') {
                throwBadRequestError(
                    `Cannot add product ${product_id} to order ${cart_id} since it is a completed order`,
                );
            }

            const checkCartItemSql = 'SELECT id FROM cart_items WHERE product_id=$1 AND cart_id=$2';
            const checkCartItemResult = await conn.query(checkCartItemSql, [product_id, cart_id]);
            const cartItem = checkCartItemResult.rows[0];

            if (cartItem) {
                // Add to quantity if product is added to cart already
                const sql = 'UPDATE cart_items SET quantity=$1 + quantity WHERE id=$2 RETURNING *';
                const result = await conn.query(sql, [quantity, cartItem.id]);
                return result.rows[0];
            } else {
                const sql =
                    'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                const result = await conn.query(sql, [cart_id, product_id, quantity]);
                return result.rows[0];
            }
        } finally {
            conn.release();
        }
    }
}

export default new CartRepository();
