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