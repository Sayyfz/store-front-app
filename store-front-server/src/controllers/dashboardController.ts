import { Request, Response } from 'express';
import Dashboard, { DatabaseQueries } from '../repositories/DashboardRepository';

class DashboardController {
    repository: DatabaseQueries;

    constructor(repository: DatabaseQueries) {
        this.repository = repository;
    }

    current_orders_by_user = async (req: Request, res: Response) => {
        try {
            const orders = await this.repository.current_orders_by_user(parseInt(req.params.id));
            return res.status(200).json(orders);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    completed_orders_by_user = async (req: Request, res: Response) => {
        try {
            const orders = await this.repository.completed_orders_by_user(parseInt(req.params.id));
            return res.status(200).json(orders);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    products_by_category = async (req: Request, res: Response) => {
        try {
            if (!req.params.category) throw 'Please add a valid category';
            const products = await this.repository.products_by_category(
                (req.params.category as string).toLowerCase(),
            );
            return res.status(200).json(products);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };
}

export default new DashboardController(Dashboard);
