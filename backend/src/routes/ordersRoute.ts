import express from 'express';
import { addProduct, create, index, show } from '../controllers/ordersController';
import { verifyToken } from '../middlewares/verifyToken';

const ordersRoute = express.Router();

ordersRoute.get('/', verifyToken, index);
ordersRoute.get('/:id', verifyToken, show);
ordersRoute.post('/', verifyToken, create);
ordersRoute.post('/:id/products', verifyToken, addProduct);

export default ordersRoute;
