import dotenv from 'dotenv';
import { defaultRoute } from './routes/web';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// routes
app.use('/', defaultRoute);

// start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});