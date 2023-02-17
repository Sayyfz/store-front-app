import express from 'express';
import { authenticate, create, index, show } from '../controllers/usersController';
import { verifyToken } from '../middlewares/verifyToken';
const usersRoute = express.Router();

usersRoute.get('/', verifyToken, index);
usersRoute.post('/', create);
usersRoute.get('/:id', verifyToken, show);
usersRoute.post('/authenticate', authenticate);

export default usersRoute;

///
