import client from '../database';
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel';
import { throwErrorOnNotFound } from '../utils/NotFoundHandler';
import IBaseRepository from './interfaces/IBaseRepository';

export class UserRepository implements IBaseRepository<User> {
    async index(): Promise<User[]> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            throwErrorOnNotFound(result, 'users');

            return result.rows;
        } catch (err) {
            throw new Error(`Cannot show users: ${err}`);
        } finally {
            conn.release();
        }
    }

    async show(id: string): Promise<User> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'user');

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot show user of id: ${id}: ${err}`);
        } finally {
            conn.release();
        }
    }

    async create(user: User): Promise<User> {
        const conn = await client.connect();
        try {
            const sql =
                'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';

            const hash = bcrypt.hashSync(
                user.password + process.env.PEPPER,
                parseInt(process.env.SALT_ROUNDS || '10'),
            );
            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
            ]);
            throwErrorOnNotFound(result, 'user');

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create user: ${err}`);
        } finally {
            conn.release();
        }
    }

    async update(id: string, user: User): Promise<User> {
        const conn = await client.connect();
        try {
            const sql =
                'UPDATE users SET first_name=($1), last_name=($2), username=($3), password=($4) WHERE id=($5) RETURNING *';

            const hash = bcrypt.hashSync(
                user.password + process.env.PEPPER,
                parseInt(process.env.SALT_ROUNDS || '10'),
            );

            const result = await conn.query(sql, [
                user.firstName,
                user.lastName,
                user.username,
                hash,
                id,
            ]);
            throwErrorOnNotFound(result, 'user');

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot update user ${err}`);
        } finally {
            conn.release();
        }
    }

    async delete(id: string): Promise<User> {
        const conn = await client.connect();
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            throwErrorOnNotFound(result, 'user');

            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot delete user of id ${id}: ${err}`);
        } finally {
            conn.release();
        }
    }

    async authenticate(username: string, password: string): Promise<User | undefined> {
        const conn = await client.connect();
        try {
            const sql = 'SELECT password FROM users WHERE username=$1';
            const result = await conn.query(sql, [username]);
            throwErrorOnNotFound(result, 'user');

            const user = result.rows[0];
            if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) return user;
        } catch (err) {
            throw err;
        } finally {
            conn.release();
        }
    }
}

export default new UserRepository();
