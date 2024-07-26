import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";

export async function updateProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      if (!req.body.name || !req.body.email) {
        throw new Error('Preencha todos os campos');
      }
      else if (!req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.indexOf('@') > req.body.email.lastIndexOf('.')) {
          throw new Error('E-mail inválido');
      }
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