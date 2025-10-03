const modelPalette = require("../model/mod-palette");

const jwt = require('jsonwebtoken');

const getPaletteList = async (req, res, next) => {
    const { username } = req.body;
    if (!username ) {
        const error = new Error(`Body Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const result = await modelPalette.paletteList(
        username
    )
    if (result.success) {
        res.status(200).json({
            success: true,
            data: result.data,
            message: "Success Retrieved Data"
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

const getPalette = async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!id ) {
        const error = new Error(`Parameter Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const result = await modelPalette.paletteDetail(
        id
    )
    if (result.success) {
        res.status(200).json({
            success: true,
            data: result.data,
            message: "Success Retrieved Data"
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

module.exports = {
    getPaletteList,
    getPalette
}