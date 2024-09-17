import { mock } from "node:test";
import { MockTestDAO } from "../../DAO/MockTestDAO";
import { Request, Response } from "express";

export async function getMockTestsController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTests = await mockTestDAO.listMockTests();
        res.json({ mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getMockTestsByDecrescentDateController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTest = await mockTestDAO.listMockTestsByCreationDateDecrescent();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getMockTestsByDateAndProfileController(req: Request, res: Response) {
    if(req.session === undefined) {
        return res.status(404).json({ message: 'Sessão não inicializada' });
    }
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }
    if(req.session.profile === undefined) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    const mockTestDAO = new MockTestDAO();
    try {
        const dateString = req.params.date;
        let date = new Date(dateString);
        const regex = /GMT\s*((-|)\d{2})\d+/;
        const matches = regex.exec(date.toString());
        let gmt;
        if(matches) gmt = matches[1];
        
        date = new Date(date.getTime() + (Number(gmt) * 60 * 60 * 1000));
        date.setHours(0, 0, 0, 0);

        const mockTests = await mockTestDAO.listMockTestsByCreationDateAscendentAndProfileId(date, req.session.profile.id);
        
        res.json({ mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}