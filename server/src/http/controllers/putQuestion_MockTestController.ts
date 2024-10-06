import { Request, Response } from "express";
import { Question_MockTestDAO } from "../../DAO/Question_MockTestDAO";
import { Question_MockTestDTO } from "../../DTO/Question_MockTestDTO";

export async function putQuestion_MockTestController(req: Request, res: Response) {
    try {
        const question_MockTestDAO = new Question_MockTestDAO();
        await question_MockTestDAO.updateQuestion_MockTest(req.body as Question_MockTestDTO);
        res.status(200).json({ message: 'Question_MockTest atualizado com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}