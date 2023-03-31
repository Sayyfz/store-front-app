import express from 'express';
import Controller from '../controllers/dashboardController';
import { verifyToken } from '../middlewares/verifyToken';
import 'express-async-errors';

const dashboardRoutes = express.Router();
dashboardRoutes.get('/products_by_category/:categoryId', Controller.products_by_category);
dashboardRoutes.get('/products_search', Controller.products_search);

export default dashboardRoutes;
