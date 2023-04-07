"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const constants_1 = require("../constants/constants");
const database_1 = __importDefault(require("../database"));
const deleteFile_1 = require("../utils/deleteFile");
const Helpers_1 = require("../utils/Helpers");
const ThrowError_1 = require("../utils/ThrowError");
class ProductRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = `SELECT products.*, product_images.id AS image_id, product_images.image_url AS image_url
            FROM products LEFT JOIN product_images ON products.id = product_images.product_id`;
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'products');
            return (0, Helpers_1.reformatProducts)(result.rows);
        }
        finally {
            conn.release();
        }
    }
    async show(idx) {
        const conn = await database_1.default.connect();
        try {
            const sql = `
            SELECT p.*, pi.id AS image_id, pi.image_url AS image_url
            FROM products p
            LEFT JOIN product_images pi ON p.id = pi.product_id
            WHERE p.id = $1
          `;
            const result = await database_1.default.query(sql, [idx]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'product', `Cannot find product with id ${idx}`);
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
        }
        finally {
            conn.release();
        }
    }
    async create(product) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
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
            const deleteImgsql = 'DELETE FROM product_images WHERE product_id=($1) RETURNING *';
            const deleteImgResult = await conn.query(deleteImgsql, [id]);
            if (deleteImgResult.rows[0])
                (0, deleteFile_1.deleteFile)(`${constants_1.productsPath}/${deleteImgResult.rows[0].image_url}`);
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
            const sql = 'UPDATE products SET name=($1), price=($2), category_id=($3) WHERE id=($4) RETURNING *';
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category_id,
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
