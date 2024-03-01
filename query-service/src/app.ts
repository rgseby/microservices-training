import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

/* Data structure */
type Comment = {
    id: string,
    content: string
};

type Post = {
    id: string,
    title: string,
    comments: Array<Comment>
};

const dbEntries: Record<string, Post> = {};


app.get('/posts', (req: Request, res: Response) => {
    res.send(dbEntries);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        dbEntries[id] = { id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = data;

        dbEntries[postId].comments.push({ id, content });
    }

    console.log(dbEntries);

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on port 4002');
});