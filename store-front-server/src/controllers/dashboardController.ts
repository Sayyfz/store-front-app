import { Request, Response } from 'express';
import Dashboard, { DatabaseQueries } from '../repositories/DashboardRepository';

class DashboardController {
    repository: DatabaseQueries;

    constructor(repository: DatabaseQueries) {
        this.repository = repository;
    }

    products_by_category = async (req: Request, res: Response) => {
        if (!req.params.categoryId) throw 'Please add a valid categoryId';
        const products = await this.repository.products_by_category(+req.params.categoryId);
        return res.status(200).json(products);
    };
    products_search = async (req: Request, res: Response) => {
        const { name } = req.query;
        const products = await this.repository.products_search(name as string);
        return res.status(200).json(products);
    };
}

export default new DashboardController(Dashboard);
