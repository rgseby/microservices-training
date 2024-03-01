import express, { Express, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const posts: Record<string, { id: string, title: string}> = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/posts', (req: Request, res: Response) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch(err => console.log(err.message));

    res.status(201).send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    console.log('Received event', req.body.type);

    res.send({});
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});