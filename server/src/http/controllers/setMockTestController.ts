import { MockTestDAO } from "../../DAO/MockTestDAO";
import { Request, Response } from "express";

export async function setMockTestController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTest = await mockTestDAO.registerMockTest(req.body);
        res.json({ mockTest });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}