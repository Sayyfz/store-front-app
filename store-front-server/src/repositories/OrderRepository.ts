import client from '../database';
import IBaseRepository from './interfaces/IBaseRepository';
import { Order } from '../models/OrderModel';
import { throwBadRequestError, throwErrorOnNotFound } from '../utils/ThrowError';

export class OrderRepository implements IBaseRepository<Order> {
    async index(): Promise<Order[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'orders');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<Order> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'order', `Cannot find order with id ${id}`);
            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(order: Order): Promise<Order> {
        const conn = await client.connect();
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.status]);
            throwErrorOnNotFound(result, 'order');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<Order> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'order', `Cannot find order with id ${id}`);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async update(id: string, newOrder: Order): Promise<Order> {
        const conn = await client.connect();

        try {
            const checkUsersql = 'SELECT * FROM users WHERE id=($1)';
            const checkUserResult = await conn.query(checkUsersql, [newOrder.user_id]);
            throwErrorOnNotFound(checkUserResult, 'user');

            const sql = 'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
            const result = await conn.query(sql, [newOrder.user_id, newOrder.status, id]);
            throwErrorOnNotFound(result, 'order');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async addProduct(
        quantity: number,
        order_id: string,
        product_id: string,
    ): Promise<{ quantity: number; product_id: string; order_id: string }> {
        const conn = await client.connect();
        try {
            const checkSql = 'SELECT status FROM orders WHERE id=$1';
            const checkResult = await conn.query(checkSql, [order_id]);
            throwErrorOnNotFound(checkResult, 'order');

            if (checkResult.rows[0].status === 'complete') {
                throwBadRequestError(
                    `Cannot add product ${product_id} to order ${order_id} since it is a completed order`,
                );
            }

            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [order_id, product_id, quantity]);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}

export default new OrderRepository();
