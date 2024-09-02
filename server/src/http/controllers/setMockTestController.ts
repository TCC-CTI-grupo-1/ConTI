import { MockTestDAO } from "../../DAO/MockTestDAO";
import { Request, Response } from "express";

export async function setMockTestController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        if(req.session === undefined) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }
        if (!req.session.isLoggedIn) {
            return res.status(401).json({ message: 'Usuário não logado' });
        }
        if(req.session.profile === undefined) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }
        req.body.UUID = "UUID";
        const mockTest = await mockTestDAO.registerMockTest(req.body);
        res.json({ mockTest });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}