import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function signupController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();

    try { 
      await profileDAO.registerProfile(req.body);
      const profileDTO: ProfileDTO = req.body;
      req.session.isLoggedIn = true;
      req.session.profile = profileDTO;

    
      res.json({ message: 'Perfil cadastrado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}