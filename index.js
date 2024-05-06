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
        const result = await pool.query('SELECT * FROM herois');
        res.json({
            total : result.rowCount,
            heroes : result.rows
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.get('/heroes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM herois WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.post('/heroes', async (req, res) => {
    const { nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento } = req.body;
    try {
        const result = await pool.query('INSERT INTO herois (nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.put('/heroes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento } = req.body;
    try {
        const result = await pool.query('UPDATE herois SET nome = $1, bencaodivina = $2, forca = $3, resistencia = $4, velocidade = $5, bencaooumaldicaoo = $6, equipamento = $7 WHERE id = $8 RETURNING *', [nome, bencaodivina, forca, resistencia, velocidade, bencaooumaldicaoo, equipamento, id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});