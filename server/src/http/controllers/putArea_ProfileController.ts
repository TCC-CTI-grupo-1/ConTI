import { Area_ProfileDTO } from "../../DTO/Area_ProfileDTO";
import { Area_ProfileDAO } from "../../DAO/Area_ProfileDAO";

import { Request, Response } from "express";

export async function incrementArea_ProfileController(req: Request, res: Response) {
    const area_profileDAO = new Area_ProfileDAO();
    if(req.session === undefined) {
        return res.status(404).json({ message: 'Sessão não inicializada' });
    }
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }
    if(req.session.profile === undefined) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    try {
        await area_profileDAO.incrementAreas_Profile(req.session.profile.id, req.body.area_ids);
        res.json({ message: 'Áreas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function incrementAreas_ProfileController(req: Request, res: Response) {
    const area_profileDAO = new Area_ProfileDAO();
    if(req.session === undefined) {
        return res.status(404).json({ message: 'Sessão não inicializada' });
    }
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }
    if(req.session.profile === undefined) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    try {
        await area_profileDAO.incrementAreas_Profile(req.session.profile.id, req.body.areasAndAnswers);
        res.json({ message: 'Áreas incrementadas com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}