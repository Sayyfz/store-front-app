import express from 'express';
import Controller from '../controllers/CategoryController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const categoryRoute = express.Router();

categoryRoute.get('/', Controller.index);
categoryRoute.get('/:id', Controller.show);
categoryRoute.post('/', Controller.create);
categoryRoute.patch('/:id', verifyToken, Controller.update);
categoryRoute.delete('/:id', verifyToken, Controller.delete);

export default categoryRoute;
