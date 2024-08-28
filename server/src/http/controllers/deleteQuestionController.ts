import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { questionFilters } from "../../types/client/interfaces";

export async function deleteQuestionByIdController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'ID não informado' });
            return;
        }
        if(isNaN(Number(req.params.id))) {
            res.status(400).json({ message: 'ID deve ser um número' });
            return;
        }
        await questionDAO.deleteQuestion(Number(req.params.id));
        res.status(200).json({ message: 'Questão deletada com sucesso' });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}