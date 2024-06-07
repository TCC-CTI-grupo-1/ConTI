import { Request, Response } from "express";

export async function logoutController(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            res.json({ message: 'Logout sucesso' });
        }
    });

}