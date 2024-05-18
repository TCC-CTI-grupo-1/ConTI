import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
const session = require('express-session');

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: false,
}))


app.listen(3001, () => { console.log("Server is running on port 3001")} );

app.on('listening', function() {
    
});
routes(app);