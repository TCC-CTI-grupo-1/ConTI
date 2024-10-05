import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { QuestionDTO } from "../../DTO/QuestionDTO";
import { questionFilters, DifficultyType } from "../../types/client/interfaces";
import { DifficultyLevel } from "../../test_builder";
import { TestBuilder, TestBlueprint } from "../../test_builder";
import test from "node:test";
import { difficulty } from "@prisma/client";

export async function getQuestionController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        let questions: QuestionDTO[] = [];
        
        /*if(req.body !== undefined && req.body.questionIDS !== undefined) {
            const questionIDS = req.body.questionIDS;
            questions = await questionDAO.listQuestionsByIds(questionIDS);
        }
        else{
        }*/

        questions = await questionDAO.listQuestions();

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
        const question: QuestionDTO = await questionDAO.searchQuestionById(Number(id));
        res.json({ question: question });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getQuestionsWithFiltersController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        const filter = JSON.parse(req.params.filter) as questionFilters;
        const questions: QuestionDTO[] = await questionDAO.listQuestionByFilters(filter);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function getQuestionsForNewMockTestByProfileController(req: Request, res: Response) {
    if(req.session === undefined) {
        return res.status(404).json({ message: 'Sessão não inicializada' });
    }
    if (!req.session.isLoggedIn) {
        return res.status(401).json({ message: 'Usuário não logado' });
    }
    if(req.session.profile === undefined) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    
    try {
        const profileId = req.session.profile.id;
        const test_blueprint = new TestBlueprint(50, {1:15,2:15,3:15,4:5}, {1:DifficultyLevel.MEDIUM,2:DifficultyLevel.MEDIUM}, profileId);
        const test_builder = new TestBuilder([]);
        const questions = await test_builder.buildTest(test_blueprint);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function getQuestionsByIdsController(req: Request, res: Response) {
    const questionDAO = new QuestionDAO();
    try {
        const questionIDS = JSON.parse(req.params.ids) as number[];
        const questions: QuestionDTO[] = await questionDAO.listQuestionsByIds(questionIDS);
        res.json({ questions: questions });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}