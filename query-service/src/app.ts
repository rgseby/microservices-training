import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

/* Data structure */
type Comment = {
    id: string,
    content: string,
    status: string
};

type Post = {
    id: string,
    title: string,
    comments: Array<Comment>
};

type EventPost = {
    id: string,
    title: string
};

type EventComment = {
    id: string,
    content: string,
    postId: string,
    status: string
};

type EventData = EventComment | EventPost;

const dbEntries: Record<string, Post> = {};

const handleEvent = (type: string, data: EventData) => {
    if (type === 'PostCreated') {
        const { id, title } = data as EventPost;

        dbEntries[id] = { id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data as EventComment;

        dbEntries[postId].comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data as EventComment;

        const comment = dbEntries[postId].comments.find(comment => {
            return comment.id === id;
        });
        comment!.status = status;
        comment!.content = content;
    }
}


app.get('/posts', (req: Request, res: Response) => {
    res.send(dbEntries);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002');

    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
        console.log('Processing event: ', event.type);

        handleEvent(event.type, event.data);
    }
});