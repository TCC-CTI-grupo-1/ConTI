import { MockTestDAO } from "../../DAO/MockTestDAO";
import { Request, Response } from "express";

export async function getMockTestsByDecrescentDateController(req: Request, res: Response) {
    const mockTestDAO = new MockTestDAO();
    try {
        const mockTest = await mockTestDAO.listMockTestsByCreationDateDecrescent();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}