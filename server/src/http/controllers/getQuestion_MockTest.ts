import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Request, Response } from "express";

export async function getQuestion_MockTestController(req: Request, res: Response) {
    const question_mockTestDAO = new Question_MockTestDAO();
    try {
        const questions_mockTest = await question_mockTestDAO.listQuestion_MockTestsByMockTestId(Number(req.params.id));
        res.json({ questions_mockTest: questions_mockTest });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}