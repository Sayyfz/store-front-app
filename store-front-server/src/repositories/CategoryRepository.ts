import { Category } from '../models/CategoryModel';
import IBaseRepository from './interfaces/IBaseRepository';
import client from '../database';
import { throwErrorOnNotFound } from '../utils/ThrowError';

export class CategoryRepository implements IBaseRepository<Category> {
    async index(): Promise<Category[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'Categories');

            return result.rows;
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<Category> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM categories WHERE id=$1';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'Category');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async create(category: Category): Promise<Category> {
        const conn = await client.connect();
        try {
            const sql = 'INSERT INTO categories(name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [category.name]);

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async update(id: string, category: Category): Promise<Category> {
        const conn = await client.connect();
        try {
            const checkSql = 'SELECT id FROM categories WHERE id=$1';
            const checkResult = await conn.query(checkSql, [id]);
            throwErrorOnNotFound(checkResult, 'Category');

            const sql = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *';
            const result = await conn.query(sql, [category.name, id]);
            throwErrorOnNotFound(result, 'Category');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<Category> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM categories WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'Category');

            return result.rows[0];
        } finally {
            conn.release();
        }
    }
}

export default new CategoryRepository();
