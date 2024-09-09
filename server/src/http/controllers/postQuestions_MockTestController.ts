import { Request, Response } from "express";
import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Question_MockTestDTO } from "../../DTO/Question_MockTestDTO";
import { QuestionDTO } from "../../DTO/QuestionDTO";

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
        let data: Question_MockTestDTO[] = [];
        req.body.questions.forEach((question: QuestionDTO) => {
            data.push({
                question_id: question.id,
                mockTest_id: req.body.mocktest_id,
                answer_id: null
            });
        }, data);
        const question_mockTests = await question_mockTestDAO.registerQuestions_MockTest(data);
        res.json({ question_mockTests });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}