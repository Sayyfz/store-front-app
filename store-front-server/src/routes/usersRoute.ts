import express from 'express';
import Controller from '../controllers/UserController';
import { verifyToken } from '../middlewares/verifyToken';
const usersRoute = express.Router();

usersRoute.get('/', verifyToken, Controller.index);
usersRoute.post('/', Controller.create);
usersRoute.get('/:id', verifyToken, Controller.show);
usersRoute.delete('/:id', verifyToken, Controller.delete);
usersRoute.patch('/:id', verifyToken, Controller.update);
usersRoute.post('/authenticate', Controller.authenticate);

export default usersRoute;
