Likelog server
======

**Likelog** - The Frontend Logging Framework for JavaScript 
**Likelog server** - Backend part for receiving logs from Likelog

## Usage

* Install:

`yarn add likelogserver`

or

`npm install --save likelogserver`

* Usage:

**As express js middleware:**

```javascript
const Likelog = require('likelogserver');
const express = require('express');
const app = express();
const PORT = 5111;

const logsDb = [];

app.get('/', function (req, res) {
    res.status(200).json({
        logs: logsDb
    });
});

Likelog.applyMiddleware(app, '/log', async logs => {
    logsDb.push(
        ...logsDb,
        ...logs
    );
    console.log('New logs received:', JSON.stringify(logs, null, 2));
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
```
