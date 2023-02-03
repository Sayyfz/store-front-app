import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log(`Server Listening on port ${port}`);
});
