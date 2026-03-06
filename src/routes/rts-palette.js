const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // batas 10MB
});

const authToken = require('../middleware/mid-auth');
const controllerPalette = require("../controller/ctrl-palette");

router.get('/', authToken, controllerPalette.getPaletteList);

router.post('/extract', authToken, upload.single('file'), controllerPalette.extractPalette);
router.post('/save', authToken, controllerPalette.savePalette);

router.get('/:id', authToken, controllerPalette.getPalette);
router.delete('/:id', authToken, controllerPalette.deletePalette);

module.exports = router;