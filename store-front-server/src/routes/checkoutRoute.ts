import express from 'express';
import Controller from '../controllers/CheckoutController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const checkoutRoute = express.Router();

checkoutRoute.post('/', verifyToken, Controller.create);

export default checkoutRoute;
