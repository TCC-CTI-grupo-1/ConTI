import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function signupController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();

    try { 
      await profileDAO.registerProfile(req.body);
      const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(req.body.email);
      req.session.isLoggedIn = true;
      const sessionProfile = {
        id: profileDTO.id,
        name: profileDTO.name,
        email: profileDTO.email,
        creation_date: profileDTO.creation_date
      }
      req.session.profile = sessionProfile;
      
    
      res.json({ message: 'Perfil cadastrado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}