import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function updateProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      await profileDAO.updateProfileSession(req.body);
      const sessionProfile = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        creation_date: req.body.creation_date
      }
      req.session.profile = sessionProfile;
      
    
      res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}