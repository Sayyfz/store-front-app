import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/usersRoute';
import productsRoute from './routes/productsRoute';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.get('/', function (req: Request, res: Response) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
