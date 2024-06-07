import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";


export async function loginController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
      const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmailAndPassword(req.body.email, req.body.password);
      req.session.isLoggedIn = true;
      const sessionProfile = {
        id: profileDTO.id,
        name: profileDTO.name,
        email: profileDTO.email,
        creation_date: profileDTO.creation_date
      }
      req.session.profile = sessionProfile;
      
      res.json({ message: 'Login sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

}