import client from '../database';
import { Product } from '../models/ProductModel';
import { throwErrorOnNotFound } from '../utils/ThrowError';
import IBaseRepository from './interfaces/IBaseRepository';

export class ProductRepository implements IBaseRepository<Product> {
    async index(): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'products');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'product', `Cannot find product with id ${id}`);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(product: Product): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            throwErrorOnNotFound(result, 'product');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'product', `Cannot find product with id ${id}`);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async update(id: string, product: Product): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql =
                'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
                id,
            ]);
            throwErrorOnNotFound(result, 'product');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}

export default new ProductRepository();
