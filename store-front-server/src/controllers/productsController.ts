import { Request, Response } from 'express';
import { ProductStore } from '../models/product';

const store = new ProductStore();

export const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const create = async (req: Request, res: Response) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: (req.body.category as string).toLowerCase(),
    };
    try {
        const newProduct = await store.create(product);
        return res.status(200).json(newProduct);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
