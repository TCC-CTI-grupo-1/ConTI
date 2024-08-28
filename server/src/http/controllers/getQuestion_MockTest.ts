import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Question_MockTestDTO } from "../../DTO/Question_MockTestDTO";
import { Request, Response } from "express";

export async function getQuestion_MockTestsController(req: Request, res: Response) {
    const question_mockTestDAO = new Question_MockTestDAO();

    if (isNaN(Number(req.params.id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }
    
    try {
        const question_mockTests: Question_MockTestDTO[] = await question_mockTestDAO.listQuestion_MockTestsByMockTestId(Number(req.params.id));
        res.json({ question_mockTests: question_mockTests });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}