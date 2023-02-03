import client from '../database';
import bcrypt from 'bcrypt';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot show users: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id = $1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot show user of id: ${id}: ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql =
                'INSERT INTO users (id, first_name, last_name, password) VALUES($1, $2, $3, $4)';

            //Do bcrypt stuff
            const result = await conn.query(sql, [
                user.id,
                user.firstName,
                user.lastName,
                user.password,
            ]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create user: ${err}`);
        }
    }
}
