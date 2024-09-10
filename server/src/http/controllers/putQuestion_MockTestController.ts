import { Request, Response } from "express";
import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";

export async function putQuestion_MockTestController(req: Request, res: Response) {
    const question_MockTestDAO = new Question_MockTestDAO();
    try {
        await question_MockTestDAO.updateQuestion_MockTest(req.body);
        res.status(200).json({ message: 'Question_MockTest atualizado com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}