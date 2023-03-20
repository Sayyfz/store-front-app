import express from 'express';
import indexRoute from './routes/indexRoute';
import { productsPath } from './constants/constants';
import errorHandler from './middlewares/globalErrorHandler';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/images', express.static(productsPath));
app.use('/api', (req, res, next) => {
    console.log('middleware');
    next();
});
app.use('/api', indexRoute);

app.use(errorHandler);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
