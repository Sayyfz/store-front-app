import express from 'express';
import Controller from '../controllers/ProductController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const productsRoute = express.Router();

productsRoute.get('/', Controller.index);
productsRoute.get('/:id', Controller.show);
productsRoute.post('/', verifyToken, Controller.create);
productsRoute.delete('/:id', verifyToken, Controller.delete);
productsRoute.patch('/:id', verifyToken, Controller.update);

export default productsRoute;
