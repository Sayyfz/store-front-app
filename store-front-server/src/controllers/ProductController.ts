import { Request, Response } from 'express';
import ProductRepo, { ProductRepository } from '../repositories/ProductRepository';
import InfoError from '../types/infoError';

class ProductController {
    repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response) => {
        try {
            const products = await this.repository.index();
            return res.status(200).json(products);
        } catch (err) {
            const e: InfoError = err as InfoError;
            return res.status(e.status).json(e.message);
        }
    };

    show = async (req: Request, res: Response) => {
        try {
            const product = await this.repository.show(req.params.id);
            return res.status(200).json(product);
        } catch (err) {
            const e: InfoError = err as InfoError;
            return res.status(e.status).json(e.message);
        }
    };

    create = async (req: Request, res: Response) => {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: (req.body.category as string).toLowerCase(),
        };
        try {
            const newProduct = await this.repository.create(product);
            return res.status(201).json(newProduct);
        } catch (err) {
            const e: InfoError = err as InfoError;
            return res.status(e.status).json(e.message);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const product = await this.repository.delete(req.params.id);
            return res.status(200).json(product);
        } catch (err) {
            const e: InfoError = err as InfoError;
            return res.status(e.status).json(e.message);
        }
    };

    update = async (req: Request, res: Response) => {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: (req.body.category as string).toLowerCase(),
        };
        try {
            const newProduct = await this.repository.update(req.params.id, product);
            return res.status(200).json(newProduct);
        } catch (err) {
            const e: InfoError = err as InfoError;
            return res.status(e.status).json(e.message);
        }
    };
}

export default new ProductController(ProductRepo);
