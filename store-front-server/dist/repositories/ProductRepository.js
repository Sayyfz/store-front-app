"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const database_1 = __importDefault(require("../database"));
const ThrowError_1 = require("../utils/ThrowError");
class ProductRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'products');
            const productsWithImageUrls = result.rows.map((product) => {
                return {
                    ...product,
                    img: `/images/${product.img}`,
                };
            });
            return productsWithImageUrls;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'product', `Cannot find product with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(product) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO products (name, price, category, img) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
                product.img,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'product');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'product', `Cannot find product with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async update(id, product) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'UPDATE products SET name=($1), price=($2), category=($3), img=($4) WHERE id=($5) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
                product.img,
                id,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'product');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.ProductRepository = ProductRepository;
exports.default = new ProductRepository();
