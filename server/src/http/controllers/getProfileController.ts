import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";


export async function getProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
        if (!req.session.isLoggedIn) {
            throw new Error('Usuário não logado');
        }
        const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(req.session.profile?.email || 'email');
        res.json({ profile: profileDTO });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}