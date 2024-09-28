import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";


export async function getProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
        if(req.session === undefined) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        if (!req.session.isLoggedIn) {
            return res.status(401).json({ message: 'Usuário não logado' });
        }
        if(req.session.profile === undefined) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        const profileDTO: ProfileDTO = await profileDAO.searchprofileByEmail(req.session.profile?.email || 'email');
        res.json({ profile: profileDTO });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}