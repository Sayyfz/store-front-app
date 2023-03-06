import express from 'express';
import dashboardRoutes from './dashboardRoute';
import ordersRoute from './ordersRoute';
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';

const indexRoute = express.Router();

indexRoute.get('/', function (req: express.Request, res: express.Response) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});

indexRoute.use('/users', usersRoute);
indexRoute.use('/products', productsRoute);
indexRoute.use('/orders', ordersRoute);
indexRoute.use('/services', dashboardRoutes);

export default indexRoute;
