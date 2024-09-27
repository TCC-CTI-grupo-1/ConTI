import { Request, Response } from "express";

export async function getProfileSessionController (req: Request, res: Response) {
    console.log("1")
    if (!req.session.isLoggedIn) {
        if (!req.cookies.sid) {
            console.log('Usuário não logado');
            res.status(401).json({ message: 'Usuário não logado' });
        }
        console.log('Reconhecendo sessão');
        req.session.id = req.cookies.sid;
        req.session.isLoggedIn = true;
    }
    console.log('Retornando perfil');
    res.json({ profile: req.session.profile });
}