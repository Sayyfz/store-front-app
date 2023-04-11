import express from 'express';
import indexRoute from './routes/indexRoute';
import { productsPath } from './constants/constants';
import errorHandler from './middlewares/globalErrorHandler';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(
    '/images',
    express.static(path.join(__dirname, productsPath), {
        setHeaders: function (res, path) {
            res.setHeader('cache-control', 'no-cache');
        },
    }),
);
console.log(__dirname + '/' + productsPath);

app.use('/api', indexRoute);

app.use(errorHandler);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
