import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes/indexRoute';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/', indexRoute);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});

export default app;
