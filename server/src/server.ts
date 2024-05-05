import { Request, Response } from 'express';

const express = require('express');
const app = express();
app.use(express.json());

app.post('/signup', (req: Request, res: Response) => { 
  console.log("signup route hit");
  res.send("signup")});

app.listen(3001, () => { console.log("Server is running on port 3001")} );