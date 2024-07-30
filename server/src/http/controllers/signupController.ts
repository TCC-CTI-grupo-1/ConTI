import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function signupController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();

    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        throw new Error('Preencha todos os campos');
      }
      else if (req.body.password.length < 8) {
        throw new Error('Senha deve ter no mínimo 8 caracteres');
      }
      else if (!req.body.email.includes('@') || !req.body.email.includes('.') || req.body.email.indexOf('@') > req.body.email.lastIndexOf('.')) {
        throw new Error('E-mail inválido');
      }


      await profileDAO.registerProfile(req.body);
      const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(req.body.email);
      req.session.isLoggedIn = true;
      req.session.cookie.maxAge = (req.body.remember) ? (1000 * 60 * 60 * 24 * 30) : (req.session.cookie.maxAge);
      const sessionProfile = {
        id: profileDTO.id,
        name: profileDTO.name,
        email: profileDTO.email,
        creation_date: profileDTO.creation_date
      }
      req.session.profile = sessionProfile;
      
    
      res.status(201).json({ message: 'Perfil cadastrado com sucesso' });
    } catch (error: any) {
      res.status(409).json({ message: error.message });
    }
}