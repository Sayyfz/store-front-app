import express from 'express';
import indexRoute from './routes/indexRoute';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(indexRoute);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
