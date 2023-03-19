import express from 'express';
import Controller from '../controllers/ProductController';
import errorHandler from '../middlewares/globalErrorHandler';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';
import cors from 'cors';

const productsRoute = express.Router();

productsRoute.use(cors());

productsRoute.get('/', Controller.index);
productsRoute.get('/:id', Controller.show);
productsRoute.post('/', verifyToken, Controller.create);
productsRoute.delete('/:id', verifyToken, Controller.delete);
productsRoute.patch('/:id', verifyToken, Controller.update);

productsRoute.use(errorHandler);

export default productsRoute;
