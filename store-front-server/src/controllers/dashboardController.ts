import { Request, Response } from 'express';
import Dashboard, { DatabaseQueries } from '../repositories/DashboardRepository';

class DashboardController {
    repository: DatabaseQueries;

    constructor(repository: DatabaseQueries) {
        this.repository = repository;
    }

    current_orders_by_user = async (req: Request, res: Response) => {
        const orders = await this.repository.current_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    };

    completed_orders_by_user = async (req: Request, res: Response) => {
        const orders = await this.repository.completed_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    };

    products_by_category = async (req: Request, res: Response) => {
        if (!req.params.category) throw 'Please add a valid category';
        const products = await this.repository.products_by_category(
            (req.params.category as string).toLowerCase(),
        );
        return res.status(200).json(products);
    };
    products_search = async (req: Request, res: Response) => {
        const { name } = req.query;
        const products = await this.repository.products_search(name as string);
        return res.status(200).json(products);
    };
}

export default new DashboardController(Dashboard);
