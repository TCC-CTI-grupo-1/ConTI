import { Request, Response } from "express";
import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Question_MockTestDTO } from "../../DTO/Question_MockTestDTO";

export async function postQuestion_MockTestController(req: Request, res: Response) {
    const question_mockTestDAO = new Question_MockTestDAO();
    try {
        const question_mockTest = await question_mockTestDAO.registerQuestion_MockTest(req.body);
        res.json({ question_mockTest });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function postQuestions_MockTestController(req: Request, res: Response) {
    const question_mockTestDAO = new Question_MockTestDAO();
    try {
        console.log("oisdaw")
        const question_mockTests = await question_mockTestDAO.registerQuestions_MockTest(req.body);
        res.json({ question_mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}