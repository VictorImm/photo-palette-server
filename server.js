const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const port = process.env.PORT || 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : false}));


// logger middleware
const logger = require('./middleware/logger');
app.use(logger);
// ====================


// router
const auth = require('./routes/auth');
app.use('/auth', auth);

const test = require('./routes/test_auth');
app.use('/test', test);
// ====================


// error handler middleware
const errorNoFound = require('./middleware/err_nofound');
app.use(errorNoFound)

const errorHandler = require('./middleware/err_handler');
app.use(errorHandler)
// ====================

app.listen(port, () => console.log(`Server is running on port ${port}`));