import { Request, Response } from "express";
import { MockTestDAO } from "../../DAO/MockTestDAO";

export async function putMockTestController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        await mockTestDAO.updateMockTest(req.body);
        res.status(200).json({ message: 'MockTest atualizado com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}