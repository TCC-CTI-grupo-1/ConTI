import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Question_MockTestDTO } from "../../DTO/Question_MockTestDTO";
import { Request, Response } from "express";

export async function getQuestion_MockTestController(req: Request, res: Response) {
    const question_mockTestDAO = new Question_MockTestDAO();

    if (isNaN(Number(req.params.id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }
    
    try {
        const questions_mockTest: Question_MockTestDTO[] = await question_mockTestDAO.listQuestion_MockTestsByMockTestId(Number(req.params.id));
        res.json({ questions_mockTest: questions_mockTest });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}