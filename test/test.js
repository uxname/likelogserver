const Likelog = require('../src');
const express = require('express');
const app = express();
const PORT = 5111;

const logsDb = [];

app.get('/', function (req, res) {
    res.status(200).json({
        logs: logsDb
    });
});

Likelog.applyMiddleware(app, '/log', async (logs, req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    logsDb.push(
        ...logsDb,
        ...logs
    );
    console.log(`New logs received (ip:${ip}): ${JSON.stringify(logs, null, 2)}`);
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
