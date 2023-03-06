import { Request, Response } from 'express';
import OrderRepo, { OrderRepository } from '../repositories/OrderRepository';
class OrdersController {
    private repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    index = async (req: Request, res: Response) => {
        try {
            const order = await this.repository.index();
            return res.status(200).json(order);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    show = async (req: Request, res: Response) => {
        const order = await this.repository.show(req.params.id);
        return res.status(200).json(order);
    };

    create = async (req: Request, res: Response) => {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };

        try {
            const newOrder = await this.repository.create(order);
            return res.status(201).json(newOrder);
        } catch (err) {
            return res.status(400).json((err as Error).message);
        }
    };

    delete = async (req: Request, res: Response) => {
        const deletedOrder = await this.repository.delete(req.params.id);
        return res.status(200).json(deletedOrder);
    };

    update = async (req: Request, res: Response) => {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
        };

        const updatedOrder = await this.repository.update(req.params.id, order);
        return res.status(200).json(updatedOrder);
    };

    addProduct = async (req: Request, res: Response) => {
        const order_id = req.params.id;
        const product_id = req.body.product_id;
        const quantity = req.body.quantity;

        const newProduct = await this.repository.addProduct(quantity, order_id, product_id);
        return res.status(200).json(newProduct);
    };
}

export default new OrdersController(OrderRepo);
