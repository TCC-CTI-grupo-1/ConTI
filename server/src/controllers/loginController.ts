import { ProfileDAO } from '../DAO/ProfileDAO';
import { Request, Response } from 'express';


export function loginController(req: Request, res: Response) {
    res.send("login");
}

export function registerController(req: Request, res: Response) {
    const user = req.body;
    const profileDAO = new ProfileDAO();
    profileDAO.registerProfile(user);

}