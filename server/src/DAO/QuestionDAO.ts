import { ConnectionDAO } from "./ConnectionDAO";
import { QuestionDTO } from "../DTO/QuestionDTO";
import { questionFilters } from "../types/client/interfaces";
import { difficulty } from "@prisma/client";
import { AreaDAO } from "./AreaDAO";
import { AreaDTO } from "../DTO/AreaDTO";
import { Area_ProfileDAO } from "./Area_ProfileDAO";
import { Area_ProfileDTO } from "../DTO/Area_ProfileDTO";

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
                    total_correct_answers: result.total_correct_answers,
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
                    total_correct_answers: result.total_correct_answers,
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
                throw new Error("Questão não encontrada");
            }

        } catch (error) {
            throw error;
        }
    }

    registerQuestion = async (question: QuestionDTO) => {
        try {
            const client = await connectionDAO.getConnection();

            const area = await client.area.findUnique({
                where: {
                    id: question.area_id
                }
            });
            if (!area) {
                return;
            }
            await client.question.create({
                data: {
                    question_text: question.question_text,
                    question_year: question.question_year,
                    total_answers: question.total_answers,
                    total_correct_answers: question.total_correct_answers,
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
                    total_correct_answers: question.total_correct_answers,
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
    listQuestionByFilters = async (filters: questionFilters) => {

        try {
            console.warn("chegamos em listquestionbyfilters");
            console.log("Filtros recebidos: ", filters);
            const areaDAO: AreaDAO = new AreaDAO();
            const client = await connectionDAO.getConnection();
            const difficulties: difficulty[] = filters.dificuldade ? filters.dificuldade : [];
            const years: number[] = filters.ano ? filters.ano.map(Number) : [];
            let areasIDs: number[] = [];
            const translate = (a:string)=>{
                if(a==="easy") return "facil";
                if(a==="medium") return "medio";
                if(a==="hard") return "dificil";
            }
            if(typeof filters.disciplina === 'string') {
                const areaNames: string[] = filters.disciplina ? filters.disciplina : [];
                for (const areaName of areaNames) {
                    const area: (AreaDTO | undefined) = await areaDAO.searchAreaByName(areaName);
                    if (area !== undefined) {
                        areasIDs.push(area.id);
                    } 
                }
            }
            else {
                areasIDs = filters.disciplina ? filters.disciplina.map(Number) : [];
            }

            for (const areaID of areasIDs) {
                const areasChildren: AreaDTO[] = await areaDAO.listAllSubAreasByParentId(areaID);
                for (const area of areasChildren) {
                    areasIDs.push(area.id);
                }
            }
            const where: any = {};
            if(areasIDs.length>0)
            {
                where.area_id = {
                    in:areasIDs
                };
            }
            if(difficulties.length>0)
            {
                where.difficulty = {
                    in:difficulties
                };
            }
            if(years.length>0)
            {
                where.question_year = {
                    in:years
                };
            }
            const result = await client.question.findMany({
                where: where
            });

            const questions: QuestionDTO[] = [];

            result.forEach((result: any) => {
                const question: QuestionDTO = {
                    id: result.id,
                    question_text: result.question_text,
                    question_year: result.question_year,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
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
            console.log(questions);
            return questions;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    listQuestionsByArea = async (areaID: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findMany({
                where: {
                    area_id: areaID
                }
            });

            const questions: QuestionDTO[] = [];

            result.forEach((result: any) => {
                const question: QuestionDTO = {
                    id: result.id,
                    question_text: result.question_text,
                    question_year: result.question_year,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
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

    listQuestionsByWeightsAndProfile = async (profileID: number, amountQuestions: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const area_ProfileDAO: Area_ProfileDAO = new Area_ProfileDAO();
            const areas_Profile: Area_ProfileDTO[] = await area_ProfileDAO.listArea_ProfileByProfileId(profileID);
            const weightsByArea: Map<number, number> = new Map();

            areas_Profile.forEach((area_Profile: Area_ProfileDTO) => {
                if (area_Profile.total_answers === 0) {
                    weightsByArea.set(area_Profile.area_id, 1);
                } else {
                    weightsByArea.set(area_Profile.area_id, area_Profile.total_correct_answers / area_Profile.total_answers);
                }
            });

            let questions: QuestionDTO[] = [];
            for (const [areaID, weight] of weightsByArea) {
                const questionsByArea: QuestionDTO[] = await this.listQuestionsByArea(areaID);
                const questionPerArea: number = Math.round((amountQuestions * weight) / weightsByArea.size);
                for (let i = 0; i < questionPerArea; ++i) {
                    questions.push(questionsByArea[i]);
                }
            }

            questions = questions.sort(() => Math.random() - 0.5).slice(0, amountQuestions);

            return questions;
        
        } catch (error) {
            throw error;
        }
    }

    listAreasIdsByQuestionsIds = async (questionsIDs: number[]): Promise<number[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findMany({
                where: {
                    id: {
                        in: questionsIDs
                    }
                }
            });

            const areasIDs: number[] = [];

            result.forEach((result: any) => {
                areasIDs.push(result.area_id);
            });

            return areasIDs;

        } catch (error) {
            throw error;
        }
    }

    searchAreaIdByQuestionId = async (questionID: number): Promise<number> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findUnique({
                where: {
                    id: questionID
                }
            });

            if (result) {
                return result.area_id;
            } else {
                throw new Error("Questão não encontrada");
            }

        } catch (error) {
            throw error;
        }
    }

    listQuestionsByIds = async (questionsIDs: number[]): Promise<QuestionDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question.findMany({
                where: {
                    id: {
                        in: questionsIDs
                    }
                }
            });

            const questions: QuestionDTO[] = [];

            result.forEach((result: any) => {
                const question: QuestionDTO = {
                    id: result.id,
                    question_text: result.question_text,
                    question_year: result.question_year,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
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

    incrementQuestionAnswers = async (questionsAndAnswers: { [key: number]: { total_correct_answers: number, total_answers: number } }) => {
        try {
            const client = await connectionDAO.getConnection();
        
            const incrementQuestion = async (question_id: number, total_correct_answers: number, total_answers: number) => {
                try {
                    await client.question.update({
                        where: {
                            id: question_id
                        },
                        data: {
                            total_correct_answers: {
                                increment: total_correct_answers
                            },
                            total_answers: {
                                increment: total_answers
                            }
                        }
                    });
                } catch (error: any) {
                    throw error;
                }
            };
        
            await Promise.all(Object.entries(questionsAndAnswers).map(async ([question_id, { total_correct_answers, total_answers }]) => {
                const questionIdNumber = Number(question_id);
                await incrementQuestion(questionIdNumber, total_correct_answers, total_answers);
            }));
        } catch (error: any) {
            throw error;
        }
    }

    changeQuestionDifficulty = async (totalAnswers: number, totalCorrectAnswers: number) => {
        if (totalAnswers === 0) {
            return "easy";
        }
        const hitRate = totalCorrectAnswers / totalAnswers;
        if (hitRate >= 0.75) {
            return "easy";
        } else if (hitRate >= 0.5) {
            return "medium";
        } else {
            return "hard";
        }
    }

    // searchQuestionParentArea = async (areaID: number) => {
    //     try {
    //         const areaDAO: AreaDAO = new AreaDAO();
    //         const area: AreaDTO = await areaDAO.searchAreaById(areaID);
    //         const parentArea: AreaDTO = await areaDAO.searchAreaById(area.parent
}
