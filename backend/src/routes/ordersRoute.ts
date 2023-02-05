import express from 'express';
import { addProduct, create, index, show } from '../controllers/ordersController';

const ordersRoute = express.Router();

ordersRoute.get('/', index);
ordersRoute.post('/', create);
ordersRoute.get('/:id', show);
ordersRoute.post('/:id/products', addProduct);

export default ordersRoute;
