"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImageRepository = void 0;
const database_1 = __importDefault(require("../database"));
const constants_1 = require("../constants/constants");
const ThrowError_1 = require("../utils/ThrowError");
const deleteFile_1 = require("../utils/deleteFile");
class ProductImageRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM product_images';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Product Image');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT * FROM product_images WHERE id=$1';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Product Image');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(product_img) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'INSERT INTO product_images(image_url, product_id) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [product_img.image_url, product_img.product_id]);
            return result.rows[0];
        }
        catch (error) {
            (0, deleteFile_1.deleteFile)(`${constants_1.productsPath}/${product_img.image_url}`);
            throw error;
        }
        finally {
            conn.release();
        }
    }
    async update(id, product_img) {
        const conn = await database_1.default.connect();
        try {
            const checkSql = 'SELECT id FROM product_images WHERE id=$1';
            const checkResult = await conn.query(checkSql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(checkResult, 'Product Image');
            const sql = 'UPDATE product_images SET image_url=$1, product_id=$2 WHERE id=$3 RETURNING *';
            const result = await conn.query(sql, [
                product_img.image_url,
                product_img.product_id,
                id,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Product Image');
            return result.rows[0];
        }
        catch (error) {
            (0, deleteFile_1.deleteFile)(`${constants_1.productsPath}/${product_img.image_url}`);
            throw error;
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const imageSql = 'SELECT image_url FROM product_image WHERE id=$!';
            const imageResult = await conn.query(imageSql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(imageResult, 'image');
            (0, deleteFile_1.deleteFile)(`${constants_1.productsPath}/${imageResult.rows[0].image_url}`);
            const sql = 'DELETE FROM product_images WHERE id=$1 RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'Product Image');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
}
exports.ProductImageRepository = ProductImageRepository;
exports.default = new ProductImageRepository();
