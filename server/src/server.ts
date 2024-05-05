import { Request, Response } from 'express';
import { ProfileDAO } from './DAO/ProfileDAO';
import { ProfileDTO } from './DTO/ProfileDTO';

const express = require('express');
const app = express();
app.use(express.json());

app.post('/signup', async (req: Request, res: Response) => {
  const profileDAO = new ProfileDAO();
  try { 
    await profileDAO.registerProfile(req.body);
    res.json({ message: 'Perfil cadastrado com sucesso' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const profileDAO = new ProfileDAO();
  try {
    const profile: ProfileDTO = await profileDAO.searchprofileByEmailAndPassword(req.body.email, req.body.password);
    res.json({ message: 'Login sucesso' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3001, () => { console.log("Server is running on port 3001")} );