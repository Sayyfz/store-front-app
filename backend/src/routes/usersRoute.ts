import express from 'express';
import { create, index, show } from '../controllers/usersController';
const usersRoute = express.Router();

usersRoute.get('/', index);
usersRoute.get('/:id', show);
usersRoute.post('/', create);

export default usersRoute;
