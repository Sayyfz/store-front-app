import CartRepo, { CartRepository } from '../repositories/CartRepository';
import { Response, Request, NextFunction } from 'express';
import { Cart } from '../models/CartModel';
import { checkErrorAndNext } from '../utils/Helpers';
class CartController {
    private repository: CartRepository;
    constructor(repository: CartRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const categories = await this.repository.index();
        return res.status(200).json(categories);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const cart = await this.repository.show(req.params.id);
        return res.status(200).json(cart);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCart: Cart = req.body;
            const cart = await this.repository.create(newCart);
            return res.status(201).json(cart);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Cart', next);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCart: Cart = req.body;
            const cart = await this.repository.update(req.params.id, newCart);
            return res.status(200).json(cart);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Cart', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deletedCart = await this.repository.delete(req.params.id);
        return res.status(200).json(deletedCart);
    };

    addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedCart = await this.repository.addProduct(
                req.body.quantity,
                req.params.id,
                req.body.product_id,
            );
            return res.status(200).json(deletedCart);
        } catch (error) {
            checkErrorAndNext(error as Error, 'Product in cart', next);
        }
    };
}

export default new CartController(CartRepo);
