import { productsPath } from '../constants/constants';
import { DatabaseError } from 'pg-protocol';
import client from '../database';
import { Product } from '../models/ProductModel';
import { deleteFile } from '../utils/deleteFile';
import { throwErrorOnNotFound } from '../utils/ThrowError';
import IBaseRepository from './interfaces/IBaseRepository';

export class ProductRepository implements IBaseRepository<Product> {
    async index(): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'products');

            const productsWithImageUrls = result.rows.map((product: Product) => {
                return {
                    ...product,
                    img: `/images/${product.img}`,
                };
            });
            return productsWithImageUrls;
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
                'INSERT INTO products (name, price, category_id, img) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
                product.img,
            ]);
            throwErrorOnNotFound(result, 'product');

            return result.rows[0];
        } catch (error) {
            const imgPath = `${productsPath}/${product.img}`;
            deleteFile(imgPath);

            throw error;
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const imageSql = 'SELECT img FROM products WHERE id=$1';
            const imageResult = await conn.query(imageSql, [id]);
            throwErrorOnNotFound(imageResult, 'Product');
            deleteFile(`${productsPath}/${imageResult.rows[0].img}`);

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
                'UPDATE products SET name=($1), price=($2), category_id=($3), img=($4) WHERE id=($5) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
                product.img,
                id,
            ]);
            throwErrorOnNotFound(result, 'product');

            return result.rows[0];
        } catch (error) {
            if ((error as DatabaseError).code === '23505') {
                const imgPath = `${productsPath}/${product.img}`;
                deleteFile(imgPath);
            }
            throw error;
        } finally {
            conn.release();
        }
    }
}

export default new ProductRepository();
