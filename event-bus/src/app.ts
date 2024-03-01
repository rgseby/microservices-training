import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

const events: Array<any> = [];

app.post('/events', (req: Request, res: Response) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch(err => console.log(err.message)); // Posts service
    axios.post('http://localhost:4001/events', event).catch(err => console.log(err.message)); // Comments service
    axios.post('http://localhost:4002/events', event).catch(err => console.log(err.message)); // Query service
    axios.post('http://localhost:4003/events', event).catch(err => console.log(err.message)); // Comment moderation service

    res.send({ status: 'OK' });
});

app.get('/events', (req: Request, res: Response) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Listening on port 4005');
});