import { ConnectionDAO } from "./ConnectionDAO";
import { QuestionDTO } from "../DTO/QuestionDTO";
import { questionFilters } from "../types/client/interfaces";
import { difficulty } from "@prisma/client";
import { AreaDAO } from "./AreaDAO";
import { AreaDTO } from "../DTO/AreaDTO";

const connectionDAO = new ConnectionDAO();

export class QuestionDAO {
    listQuestions = async () => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findMany();

            const questions: QuestionDTO[] = [];
            
            result.forEach((result: any) => {
                const question: QuestionDTO = {
                    id: result.id,
                    question_text: result.question_text,
                    question_year: result.question_year,
                    total_answers: result.total_answers,
                    total_answers_right: result.total_answers_right,
                    difficulty: result.difficulty,
                    additional_info: result.additional_info,
                    area_id: result.area_id,
                    question_creator: result.question_creator,
                    official_test_name: result.official_test_name,
                    question_number: result.question_number,
                    has_image: result.has_image,
                    has_latex: result.has_latex
                };
                questions.push(question);
            });

            return questions;

        } catch (error) {
            throw error;
        }
    }

    searchQuestionById = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findUnique({
                where: {
                    id: id
                }
            });

            if (result) {
                const question: QuestionDTO = {
                    id: result.id,
                    question_text: result.question_text,
                    question_year: result.question_year,
                    total_answers: result.total_answers,
                    total_answers_right: result.total_answers_right,
                    difficulty: result.difficulty,
                    additional_info: result.additional_info,
                    area_id: result.area_id,
                    question_creator: result.question_creator,
                    official_test_name: result.official_test_name,
                    question_number: result.question_number,
                    has_image: result.has_image,
                    has_latex: result.has_latex
                };
                return question;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }

    registerQuestion = async (question: QuestionDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.question.create({
                data: {
                    question_text: question.question_text,
                    question_year: question.question_year,
                    total_answers: question.total_answers,
                    total_answers_right: question.total_answers_right,
                    difficulty: question.difficulty,
                    additional_info: question.additional_info,
                    area_id: question.area_id,
                    question_creator: question.question_creator,
                    official_test_name: question.official_test_name,
                    question_number: question.question_number,
                    has_image: question.has_image,
                    has_latex: question.has_latex
                }
            });
        } catch (error) {
            throw error;
        }
    }

    updateQuestion = async (question: QuestionDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.question.update({
                where: {
                    id: question.id
                },
                data: {
                    question_text: question.question_text,
                    question_year: question.question_year,
                    total_answers: question.total_answers,
                    total_answers_right: question.total_answers_right,
                    difficulty: question.difficulty,
                    additional_info: question.additional_info,
                    area_id: question.area_id,
                    question_creator: question.question_creator,
                    official_test_name: question.official_test_name,
                    question_number: question.question_number,
                    has_image: question.has_image,
                    has_latex: question.has_latex
                }
            });
        } catch (error) {
            throw error;
        }
    }

    deleteQuestion = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.question.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    searchQuestionByFilters = async (filters: questionFilters) => {
        try {
            const areaDAO: AreaDAO = new AreaDAO();

            const client = await connectionDAO.getConnection();
            const areaNames: string[] = filters.disciplina ? filters.disciplina : [];
            const difficulties: difficulty[] = filters.dificuldade ? filters.dificuldade : [];
            const years: number[] = filters.ano ? filters.ano : [];
            
            let resultAllParents: AreaDTO[] = [];

            // for (let i = 0; i < areaNames.length; i++) {
            //     const area = await areaDAO.searchAreaByName(areaNames[i]);
            //     resultAllParents = resultAllParents.concat(await areaDAO.listAllParents(area.id));
            // }

        } catch (error) {
            throw error;
        }
    }
}