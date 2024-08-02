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