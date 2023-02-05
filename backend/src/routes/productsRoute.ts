import express from 'express';
import { create, index, show } from '../controllers/productsController';
import { verifyToken } from '../middlewares/verifyToken';

const productsRoute = express.Router();

productsRoute.get('/', index);
productsRoute.get('/:id', show);
productsRoute.post('/', verifyToken, create);

export default productsRoute;
