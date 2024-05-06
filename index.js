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

const bencaosdivina = [
    { name: 'Zeus', versusBonus: ['Apolo', 'Hermes', 'Hades'] },
    { name: 'Apolo', versusBonus: ['Ares','Hades','Hefesto'] },
    { name: 'Hermes', versusBonus: ['Apolo','Atena','Hefesto'] },
    { name: 'Ares', versusBonus: ['Zeus','Hades','Hermes'] },
    { name: 'Hades', versusBonus: ['Poseidon','Atena','Hermes'] },
    { name: 'Atena', versusBonus: ['Poseidon','Zeus','Ares'] },
    { name: 'Poseidon', versusBonus: ['Zeus','Apolo','Hermes'] },
    { name: 'Hefesto', versusBonus: ['Zeus','Ares','Atena'] }
];

const giveadvantage = (hero1, hero2) => {
    const bencao1 = hero1.bencaodivina;
    const bencao2 = hero2.bencaodivina;
    const bencao1bonus = bencaosdivina.find(b => b.name === bencao1).versusBonus;
    const bencao2bonus = bencaosdivina.find(b => b.name === bencao2).versusBonus;

    if (bencao1bonus.includes(bencao2)) {
        return hero1;
    } else if (bencao2bonus.includes(bencao1)) {
        return hero2;
    } else {
        return null;
    }
}

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

app.get('/heroes/:param', async (req, res) => {
    const { param } = req.params;
    try {
        if (isNaN(param)) {
            const result = await pool.query('SELECT * FROM herois WHERE nome Like $1', [`%${param}%`]);
            res.json({
                total : result.rowCount,
                heroes : result.rows
            });
        } else {
            const result = await pool.query('SELECT * FROM herois WHERE id = $1', [param]);
            res.json({
                total : result.rowCount,
                heroes : result.rows
            });
        }
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

app.delete('/heroes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM herois WHERE id = $1', [id]);
        res.json({ message: 'Hero deleted successfully' });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.get('/battles', async (req, res) => {
    try {
        const result = await pool.query('SELECT batalhas.id, batalhas.heroi_id1, batalhas.heroi_id2, batalhas.vencedor_id, herois.nome, herois.bencaodivina, herois.forca, herois.resistencia, herois.velocidade, herois.bencaooumaldicaoo, herois.equipamento FROM batalhas JOIN herois ON batalhas.vencedor_id = herois.id');
        res.json({
            total : result.rowCount,
            battles : result.rows.map(row => ({
                id: row.id,
                heroi_id1: row.heroi_id1,
                heroi_id2: row.heroi_id2,
                vencedor_id: row.vencedor_id,
                winnerDetails: {
                    nome: row.nome,
                    bencaodivina: row.bencaodivina,
                    forca: row.forca,
                    resistencia: row.resistencia,
                    velocidade: row.velocidade,
                    bencaooumaldicaoo: row.bencaooumaldicaoo,
                    equipamento: row.equipamento
                }
            }))
        });
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }
});

app.post('/heroes/combate/:id1/:id2', async (req, res) => {
    const { id1, id2 } = req.params;
    try {
        if (id1 === id2) {
            res.json({ error: 'Cannot fight against yourself' });
            return;
        }
        const result1 = await pool.query('SELECT * FROM herois WHERE id = $1', [id1]);
        const result2 = await pool.query('SELECT * FROM herois WHERE id = $1', [id2]);
        const hero1 = result1.rows[0];
        const hero2 = result2.rows[0];
        let total1 = hero1.forca + hero1.resistencia + hero1.velocidade;
        let total2 = hero2.forca + hero2.resistencia + hero2.velocidade;
        const statusWinner = total1 > total2 ? hero1 : hero2;
        const advantageByBencao = giveadvantage(hero1, hero2);

        if(advantageByBencao == null) {
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        } else if (advantageByBencao.id == hero1.id) {
            total1 = total1 + 5;
            const statusWinner = total1 > total2 ? hero1 : hero2;
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        } else {
            total2 = total2 + 5;
            const statusWinner = total1 > total2 ? hero1 : hero2;
            const result = await pool.query('INSERT INTO batalhas (heroi_id1, heroi_id2, vencedor_id) VALUES ($1, $2, $3) RETURNING *', [id1, id2, statusWinner.id]);
            res.json({
                winnerFromBattle : statusWinner,
            });
        }
    } catch (error) {
        console.error('Error executing query', error);
        res.json({ error: error.message });
    }   
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});