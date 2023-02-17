"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot show users: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot show user of id: ${id}: ${err}`);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + process.env.PEPPER, parseInt(process.env.SALT_ROUNDS || '10'));
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create user: ${err}`);
        }
    }
    async authenticate(username, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + process.env.PEPPER, user.password))
                    return user;
                throw { err: 'Incorrect Password', status: 401 };
            }
            else
                throw { err: `username ${username} doesn't exist`, status: 400 };
        }
        catch (err) {
            throw err;
        }
    }
}
exports.UserStore = UserStore;
