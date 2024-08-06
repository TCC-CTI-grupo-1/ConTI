import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { questionFilters } from "../../types/client/interfaces";

export async function getQuestionController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        const questions = await questionDAO.listQuestions();
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getQuestionWithFiltersController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        const filter = JSON.parse(req.params.filter) as questionFilters;
        const questions = await questionDAO.listQuestionByFilters(filter);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getQuestionByWeightsAndProfileController(req: Request, res: Response) {
    if (!req.session.isLoggedIn) {
        return res.status(400).json({ message: 'Usuário não logado' });
    }
    const questionDAO = new QuestionDAO();
    try {
        const profileId = req.session.profile.id;
        const questions = await questionDAO.listQuestionsByWeightsAndProfile(profileId, 3);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}