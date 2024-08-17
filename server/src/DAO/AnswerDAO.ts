import { ConnectionDAO } from "./ConnectionDAO";
import { AnswerDTO } from "../DTO/AnswerDTO";

const connectionDAO = new ConnectionDAO();

export class AnswerDAO {
    registerAnswer = async (answer: AnswerDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdAnswer = await client.answer.create({
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
            const updatedAnswer = await client.answer.update({
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

    deleteAnswer = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const deletedAnswer = await client.answer.delete({
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

    listAnswersByQuestionId = async (question_id: number) => {
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
}