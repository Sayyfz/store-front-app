import express from 'express';
import Controller from '../controllers/OrderController';
import { verifyToken } from '../middlewares/verifyToken';

const ordersRoute = express.Router();

ordersRoute.get('/', verifyToken, Controller.index);
ordersRoute.get('/:id', verifyToken, Controller.show);
ordersRoute.post('/', verifyToken, Controller.create);
ordersRoute.patch('/:id', verifyToken, Controller.update);
ordersRoute.delete('/:id', verifyToken, Controller.delete);
ordersRoute.post('/:id/products', verifyToken, Controller.addProduct);

export default ordersRoute;
