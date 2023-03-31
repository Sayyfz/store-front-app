import express from 'express';
import Controller from '../controllers/UserController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const usersRoute = express.Router();

usersRoute.get('/', Controller.index);
usersRoute.post('/', Controller.create);
usersRoute.get('/:id', verifyToken, Controller.show);
usersRoute.delete('/:id', verifyToken, Controller.delete);
usersRoute.patch('/:id', verifyToken, Controller.update);
usersRoute.post('/authenticate', Controller.authenticate);

export default usersRoute;
