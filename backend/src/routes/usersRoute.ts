import express from 'express';
import { create, index, show } from '../controllers/usersController';
import { verifyToken } from '../middlewares/verifyToken';
const usersRoute = express.Router();

usersRoute.get('/', verifyToken, index);
usersRoute.post('/', create);
usersRoute.get('/:id', verifyToken, show);

export default usersRoute;
