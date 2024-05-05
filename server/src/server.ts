import { Request, Response } from 'express';
import { ProfileDAO } from './DAO/ProfileDAO';

const express = require('express');
const app = express();
app.use(express.json());

app.post('/signup', (req: Request, res: Response) => { 
  console.log("signup route hit");
  const profileDAO = new ProfileDAO();
  profileDAO.registerProfile(req.body);
  res.json({ message: "sidagnup" })
});

app.listen(3001, () => { console.log("Server is running on port 3001")} );