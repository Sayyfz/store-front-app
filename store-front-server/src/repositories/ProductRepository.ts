import { QueryResult } from 'pg';
import { productsPath } from '../constants/constants';
import client from '../database';
import { Product } from '../models/ProductModel';
import { deleteFile } from '../utils/deleteFile';
import { reformatProducts } from '../utils/Helpers';
import { throwErrorOnNotFound } from '../utils/ThrowError';
import IBaseRepository from './interfaces/IBaseRepository';

export class ProductRepository implements IBaseRepository<Product> {
    async index(): Promise<Product[]> {
        const conn = await client.connect();
        try {
            const sql = `SELECT products.*, product_images.id AS image_id, product_images.image_url AS image_url
            FROM products LEFT JOIN product_images ON products.id = product_images.product_id ORDER BY image_id`;
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'products');

            return reformatProducts(result.rows as Product[]) as Product[];
        } finally {
            conn.release();
        }
    }

    async show(idx: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql = `
            SELECT p.*, pi.id AS image_id, pi.image_url AS image_url
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            WHERE p.id = $1
          `;
            const result = await client.query(sql, [idx]);
            throwErrorOnNotFound(result, 'product', `Cannot find product with id ${idx}`);

            const product = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                price: result.rows[0].price,
                category_id: result.rows[0].category_id,
                images: [],
            };

            result.rows.forEach(row => {
                const { image_id, image_url } = row;
                if (image_id) {
                    //@ts-ignore
                    product.images.push({ id: image_id, imageUrl: image_url });
                }
            });

            return product;
        } finally {
            conn.release();
        }
    }

    async create(product: Product): Promise<Product> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
            ]);
            throwErrorOnNotFound(result, 'product');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<Product> {
        const conn = await client.connect();
        try {
            const deleteImgsql = 'DELETE FROM product_images WHERE product_id=($1) RETURNING *';
            const deleteImgResult = await conn.query(deleteImgsql, [id]);
            if (deleteImgResult.rows[0])
                deleteFile(`${productsPath}/${deleteImgResult.rows[0].image_url}`);

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
                'UPDATE products SET name=($1), price=($2), category_id=($3) WHERE id=($4) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
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
