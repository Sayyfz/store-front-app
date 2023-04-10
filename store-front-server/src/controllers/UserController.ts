import UserRepo, { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { checkErrorAndNext } from '../utils/Helpers';
import CartServices from '../services/CartServices';

class UserController {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.repository.index();
        return res.status(200).json(users);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.repository.show(req.params.id);
        return res.status(200).json(user);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        const user: User = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
        };
        try {
            let newUser = await this.repository.create(user);
            const cart = await CartServices.get_cart_with_items(newUser.id as string);
            // @ts-ignore
            newUser = {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
            };
            const token = jwt.sign({ user: newUser, cart }, process.env.TOKEN_SECRET as string);
            return res.status(201).json(token);
        } catch (err) {
            checkErrorAndNext(err as Error, 'User', next);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
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
            checkErrorAndNext(err as Error, 'User', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.repository.delete(req.params.id);
        return res.status(200).json(user);
    };

    authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.repository.authenticate(req.body.username, req.body.password);
        const cart = await CartServices.get_cart_with_items(user.id as string);
        const token = jwt.sign({ user, cart }, process.env.TOKEN_SECRET as string);
        return res.status(200).json(token);
    };
}

export default new UserController(UserRepo);
