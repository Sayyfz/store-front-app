import { UserStore, User } from '../models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
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
        password: req.body.password,
    };

    try {
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        return res.status(200).json(token);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
