// environment variable
require('dotenv').config();
const PORT = process.env.PORT;
// ====================


const express = require('express');
const port = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}));


// logger middleware
const logger = require('./src/middleware/logger');
app.use(logger);
// ====================


// router
const auth = require('./src/routes/auth');
app.use('/auth', auth);
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
const errorNoFound = require('./src/middleware/errNoFound');
app.use(errorNoFound)

const errorHandler = require('./src/middleware/errHandler');
app.use(errorHandler)
// ====================

app.listen(port, () => console.log(`Server is running on port ${port}`));