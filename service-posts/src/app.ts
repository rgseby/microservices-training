import express, { Express, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app: Express = express();
app.use(bodyParser.json());

const posts: Record<string, { id: string, title: string}> = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/posts', (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = { id, title };
    res.status(201).send(posts);
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});