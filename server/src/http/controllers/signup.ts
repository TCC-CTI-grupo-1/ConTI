import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    //req.session.isLoggedIn;

    try { 
      await profileDAO.registerProfile(req.body);
      res.json({ message: 'Perfil cadastrado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}