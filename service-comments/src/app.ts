import express, { Express, Request, Response } from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: Record<string, Array<{ commentId: string, content: string}>> = {};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req: Request, res: Response) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ commentId: commentId, content });
    commentsByPostId[req.params.id] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    }).catch(err => console.log(err.message));

    res.status(201).send(comments);
});

app.post('/events', (req: Request, res: Response) => {
    console.log('Received event', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Server listening on 4001');
});