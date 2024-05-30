import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function getProfileController (req: Request, res: Response) {
    if (req.session.isLoggedIn) {
        res.status(200).json(req.session.profile);
    } else {
        res.status(401).json({ message: 'Usuário não logado' });
    }
}