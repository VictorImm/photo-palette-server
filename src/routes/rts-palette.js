const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

const authToken = require('../middleware/mid-auth');
const controllerPalette = require("../controller/ctrl-palette");

router.get('/', authToken, controllerPalette.getPaletteList);
router.get('/:id', authToken, controllerPalette.getPalette);

router.post('/', authToken, controllerPalette.postPalette);

router.delete('/:id', authToken, controllerPalette.deletePalette);

module.exports = router;