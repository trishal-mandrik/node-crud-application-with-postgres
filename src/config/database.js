const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: 'trishalmandrik',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to the database');
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}