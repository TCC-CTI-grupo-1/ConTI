import { Question_MockTestDTO } from "../DTO/Question_MockTestDTO";
import { ConnectionDAO } from "./ConnectionDAO";

const connectionDAO = new ConnectionDAO();

export class Question_MockTestDAO {

    registerQuestion_MockTest = async (question_MockTest: Question_MockTestDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdQuestion_MockTest = await client.question_mockTest.create({
                data: {
                    question_id: question_MockTest.question_id,
                    mockTest_id: question_MockTest.mockTest_id,
                    answer_id: question_MockTest.answer_id
                }
            });
            return createdQuestion_MockTest;
        } catch (error: any) {
            throw error;
        }
    }

    registerQuestions_MockTest = async (question_MockTests: Question_MockTestDTO[]) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdQuestion_MockTests = await client.question_mockTest.createMany({
                data: question_MockTests
            });
            return createdQuestion_MockTests;
        } catch (error: any) {
            throw error;
        }
    }

    updateQuestion_MockTest = async (question_MockTest: Question_MockTestDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.question_mockTest.update({
                where: {
                    question_id_mockTest_id: {
                        question_id: question_MockTest.question_id,
                        mockTest_id: question_MockTest.mockTest_id
                    }
                },
                data: {
                    question_id: question_MockTest.question_id,
                    mockTest_id: question_MockTest.mockTest_id,
                    answer_id: question_MockTest.answer_id
                }
            });
        } catch (error: any) {
            throw error;
        }
    }

    listQuestion_MockTests = async () => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question_mockTest.findMany();

            const question_MockTests: Question_MockTestDTO[] = [];

            result.forEach((result: any) => {
                const question_MockTest: Question_MockTestDTO = {
                    question_id: result.question_id,
                    mockTest_id: result.mockTest_id,
                    answer_id: result.answer_id
                }
                question_MockTests.push(question_MockTest);
            });

            return question_MockTests;
        } catch (error: any) {
            throw error;
        }
    }

    listQuestion_MockTestsByMockTestId = async (mockTest_id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.question_mockTest.findMany({
                where: {
                    mockTest_id: mockTest_id
                }
            });

            const question_MockTests: Question_MockTestDTO[] = [];

            result.forEach((result: any) => {
                const question_MockTest: Question_MockTestDTO = {
                    question_id: result.question_id,
                    mockTest_id: result.mockTest_id,
                    answer_id: result.answer_id
                }
                question_MockTests.push(question_MockTest);
            });

            return question_MockTests;
        } catch (error: any) {
            throw error;
        }
    }
}