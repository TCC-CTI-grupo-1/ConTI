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

export async function getQuestionByIdController(req: Request, res: Response) {
    const id = req.params.id;
    const questionDAO = new QuestionDAO();

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID deve ser um número" });
    }
    
    try {
        const question = await questionDAO.searchQuestionById(Number(req.params.id));
        res.json({ question: question });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
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
    if(req.session === undefined) {
        return res.status(404).json({ message: 'Sessão não inicializada' });
    }
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }
    if(req.session.profile === undefined) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    const questionDAO = new QuestionDAO();
    try {
        const profileId = req.session.profile.id;
        const questions = await questionDAO.listQuestionsByWeightsAndProfile(profileId, 10);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}