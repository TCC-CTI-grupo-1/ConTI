import { Request, Response } from "express";

export async function getProfileSessionController (req: Request, res: Response) {
    if (!req.session.isLoggedIn) {
        return res.status(400).json({ message: 'Usuário não logado' });
    }
    console.log(req.session.profile)
    res.json({ profile: req.session.profile });
}