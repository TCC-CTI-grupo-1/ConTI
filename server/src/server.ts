import express from 'express';
import cors from 'cors';
import { routes } from './http/routes';
import dotenv from 'dotenv';
import RedisStore from "connect-redis"
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createClient } from 'redis';
// import path from 'path';

// const fs = require('fs');
// const https = require('https');
const app = express();
const passRedis = process.env.REDIS_PASS;
const hostRedis = process.env.REDIS_HOST;
const portRedis = parseInt(process.env.REDIS_PORT as string);
let redisClient = createClient({
    password: passRedis,
    socket: {
        host: hostRedis,
        port: portRedis
    }
});
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({
    client: redisClient
});

dotenv.config();
const urlLocal = 'http://localhost:5173';
const urlRemoto = 'https://projetoscti.com.br';
const urlCloud = 'http://cti.4edge.cloud:3000';

app.use(cors({
    origin: [urlLocal, urlRemoto, urlCloud],
    credentials: true
}));
app.use(express.json());

if (process.env.SECRET_KEY === undefined) {
    console.error('SECRET_KEY não definida');
    process.exit(1);
}

app.use(session({
    store: redisStore,
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

app.listen(port, () => { console.log("Server is running on port " + port) });
