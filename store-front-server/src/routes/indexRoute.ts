import express from 'express';
import cartRoute from './cartRoute';
import categoryRoute from './categoriesRoute';
import dashboardRoutes from './dashboardRoute';
import productImagesRoute from './productImagesRoute';
import productsRoute from './productsRoute';
import usersRoute from './usersRoute';

const indexRoute = express.Router();

indexRoute.get('/', function (req: express.Request, res: express.Response) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});

indexRoute.use('/users', usersRoute);
indexRoute.use('/products', productsRoute);
indexRoute.use('/categories', categoryRoute);
indexRoute.use('/carts', cartRoute);
indexRoute.use('/product-images', productImagesRoute);
indexRoute.use('/services', dashboardRoutes);

export default indexRoute;
