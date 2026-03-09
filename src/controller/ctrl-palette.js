const modelPalette = require("../model/mod-palette");
const { Vibrant } = require('node-vibrant/node');

const jwt = require('jsonwebtoken');

const getPaletteList = async (req, res, next) => {
    const username = req.query.username;
    if (!username ) {
        const error = new Error(`Parameter Request Incomplete!`);
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
            message: result.message
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
            message: result.message
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

const savePalette = async (req, res, next) => {
    const { hex, token } = req.body;
    if (!hex || !token) {
        const error = new Error(`Body Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const created_by = decoded.username;

    const result = await modelPalette.uploadPalette(
        hex,
        created_by
    )
    if (result.success) {    
        res.status(200).json({
            success: true,
            message: result.message
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

const deletePalette = async (req, res, next) => {
    const id = parseInt(req.params.id);
    if (!id ) {
        const error = new Error(`Parameter Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    const result = await modelPalette.deletePalette(
        id
    )
    if (result.success) {
        res.status(200).json({
            success: true,
            data: result.data,
            message: result.message
        });
    } else {
        const error = new Error(result.message);
        error.status = 401;
        return next(error);
    }
};

const extractPalette = async (req, res, next) => {    
    const file = req.file;
    if (!file) {
        const error = new Error(`Body Request Incomplete!`);
        error.status = 401;
        return next(error);
    }

    try {
        const palette = await Vibrant.from(file.buffer).getPalette();
        const colors = Object.values(palette)
            .filter(c => c && c.rgb)
            .map(
                c => '#' + (c.rgb).map(x => Math.round(x)).map(x => x.toString(16).padStart(2, '0')).join('')
            );

        res.status(200).json({
            success: true,
            palette: colors
        });
    } catch (e) {
        const error = new Error(e.message);
        error.status = 401;
        return next(error);
    }
};

module.exports = {
    getPaletteList,
    getPalette,
    savePalette,
    deletePalette,
    extractPalette
}