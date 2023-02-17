import express from 'express';
import {
    completed_orders_by_user,
    current_orders_by_user,
    products_by_category,
} from '../controllers/dashboardController';
import { verifyToken } from '../middlewares/verifyToken';
const dashboardRoutes = express.Router();

dashboardRoutes.get('/current_orders_by_user/:id', verifyToken, current_orders_by_user);
// dashboardRoutes.get('/completed_orders_by_user/:id', verifyToken, completed_orders_by_user);
dashboardRoutes.get('/products_by_category/:category', products_by_category);

export default dashboardRoutes;
