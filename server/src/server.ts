import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const session = require('express-session');

const app = express();

dotenv.config();
const urlLocal = 'http://localhost:5173';
const urlRemoto = 'https://projetoscti.com.br';
app.use(cors({
    origin: [urlLocal, urlRemoto],
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
    cookie: {
        maxAge: 1000 * 60 * 60 * 12
    }
}))
const port = process.env.PORT || 3001;
app.use(cookieParser());

routes(app);

app.listen(port, () => { console.log("Server is running on port 3001")} );
