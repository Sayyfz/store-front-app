import express from 'express';
import Controller from '../controllers/CartController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const cartRoute = express.Router();

cartRoute.get('/', Controller.index);
cartRoute.get('/:id', Controller.show);
cartRoute.post('/', Controller.create);
cartRoute.patch('/:id', verifyToken, Controller.update);
cartRoute.delete('/:id', verifyToken, Controller.delete);
cartRoute.post('/:id/products', verifyToken, Controller.addProductToCart);

export default cartRoute;
