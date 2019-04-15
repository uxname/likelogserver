const uxlogger = require('./index');

(async () => {
    uxlogger.init({
        port: 5111,
        path: '/log'
    });

    await uxlogger.start();
})();
