import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";

export async function deleteProfileController(req: Request, res: Response) {
    const profileDAO = new ProfileDAO();
    try {
        await profileDAO.deleteProfile(req.session.profile);
        res.status(200).json({ message: 'Perfil deletado com sucesso' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}