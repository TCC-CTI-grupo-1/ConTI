import { Request, Response } from "express";
import { QuestionDAO } from "../../DAO/QuestionDAO";
import { QuestionDTO } from "../../DTO/QuestionDTO";
import { questionFilters, DifficultyType } from "../../types/client/interfaces";
import { DifficultyLevel } from "../../test_builder";
import { TestBuilder, TestBlueprint } from "../../test_builder";
import test from "node:test";
import { createClient } from 'redis';

const passRedis = process.env.REDIS_PASS;
const hostRedis = process.env.REDIS_HOST;
const portRedis = parseInt(process.env.REDIS_PORT as string);
let redisClient = createClient({
    password: passRedis,
    socket: {
        host: hostRedis,
        port: portRedis
    }
});
redisClient.connect();

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

import { semana_do_colegio_tests } from "../../pre_build_tests";

export async function getQuestionsForNewMockTestByProfileController(req: Request, res: Response) {

    try {
        const userId = req.params.uuid;

        const profileString = await redisClient.get(`profile:${userId}`);

        let profile = null;
        if (profileString) {
            profile = JSON.parse(profileString); // Parse the string into an object
        }

        if (profile === null) {
            return res.status(404).json({ message: 'Sessão não inicializada' });
        }

        const profileId = profile.id;
        const test_blueprint = new TestBlueprint(50, {1000: 15, 1019:15, 1072:15, 1037 : 5}, {1: DifficultyLevel.MEDIUM, 2: DifficultyLevel.MEDIUM}, profileId);
        const test_builder = new TestBuilder([]);
        const questions = await test_builder.buildTest(test_blueprint);
        //const questions = semana_do_colegio_tests;
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