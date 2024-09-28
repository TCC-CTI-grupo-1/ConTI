import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import cookieParser from 'cookie-parser';
import path from 'path';

const session = require('express-session');
const fs = require('fs');
const https = require('https');
const app = express();
const RedisStore = require('connect-redis')(session);
const redis = new Redis();

dotenv.config();
const urlLocal = 'http://localhost:5173';
const urlRemoto = 'https://projetoscti.com.br';
const urlCloud = 'http://cti.4edge.cloud:3000';

app.use(cors({
    origin: [urlLocal, urlRemoto, urlCloud],
    credentials: true
}));
app.use(express.json());

app.use(session({
    store: new RedisStore({ client: redis }),
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
const port = 3000;
app.use(cookieParser());
app.use(express.static('uploads'));
// const options = {
//     key: fs.readFileSync(path.join(__dirname, 'key.pem')),
//     cert: fs.readFileSync('cert.pem')
// };

// https.createServer(options, app).listen(3001);

routes(app);

app.listen(port, () => { console.log("Server is running on port 3001")} );
