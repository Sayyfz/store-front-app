import { Request, Response, NextFunction } from 'express';
import OrderRepo, { OrderRepository } from '../repositories/OrderRepository';
import { checkErrorAndNext } from '../utils/Helpers';
class OrdersController {
    private repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response, next: NextFunction) => {
        const order = await this.repository.index();
        return res.status(200).json(order);
    };

    show = async (req: Request, res: Response, next: NextFunction) => {
        const order = await this.repository.show(req.params.id);
        return res.status(200).json(order);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };

        try {
            const newOrder = await this.repository.create(order);
            return res.status(201).json(newOrder);
        } catch (error) {
            checkErrorAndNext(error as Error, 'order', next);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deletedOrder = await this.repository.delete(req.params.id);
        return res.status(200).json(deletedOrder);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = {
                user_id: req.body.user_id,
                status: req.body.status,
            };

            const updatedOrder = await this.repository.update(req.params.id, order);
            return res.status(200).json(updatedOrder);
        } catch (error) {
            checkErrorAndNext(error as Error, 'order', next);
        }
    };

    addProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order_id = req.params.id;
            const product_id = req.body.product_id;
            const quantity = req.body.quantity;

            const newProduct = await this.repository.addProduct(quantity, order_id, product_id);
            return res.status(200).json(newProduct);
        } catch (error) {
            checkErrorAndNext(error as Error, 'product', next);
        }
    };
}

export default new OrdersController(OrderRepo);
