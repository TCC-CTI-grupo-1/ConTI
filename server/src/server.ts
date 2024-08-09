import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const session = require('express-session');

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5174',
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

app.use(cookieParser());

routes(app);

app.listen(3001, () => { console.log("Server is running on port 3001")} );
