import { Request, Response } from "express";

export async function getProfileSessionController (req: Request, res: Response) {
    if (!req.session.isLoggedIn) {
        res.status(400).json({ message: 'Usuário não logado' });
    }
    res.json({ profile: req.session.profile });
}