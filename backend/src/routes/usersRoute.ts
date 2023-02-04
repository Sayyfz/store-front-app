import express from 'express';
import { create, index, show } from '../controllers/usersController';
import { verifyToken } from '../middlewares/verifyToken';
const usersRoute = express.Router();

usersRoute.use(verifyToken);
usersRoute.get('/', index);
usersRoute.get('/:id', show);
usersRoute.post('/', create);

export default usersRoute;
