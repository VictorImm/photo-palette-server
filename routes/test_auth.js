const express = require('express');
const router = express.Router();

const authToken = require('../middleware/auth');

router.get('/test', authToken, (req, res) => {
    res.json({ 
        message: "Success Retrieved Data" 
    });
    res.status(200)
});

module.exports = router;