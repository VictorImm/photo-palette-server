const colors = require('colors');

const logger = (req, res, next) => {
    const methodColors = {
        GET   : 'green',
        POST  : 'blue',
        PUT   : 'yellow',
        DELETE: 'red'
    }

    const color = methodColors[req.method] || white;

    const now = new Date().toISOString();
    console.log(
        `[${now}] ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[
            color
        ]
    );
    next();
}

module.exports = logger;