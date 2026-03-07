require('dotenv').config();

const { Pool } = require("@neondatabase/serverless");

const pool = new Pool({
  connectionString: process.env.PHOPAL_DATABASE_URL
});

const SALT = parseInt(process.env.SALT);
const bcrypt = require('bcrypt');

const userSignIn = async (username, password) => {
    try {
        const result = await pool.query(
            `SELECT password FROM m_users WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            return { success: false, message: "User not found" };
        }

        const match = await bcrypt.compare(password, result.rows[0].password);
        if (match) {
            return { success: true, message: "Welcome" };
        } else {
            return { success: false, message: "Invalid Password!" };
        }
    } catch (e) {
        throw e;
    }
}

const userSignUp = async (email, username, password) => {
    const saltRounds = SALT;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const result = await pool.query(
            `SELECT COUNT(1) AS exists FROM m_users WHERE username = $1`,
            [username]
        );

        if (parseInt(result.rows[0].exists) > 0) {
            return { success: false, message: "Username Already Exists!" };
        } else {
            await pool.query(
                `INSERT INTO m_users (email, username, password)
                 VALUES ($1, $2, $3)`,
                [email, username, hashedPassword]
            );

            return { success: true, message: "User registered successfully" };
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    userSignIn,
    userSignUp
}