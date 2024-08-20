import { Request, Response } from "express";
import { AnswerDAO } from "../../DAO/AnswerDAO";
import { AnswerDTO } from "../../DTO/AnswerDTO";

export async function getAnswersByQuestionIdController(req: Request, res: Response) {
    const question_id = req.params.question_id;
    const answerDAO = new AnswerDAO();

    if (isNaN(Number(question_id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }
    
    try {
        const answers: AnswerDTO[] = await answerDAO.listAnswersByQuestionId(Number(req.params.question_id));
        res.json({ answers: answers });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAnswersByQuestionsIdsController(req: Request, res: Response) {
    const questions_ids = req.body.questions_ids;
    const answerDAO = new AnswerDAO();
    
    try {
        const answers: AnswerDTO[] = await answerDAO.listAnswersByQuestionsIds(questions_ids);
        res.json({ answers: answers });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}