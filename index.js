const fastify = require("fastify");
const fastifyCors = require('fastify-cors');
const fastifyCompress = require('fastify-compress');

let index;
let serverConfig;

let c = 0;

async function handleRequest(data) {
    const logs = JSON.parse(data);

    // console.log('New logs:', logs);
    console.log(c += logs.length);
    return true;
}

const RESULT_OK = {result: 'ok'};
const RESULT_ERROR = {result: 'error'};

module.exports.init = (config) => {
    if (!config.port) throw new Error('Port is not defined');
    if (!Number(config.port)) throw new Error('Port is NaN');
    if (!config.path) throw new Error('Path is not defined');

    serverConfig = config;
    index = fastify();
    index.register(fastifyCors);
    index.register(fastifyCompress, {global: true});

    index.addContentTypeParser('*', function (req, done) {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        });
        req.on('end', () => {
            done(null, data)
        })
    });

    index.post(config.path, async (request, reply) => {
        const result = await handleRequest(request.body);
        if (result === true) {
            reply.code(200).send(RESULT_OK);
        } else {
            reply.code(500).send(RESULT_ERROR);
        }
    });
};

module.exports.start = async () => {
    return index.listen(serverConfig.port);
};
