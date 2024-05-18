import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    req.session.isLoggedIn = true;
    try {
      await profileDAO.searchprofileByEmailAndPassword(req.body.email, req.body.password);
      res.json({ message: 'Login sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

}