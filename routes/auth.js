const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

router.post('/signin', (req, res) => {
    const { username } = req.body;
    if (!username) {
        const error = new Error(`Username required!`);
        error.status = 404;
        return next(error);
    }

    const token = jwt.sign(
        { username },
        process.env.TOKEN_SECRET,
        { expiresIn: '30s' }
    );

    res.status(200).json({
        data: { token },
        message: "Success Retrieved Data"
    });
});

module.exports = router;