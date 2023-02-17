import { Request, Response } from 'express';
import { OrderStore } from '../models/order';

const store = new OrderStore();

export const index = async (req: Request, res: Response) => {
    try {
        const order = await store.index();
        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const create = async (req: Request, res: Response) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };

    try {
        const newOrder = await store.create(order);
        return res.status(200).json(newOrder);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const order_id = parseInt(req.params.id);
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;

    try {
        const newProduct = await store.addProduct(quantity, order_id, product_id);
        return res.status(200).json(newProduct);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
