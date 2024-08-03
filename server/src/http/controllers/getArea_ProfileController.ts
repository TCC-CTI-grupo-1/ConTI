import { Area_ProfileDTO } from "../../DTO/Area_ProfileDTO";
import { Area_ProfileDAO } from "../../DAO/Area_ProfileDAO";

import { Request, Response } from "express";

export async function getArea_ProfileController(req: Request, res: Response) {
    const area_profileDAO = new Area_ProfileDAO();
    if (!req.session.isLoggedIn) {
        return res.status(400).json({ message: 'Usuário não logado' });
    }
    try {
        const areas_profile: Area_ProfileDTO[] = await area_profileDAO.listArea_ProfileByProfileId(req.session.profile.id);
        res.json({ areas_profile });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}