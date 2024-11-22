import { ConnectionDAO } from "./ConnectionDAO";
import { AnswerDTO } from "../DTO/AnswerDTO";

const connectionDAO = new ConnectionDAO();
export class AnswerDAO {
    registerAnswer = async (answer: AnswerDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.answer.create({
                data: {
                    id: answer.id,
                    question_id: answer.question_id,
                    answer: answer.answer,
                    is_correct: answer.is_correct,
                    question_letter: answer.question_letter,
                    total_answers: answer.total_answers
                }
            });
        } catch (error) {
            throw error;
        }
    }

    updateAnswer = async (answer: AnswerDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.answer.update({
                where: {
                    id: answer.id
                },
                data: {
                    question_id: answer.question_id,
                    answer: answer.answer,
                    is_correct: answer.is_correct,
                    question_letter: answer.question_letter,
                    total_answers: answer.total_answers
                }
            });
        } catch (error) {
            throw error;
        }
    }

    updateAnswers = async (answers: AnswerDTO[]) => {
        try {
            const client = await connectionDAO.getConnection();
            answers.forEach(async (answer) => {
                await client.answer.update({
                    where: {
                        id: answer.id
                    },
                    data: {
                        question_id: answer.question_id,
                        answer: answer.answer,
                        is_correct: answer.is_correct,
                        question_letter: answer.question_letter,
                        total_answers: answer.total_answers
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    incrementAnswers = async (answers: AnswerDTO[]) => {
        try {
            const client = await connectionDAO.getConnection();
            for (const answer of answers) {
                const existingAnswer = await client.answer.findUnique({
                    where: {
                        id: answer.id
                    }
                });
                if (existingAnswer) {
                    try {
                        const result = await client.answer.update({
                            where: {
                                id: answer.id
                            },
                            data: {
                                total_answers: {
                                    increment: 1
                                }
                            }
                        });
                    } catch (updateError) {
                        console.error('Error during update:', updateError);
                    }
                } else {
                    throw new Error('Resposta não encontrada');
                }
            }
        } catch (error) {
            throw error;
        }
    }

    deleteAnswer = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.answer.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    searchAnswerById = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const answer = await client.answer.findUnique({
                where: {
                    id: id
                }
            });
            if (!answer) {
                throw new Error('Resposta não encontrada');
            }
            return answer as AnswerDTO;
        } catch (error) {
            throw error;
        }
    }

    listAnswersByQuestionId = async (question_id: number): Promise<AnswerDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const answers = await client.answer.findMany({
                where: {
                    question_id: question_id
                }
            });
            return answers as AnswerDTO[];
        } catch (error) {
            throw error;
        }
    }

    listAnswersByQuestionsIds = async (questions_ids: number[]): Promise<AnswerDTO[]> => {
        try {
            const client = await connectionDAO.getConnection();
            const answers = await client.answer.findMany({
                where: {
                    question_id: {
                        in: questions_ids
                    }
                }
            });
            return answers as AnswerDTO[];
        }
        catch (error) {
            throw error;
        }
    }
}