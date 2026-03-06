require('dotenv').config();

const { Pool } = require("@neondatabase/serverless");

const pool = new Pool({
  connectionString: process.env.PHOPAL_DATABASE_URL
});

const SALT = parseInt(process.env.SALT);
const bcrypt = require('bcrypt');

const paletteList = async (username) => {
    try {
        const result = await pool.query(
            `SELECT id, hex, created_on FROM m_palette WHERE created_by = $1 ORDER BY created_on ASC`,
            [username]
        );

        return { 
            success: true,
            data: result.rows,
            message: result.rows.length ? "Success Retrieved Data" : "Empty Record"
        };
    } catch (e) {
        throw e;
    }
}

const paletteDetail = async (id) => {
    try {
        const result = await pool.query(
            `SELECT id, hex, created_on FROM m_palette WHERE id = $1`,
            [id]
        );

        return { 
            success: true,
            data: result.rows,
            message: result.rows.length ? "Success Retrieved Data" : "Empty Record"
        };
    } catch (e) {
        throw e;
    }
}

const uploadPalette = async (hex, created_by) => {
    try {
        await pool.query(
            `INSERT INTO m_palette (hex, created_by)
                VALUES ($1, $2)`,
            [hex, created_by]
        );

        return { success: true, message: "Palette uploaded successfully" };
    } catch (e) {
        throw e;
    }
}

const deletePalette = async (id) => {
    try {
        await pool.query(
            `DELETE FROM m_palette WHERE id=$1`,
            [id]
        );

        return { success: true, message: "Palette deleted successfully" };
    } catch (e) {
        throw e;
    }
}

module.exports = {
    paletteList,
    paletteDetail,
    uploadPalette,
    deletePalette
}