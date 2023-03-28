import { Request, Response, NextFunction } from 'express';
import { ProductImage } from '../models/ProductImageModel';
import ProductImageRepo, { ProductImageRepository } from '../repositories/ProductImageRepository';
import { checkErrorAndNext } from '../utils/Helpers';
import { throwValidationError } from '../utils/ThrowError';

class ProductImageController {
    private repository: ProductImageRepository;

    constructor(repository: ProductImageRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const productImg = await this.repository.index();
        return res.status(200).json(productImg);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const productImg = await this.repository.show(req.params.id);
        return res.status(200).json(productImg);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) {
            throwValidationError('Please upload a product image to proceed');
        }
        const productImg: ProductImage = {
            image_url: req.file?.filename,
            product_id: req.body.product_id,
        };

        try {
            const newImg = await this.repository.create(productImg);
            return res.status(201).json(newImg);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Product Image', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deletedImg = await this.repository.delete(req.params.id);
        return res.status(200).json(deletedImg);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) {
            throwValidationError('Please upload a product image to proceed');
        }
        try {
            const productImg: ProductImage = {
                image_url: req.file?.filename,
                product_id: req.body.product_id,
            };

            const updatedImg = await this.repository.update(req.params.id, productImg);
            return res.status(200).json(updatedImg);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Product Image', next);
        }
    };
}

export default new ProductImageController(ProductImageRepo);
