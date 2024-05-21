import { ProfileDAO } from "../../DAO/ProfileDAO";
import { Request, Response } from "express";
import { ProfileDTO } from "../../DTO/ProfileDTO";

export async function getProfileController (req: Request, res: Response) {
    console.log(req.session);
    if (req.session.isLoggedIn) {
        console.log("d-->" + req.session.profile);
        return req.session.profile;
    } else {
        res.status(401).json({ message: 'Usuário não logado' });
    }
}