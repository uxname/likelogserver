const expressJs = require('express');
const cors = require('cors');

function applyMiddleware(express, path = '/log', fn) {
    express.use(path, expressJs.json());
    express.use(path, cors());
    express.post(path, async (req, res, next) => {
        try {
            await fn(req.body, req, res);
        } catch (e) {
            return res.json({
                result: 'error'
            })
        }
        return res.json({
            result: 'ok'
        })
    });
}

module.exports = {
    applyMiddleware: applyMiddleware,
};
