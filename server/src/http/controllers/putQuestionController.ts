import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";

export async function putQuestionByIdController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        if (!req.body.id || 
            !req.body.question_text
        ) {
            throw new Error('Preencha todos os campos');
        }
        
        await questionDAO.updateQuestion(req.body);
        res.status(200).json({ message: 'Questão atualizada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}