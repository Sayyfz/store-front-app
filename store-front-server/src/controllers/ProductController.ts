import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/ProductModel';
import ProductRepo, { ProductRepository } from '../repositories/ProductRepository';
import { checkErrorAndNext } from '../utils/Helpers';

class ProductController {
    repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const products = await this.repository.index();
        return res.status(200).json(products);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const product = await this.repository.show(req.params.id);
        return res.status(200).json(product);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product: Product = {
                name: req.body.name,
                price: req.body.price,
                category_id: req.body.category_id as string,
            };
            const newProduct = await this.repository.create(product);
            return res.status(201).json(newProduct);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Product', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const product = await this.repository.delete(req.params.id);
        return res.status(200).json(product);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = {
                name: req.body.name,
                price: req.body.price,
                category_id: req.body.category_id as string,
            };
            const newProduct = await this.repository.update(req.params.id, product);
            return res.status(200).json(newProduct);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Product', next);
        }
    };
}

export default new ProductController(ProductRepo);
