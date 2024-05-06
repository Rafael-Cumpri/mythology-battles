const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3036

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'batalhasherois',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());

app.get('/heroes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM heroes');
        res.json({
            total : result.rowCount,
            heroes : result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});