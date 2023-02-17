import client from '../database';

export interface Order {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot preview orders: ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.status]);
            result.rows[0].user_id = parseInt(result.rows[0].user_id);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create order: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            result.rows[0].user_id = parseInt(result.rows[0].user_id);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot preview order of id ${id}: ${err}`);
        }
    }

    async addProduct(
        quantity: number,
        order_id: number,
        product_id: number,
    ): Promise<{ quantity: number; product_id: number; order_id: number }> {
        try {
            const conn = await client.connect();

            const checkSql = 'SELECT status FROM orders WHERE id=$1';
            const checkResult = await conn.query(checkSql, [order_id]);
            if (checkResult.rows[0].status === 'complete') {
                throw 'Error: Cannot add product to a completed order';
            }

            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);
            const order_product = result.rows[0];
            order_product.order_id = parseInt(order_product.order_id);
            order_product.product_id = parseInt(order_product.product_id);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot add product ${product_id} to order ${order_id} ${err}`);
        }
    }
}
