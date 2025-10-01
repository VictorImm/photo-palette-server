const modelUser = require("../model/user");

const jwt = require('jsonwebtoken');

const postSignIn = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = new Error(`Body Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const result = await modelUser.userSignIn(
        username,
        password
    )
    if (result.success) {
        const token = jwt.sign(
            { username },
            process.env.TOKEN_SECRET,
            { expiresIn: '30s' }
        );
    
        res.status(200).json({
            success: true,
            data: { token },
            message: "Success Retrieved Data"
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

const postSignUp = async (req, res, next) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        const error = new Error(`Body Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const result = await modelUser.userSignUp(
        email,
        username,
        password
    )
    if (result.success) {    
        res.status(200).json({
            success: true,
            data: { token },
            message: "Success Retrieved Data"
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

module.exports = {
    postSignIn,
    postSignUp
}