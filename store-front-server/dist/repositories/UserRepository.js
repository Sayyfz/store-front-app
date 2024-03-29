"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ThrowError_1 = require("../utils/ThrowError");
class UserRepository {
    async index() {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT first_name, last_name, username FROM users';
            const result = await conn.query(sql);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'users');
            return result.rows;
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'SELECT first_name, last_name, username FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'user', `Cannot find user with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async create(user) {
        const conn = await database_1.default.connect();
        try {
            await database_1.default.query('BEGIN');
            const sql = `INSERT INTO users(first_name, last_name, username, password)
                VALUES($1, $2, $3, $4)
                RETURNING first_name, last_name, username;
                `;
            const hash = bcrypt_1.default.hashSync(user.password + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS || '10'));
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'user');
            const createCartSql = 'INSERT INTO carts(total_price, user_id, order_status) VALUES($1, $2, $3) RETURNING *';
            await conn.query(createCartSql, [0, result.rows[0].id, 'active']);
            console.log(result.rows[0].id);
            await database_1.default.query('COMMIT');
            return result.rows[0];
        }
        catch (err) {
            await database_1.default.query('ROLLBACK');
            throw err;
        }
        finally {
            conn.release();
        }
    }
    async update(id, user) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'UPDATE users SET first_name=($1), last_name=($2), username=($3), password=($4) WHERE id=($5) RETURNING first_name, last_name, username';
            const hash = bcrypt_1.default.hashSync(user.password + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS || '10'));
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
                id,
            ]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'user');
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'user', `Cannot find user with id ${id}`);
            return result.rows[0];
        }
        finally {
            conn.release();
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        let user;
        try {
            const sql = 'SELECT * FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            (0, ThrowError_1.throwErrorOnNotFound)(result, 'user', 'Incorrect username');
            user = result.rows[0];
            if (!bcrypt_1.default.compareSync(password + process.env.PEPPER, user.password))
                (0, ThrowError_1.throwValidationError)('Password is not correct');
            return user;
        }
        finally {
            conn.release();
        }
    }
}
exports.UserRepository = UserRepository;
exports.default = new UserRepository();
