import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function updateUserController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      await profileDAO.updateProfile(req.body);
      const profileDTO: ProfileDTO = req.body;

    
      res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
}