// environment variable
require('dotenv').config();
const PORT = process.env.PORT;
// ====================


const express = require('express');
const port = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));


// logger middleware
const logger = require('./src/middleware/mid-logger');
app.use(logger);
// ====================


// router
const auth = require('./src/routes/rts-auth');
app.use('/auth', auth);

const palette = require('./src/routes/rts-palette');
app.use('/palette', palette);
// ====================


// default request
app.get('/', (req, res) => {
    res.status(403).send(`
        <html>
        <head><title>403 Forbidden</title></head>
        <body style="text-align: center; font-family: Arial;">
            <img src="https://http.cat/403.jpg" alt="403 Forbidden" width="500px">
        </body>
        </html>
    `);
})
// ====================


// error handler middleware
const errorNoFound = require('./src/middleware/mid-err-nofound');
app.use(errorNoFound)

const errorHandler = require('./src/middleware/mid-err-handler');
app.use(errorHandler)
// ====================

app.listen(port, () => console.log(`Server is running on port ${port}`));