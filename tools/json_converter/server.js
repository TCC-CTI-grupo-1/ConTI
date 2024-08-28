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

app.get('/marcos', async() => {
    console.warn("Foi")
    try {
        client.query(`DELETE FROM answer WHERE answer=''`);
    }
    catch(err)
    {

    }
} );

app.post('/submit-answers',async (req, res) => {
    client.query(`DELETE FROM answer WHERE answer=''`);

    const {year,number,letter} = req.body;
    if (!year || !number || !letter) {
        return res.status(400).send('answer is required');
    }
    try {
        const query = `
        UPDATE answer a
        SET is_correct = true
        FROM question q
        WHERE a.question_id = q.id
          AND q.question_number = '${number}'
          AND q.question_year = '${year}'
          AND a.question_letter = '${letter}';
    `;
        console.log(query)
        const resul = await client.query(query);
        console.log('SQL Query Result:', resul.rows);
        res.send('Queries executed successfully');
    }
    catch(err)
    {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error executing query');
    }
}
);

app.post('/submit-queries', async (req, res) => {

    const { sqlQuery, alt } = req.body;
    console.log("\n\n\n\n\n" + sqlQuery + "\n\n\n\n\n")
    if (!sqlQuery || !Array.isArray(alt) || alt.length === 0 || !alt) {
        return res.status(400).send(`${!sqlQuery ? 'sqlQuery' : 'alt'} is required`);
    }

    try {
        const result = await client.query(sqlQuery);
        const questionId = result.rows[0].id;
        console.log('SQL Query Result:', result.rows);
        console.log('SQL Query Result:', result.rows);
        const letras = ['A','B','C','D','E']
        let i =0;
        for(const a of alt)
        {
            const altQuery = `INSERT INTO answer (question_id, answer, is_correct,question_letter) VALUES (${questionId}, '${a.answer}', '${a.is_correct}','${letras[i]}');`;
            await client.query(altQuery)
            i++
        }

        res.send('Queries executed successfully');
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error executing query');
    }
});

app.get('/get-questions', async (req, res) => {
    const year = req.query.year;
    if (!year) {
        return res.status(400).json({ error: 'year is required' });
    }
    try {
        const query = `
            SELECT q.*, a.answer_text, a.answer_id
            FROM question q
            LEFT JOIN answer a ON q.id = a.question_id
            WHERE q.question_year = '${year}'
        `;
        const result = await client.query(query);
        console.log('SQL Query Result:', result.rows);

        // Group answers by question
        const questions = result.rows.reduce((acc, row) => {
            const { id, question, question_year, answer_text, answer_id } = row;
            if (!acc[id]) {
                acc[id] = { id, question, question_year, answers: [] };
            }
            if (answer_text) {
                acc[id].answers.push({ answer_id, answer_text });
            }
            return acc;
        }, {});

        res.json(Object.values(questions));
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error executing query' });
    }
});
app.post('/update-question', async (req, res) => {
    const { id, ...updatedFields } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }

    const setClause = Object.keys(updatedFields)
        .map(key => `${key} = '${updatedFields[key]}'`)
        .join(', ');

    try {
        const query = `UPDATE question SET ${setClause} WHERE id = '${id}'`;
        await client.query(query);
        res.json({ message: 'Question updated successfully' });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error executing query' });
    }
});

app.post('/update-answer', async (req, res) => {
    const { answer_id, answer_text } = req.body;
    if (!answer_id) {
        return res.status(400).json({ error: 'answer_id is required' });
    }

    try {
        const query = `UPDATE answer SET answer_text = '${answer_text}' WHERE answer_id = '${answer_id}'`;
        await client.query(query);
        res.json({ message: 'Answer updated successfully' });
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Error executing query' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});