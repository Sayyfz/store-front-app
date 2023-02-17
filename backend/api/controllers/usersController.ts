import { UserStore, User } from '../models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
    };

    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        return res.status(201).json(token);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body.username, req.body.password);
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
        return res.status(200).json(token);
    } catch (err) {
        const error = err as loginErr;
        console.log(error);
        if (error.status === 400) {
            return res.status(400).json(error.err);
        } else if (error.status === 401) {
            return res.status(401).json(error.err);
        }
    }
};

type loginErr = {
    err: string;
    status: number;
};
