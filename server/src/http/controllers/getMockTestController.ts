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
        let dateString = req.params.date;
        dateString = dateString.substring(28, 31);
        const dateInt = parseInt(dateString);
        let date = new Date(req.params.date);
        const updatedDate = new Date(date.getTime() + dateInt * 60 * 60 * 1000);
        updatedDate.setHours(0, 0, 0, 0);
        const mockTests = await mockTestDAO.listMockTestsByCreationDateAscendentAndProfileId(updatedDate, req.session.profile.id);
        res.json({ mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}