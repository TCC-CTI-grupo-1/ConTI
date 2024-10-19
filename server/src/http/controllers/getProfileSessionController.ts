import { Request, Response } from "express";

export async function getProfileSessionController (req: Request, res: Response) {
    if (!req.session.isLoggedIn) {
        if (!req.cookies.sid) {
            res.status(401).json({ message: 'Usuário não logado' });
        }
        req.session.id = req.cookies.sid;
        req.session.isLoggedIn = true;
    }
    res.json({ profile: req.session.profile });
}