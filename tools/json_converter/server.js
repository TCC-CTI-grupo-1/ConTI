const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const client = new Client({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabase'
});

client.connect();

app.post('/upload-json', async (req, res) => {
    try {
        const json = req.body;
        for (const q of json) {
            const alt = [ new Answer(q.alternativaA), new Answer(q.alternativaB), new Answer(q.alternativaC), new Answer(q.alternativaD)];
            if (q.alternativaE != undefined) {
                alt.push(new Answer(q.alternativaE));
            }
            const question = new Question(q.enunciado, q.textoAdicional, new Area(q.materia), q.numero, q.ano, alt, q.imagem == 'on', false);
            const sqlQuery = [`INSERT INTO question (question_text, additional_info, area_id, question_number, question_year, question_creator, test_name, hasImage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FFernando%20Theodoro%2FDocuments%2FGitHub%2FConTI%2Ftools%2Fjson_converter%2Findex.html%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A71%2C%22character%22%3A34%7D%5D "tools/json_converter/index.html");

            const res = await client.query(sqlQuery, [question.enunciation, question.additionalText, question.subject, question.questionNumber, question.questionYear, question.questionCreator, question.prova, question.hasImage]);
            const questionId = res.rows[0].id;

            const altQueries = alt.map(a => `INSERT INTO answer (question_id, answer, is_correct) VALUES ($1, $2, $3)`);
            for (const a of alt) {
                await client.query(altQueries, [questionId, a.answer, a.is_correct]);
            }
        }
        res.status(200).send('Data inserted successfully');
    } catch (e) {
        console.error('Error executing query:', e);
        res.status(500).send('Error inserting data');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});