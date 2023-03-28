import { ProductImage } from '../models/ProductImageModel';
import IBaseRepository from './interfaces/IBaseRepository';
import client from '../database';
import { productsPath } from '../constants/constants';
import { throwErrorOnNotFound } from '../utils/ThrowError';
import { deleteFile } from '../utils/deleteFile';

export class ProductImageRepository implements IBaseRepository<ProductImage> {
    async index(): Promise<ProductImage[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM product_images';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'Product Image');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<ProductImage> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM product_images WHERE id=$1';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'Product Image');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(product_img: ProductImage): Promise<ProductImage> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO product_images(image_url, product_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [product_img.image_url, product_img.product_id]);

            return result.rows[0];
        } catch (error) {
            deleteFile(`${productsPath}/${product_img.image_url}`);
            throw error;
        } finally {
            conn.release();
        }
    }

    async update(id: string, product_img: ProductImage): Promise<ProductImage> {
        const conn = await client.connect();
        try {
            const checkSql = 'SELECT id FROM product_images WHERE id=$1';
            const checkResult = await conn.query(checkSql, [id]);
            throwErrorOnNotFound(checkResult, 'Product Image');

            const sql =
                'UPDATE product_images SET image_url=$1, product_id=$2 WHERE id=$3 RETURNING *';
            const result = await conn.query(sql, [
                product_img.image_url,
                product_img.product_id,
                id,
            ]);
            throwErrorOnNotFound(result, 'Product Image');

            return result.rows[0];
        } catch (error) {
            deleteFile(`${productsPath}/${product_img.image_url}`);
            throw error;
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<ProductImage> {
        const conn = await client.connect();
        try {
            const imageSql = 'SELECT image_url FROM product_image WHERE id=$!';
            const imageResult = await conn.query(imageSql, [id]);
            throwErrorOnNotFound(imageResult, 'image');
            deleteFile(`${productsPath}/${imageResult.rows[0].image_url}`);

            const sql = 'DELETE FROM product_images WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'Product Image');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}

export default new ProductImageRepository();
