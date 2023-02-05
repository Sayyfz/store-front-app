import { Request, Response } from 'express';
import { DatabaseQueries } from '../models/services/dashboard';

const dashboard = new DatabaseQueries();

export const current_orders_by_user = async (req: Request, res: Response) => {
    try {
        const orders = await dashboard.current_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const completed_orders_by_user = async (req: Request, res: Response) => {
    try {
        const orders = await dashboard.completed_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};

export const products_by_category = async (req: Request, res: Response) => {
    try {
        if (!req.params.category) throw 'Please add a valid category';
        const products = await dashboard.products_by_category(
            (req.params.category as string).toLowerCase(),
        );
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
