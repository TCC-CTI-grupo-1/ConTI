const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');


const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

const client = new Client({
    user: 'projetoscti23',
    host: 'pgsql.projetoscti.com.br',
    database: 'projetoscti23',
    password: 'eq13B459',
    port: 5432
});
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

app.post('/submit-queries', async (req, res) => {
    const { sqlQuery, altQueries } = req.body;

    if (!sqlQuery || !altQueries) {
        return res.status(400).send('Missing sqlQuery or altQueries');
    }

    try {
        // Execute the SQL query
        const result = await client.query(sqlQuery);
        console.log('SQL Query Result:', result.rows);

        // Optionally handle alternative queries
        altQueries.forEach(async (query) => {
            const altResult = await client.query(query);
            console.log('Alternative Query Result:', altResult.rows);
        });

        res.send('Queries executed successfully');
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error executing query');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});