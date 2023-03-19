import express from 'express';
import Controller from '../controllers/UserController';
import errorHandler from '../middlewares/globalErrorHandler';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';
import cors from 'cors';

const usersRoute = express.Router();

usersRoute.use(cors());

usersRoute.get('/', verifyToken, Controller.index);
usersRoute.post('/', Controller.create);
usersRoute.get('/:id', verifyToken, Controller.show);
usersRoute.delete('/:id', verifyToken, Controller.delete);
usersRoute.patch('/:id', verifyToken, Controller.update);
usersRoute.post('/authenticate', Controller.authenticate);

usersRoute.use(errorHandler);

export default usersRoute;
