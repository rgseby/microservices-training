import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(err => console.log(err.message));
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on port 4003');
});