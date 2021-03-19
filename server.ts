import axios from 'axios';
import express from 'express';

const app = express();

type Golfer = {
    golferId: number;
};

type Golfers = {
    [key: string]: Golfer;
};

type GolferScore = {
    golferId: number;
    overallPar: number;
    status: string;
};

type GolferScoreMap = {
    [golferId: number]: GolferScore;
};

type LeaderboardResponse = {
    result: {
        golfers: GolferScore[];
    };
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

const processScores = (data: LeaderboardResponse) => {
    let cutScore = 0;
    const scoreMap: GolferScoreMap = {};

    data.result.golfers.forEach((golfer) => {
        const { overallPar, status } = golfer;

        // Keep track of the highest non-cut score
        if (status !== 'Cut') {
            cutScore = overallPar;
        }

        scoreMap[golfer.golferId] = {
            golferId: golfer.golferId,
            overallPar: status ? cutScore + 1 : overallPar,
            status
        };
    });

    return { cutScore, scoreMap };
};

app.get('/masters', async (req, res) => {
    const { data } = await axios.get<LeaderboardResponse>(
        'https://www.golfchannel.com/api/v2/events/19208/leaderboard'
    );

    res.json(processScores(data));
});

app.get('/open', async (req, res) => {
    const { data } = await axios.get<LeaderboardResponse>(
        'https://www.golfchannel.com/api/v2/events/19198/leaderboard'
    );

    res.json(processScores(data));
});

app.get('/pga', async (req, res) => {
    const { data } = await axios.get<LeaderboardResponse>(
        'https://www.golfchannel.com/api/v2/events/19190/leaderboard'
    );

    res.json(processScores(data));
});

app.get('/us', async (req, res) => {
    const { data } = await axios.get<LeaderboardResponse>(
        'https://www.golfchannel.com/api/v2/events/19207/leaderboard'
    );

    res.json(processScores(data));
});

app.get('*', (req, res) => {
    res.json('Test');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
