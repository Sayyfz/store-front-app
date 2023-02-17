import UserRepo, { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class UserController {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response) => {
        try {
            const users = await this.repository.index();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    show = async (req: Request, res: Response) => {
        try {
            const user = await this.repository.show(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    create = async (req: Request, res: Response) => {
        const user: User = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
        };

        try {
            const newUser = await this.repository.create(user);
            const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
            return res.status(201).json(token);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    update = async (req: Request, res: Response) => {
        const user: User = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
        };

        try {
            const newUser = await this.repository.update(req.params.id, user);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const user = await this.repository.delete(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    authenticate = async (req: Request, res: Response) => {
        try {
            const user = await this.repository.authenticate(req.body.username, req.body.password);
            const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
            return res.status(200).json(token);
        } catch (err) {
            const error = err as loginErr;
            if (error.status === 400) {
                return res.status(400).json(error.err);
            } else if (error.status === 401) {
                return res.status(401).json(error.err);
            }
        }
    };
}

export default new UserController(UserRepo);

type loginErr = {
    err: string;
    status: number;
};
