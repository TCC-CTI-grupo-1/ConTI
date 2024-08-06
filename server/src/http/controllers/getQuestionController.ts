import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { questionFilters } from "../../types/client/interfaces";

export async function getQuestionWithFiltersController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        const filter = JSON.parse(req.params.filter) as questionFilters;
        const questions = await questionDAO.searchQuestionByFilters(filter);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}