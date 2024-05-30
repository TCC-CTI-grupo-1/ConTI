import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
const session = require('express-session');

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: false,
    name: 'session',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

routes(app);

app.listen(3001, () => { console.log("Server is running on port 3001")} );
