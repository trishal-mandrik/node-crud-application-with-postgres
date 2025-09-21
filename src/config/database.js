const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});

pool.on('connect', () => {
    console.log('Connected to the database');
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}