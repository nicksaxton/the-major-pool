import axios from 'axios';
import express from 'express';

const app = express();

type Golfer = {
    golferId: number;
};

type Golfers = {
    [key: string]: Golfer;
};

app.get('/date', (req, res) => {
    const now = new Date();
    return res.json(now.toDateString());
});

app.get('/golfers', async (req, res) => {
    const { data } = await axios.get<Golfer[]>(
        'https://www.golfchannel.com/api/v2/tours/1/stats/19/2021'
    );
    res.json(
        data.slice(0, 300).reduce<Golfers>((golfers, golfer) => {
            golfers[golfer.golferId] = golfer;
            return golfers;
        }, {})
    );
});

app.get('*', (req, res) => {
    res.json('Test');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
