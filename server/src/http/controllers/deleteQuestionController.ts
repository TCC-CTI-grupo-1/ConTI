import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { questionFilters } from "../../types/client/interfaces";

export async function deleteQuestionByIdController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        if (!req.body.id) {
            throw new Error('Preencha todos os campos');
        }
        await questionDAO.deleteQuestion(req.body.id);
        res.status(200).json({ message: 'Questão deletada com sucesso' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}