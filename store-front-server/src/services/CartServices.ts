import client from '../database';
import { throwErrorOnNotFound } from '../utils/ThrowError';

export class CartServices {
    async get_cart_with_items(user_id: string) {
        const conn = await client.connect();
        try {
            const sql = `
            SELECT c.id, p.id as product_id, p.name, p.price, p.category_id, i.image_url, c.total_price, c.user_id, c.order_status
            FROM carts c
            LEFT JOIN cart_items ci ON ci.cart_id = c.id
            LEFT JOIN products p ON p.id = ci.product_id
            RIGHT JOIN product_images i ON i.id = p.id
            WHERE c.user_id = $1 AND c.order_status=$2
            ORDER BY c.id DESC
            LIMIT 1
          `;

            const result = await conn.query(sql, [user_id, 'active']);
            throwErrorOnNotFound(result, 'cart');
            const cart = {
                id: result.rows[0].id,
                total_price: result.rows[0].total_price,
                user_id: result.rows[0].user_id,
                order_status: result.rows[0].order_status,
                cart_items: result.rows[0].product_id
                    ? result.rows.map(row => ({
                          id: row.product_id,
                          name: row.name,
                          price: row.price,
                          categoryId: row.category_id,
                          image_url: row.image_url,
                      }))
                    : [],
            };

            return cart;
        } finally {
            conn.release();
        }
    }

    async cart_checkout(cart_id: string) {
        // Delete cart and create a new one
        throw new Error('Not implemented');
    }
}

export default new CartServices();
