const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

const controllerAuth = require("../controller/auth")

router.post('/signin',  controllerAuth.postSignIn);
router.post('/signup',  controllerAuth.postSignUp);

module.exports = router;