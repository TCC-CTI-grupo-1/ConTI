import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

const session = require('express-session');
const fs = require('fs');
const https = require('https');
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
        maxAge: 1000 * 60 * 60 * 12,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));
const port = process.env.PORT || 3001;
app.use(cookieParser());
app.use(express.static('uploads'));
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'key.pem')),
//     cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, app).listen(3001);

routes(app);

app.listen(port, () => { console.log("Server is running on port 3001")} );
