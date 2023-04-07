"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const database_1 = __importDefault(require("../database"));
const ThrowError_1 = require("../utils/ThrowError");
class CategoryRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM categories';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Categories');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM categories WHERE id=$1';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Category');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(category) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO categories(name) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [category.name]);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async update(id, category) {
        const conn = await database_1.default.connect();
        try {
            const checkSql = 'SELECT id FROM categories WHERE id=$1';
            const checkResult = await conn.query(checkSql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResult, 'Category');
            const sql = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *';
            const result = await conn.query(sql, [category.name, id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Category');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM categories WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Category');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.CategoryRepository = CategoryRepository;
exports.default = new CategoryRepository();
