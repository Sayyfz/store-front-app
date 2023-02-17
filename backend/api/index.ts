import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersRoute from '../src/routes/usersRoute';
import productsRoute from '../src/routes/productsRoute';
import ordersRoute from '../src/routes/ordersRoute';
import dashboardRoutes from '../src/routes/dashboardRoute';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/services', dashboardRoutes);

app.get('/', function (req: Request, res: Response) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
