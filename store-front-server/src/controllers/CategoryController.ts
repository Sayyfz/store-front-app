import CategoryRepo, { CategoryRepository } from '../repositories/CategoryRepository';
import { Response, Request, NextFunction, response } from 'express';
import { Category } from '../models/CategoryModel';
import { checkErrorAndNext } from '../utils/Helpers';
class CategoryController {
    private repository: CategoryRepository;
    constructor(repository: CategoryRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const categories = await this.repository.index();
        return res.status(200).json(categories);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const category = await this.repository.show(req.params.id);
        return res.status(200).json(category);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCategory: Category = req.body;
            const category = await this.repository.create(newCategory);
            return res.status(201).json(category);
        } catch (error) {
            checkErrorAndNext(error as Error, 'category', next);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCategory: Category = req.body;
            const category = await this.repository.update(req.params.id, newCategory);
            return res.status(200).json(category);
        } catch (error) {
            checkErrorAndNext(error as Error, 'category', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deletedCat = await this.repository.delete(req.params.id);
        return res.status(200).json(deletedCat);
    };
}

export default new CategoryController(CategoryRepo);
