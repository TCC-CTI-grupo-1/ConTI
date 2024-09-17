import { ConnectionDAO } from "./ConnectionDAO";
import { MockTestDTO } from "../DTO/MockTestDTO";

const connectionDAO = new ConnectionDAO();

export class MockTestDAO {
    registerMockTest = async (mockTest: MockTestDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            const createdMockTest = await client.mockTest.create({
                data: {
                    title: mockTest.title,
                    creation_date_tz: mockTest.creation_date_tz,
                    profile_id: mockTest.profile_id,
                    total_answers: mockTest.total_answers,
                    total_correct_answers: mockTest.total_correct_answers,
                    time_limit: mockTest.time_limit,
                    time_spent: mockTest.time_spent,
                    test_type: mockTest.test_type,
                    UUID: mockTest.UUID
                }
            });
            return createdMockTest;
        } catch (error: any) {
            throw error;
        }
    }

    updateMockTest = async (mockTest: MockTestDTO) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.mockTest.update({
                where: {
                    id: mockTest.id
                },
                data: {
                    title: mockTest.title,
                    creation_date_tz: mockTest.creation_date_tz,
                    profile_id: mockTest.profile_id,
                    total_answers: mockTest.total_answers,
                    total_correct_answers: mockTest.total_correct_answers,
                    time_limit: mockTest.time_limit,
                    time_spent: mockTest.time_spent,
                    test_type: mockTest.test_type
                }
            });
        } catch (error: any) {
            throw error;
        }
    }

    listMockTests = async () => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.mockTest.findMany();

            const mockTests: MockTestDTO[] = [];

            result.forEach((result: any) => {
                const mockTest: MockTestDTO = {
                    id: result.id,
                    title: result.title,
                    creation_date_tz: result.creation_date_tz,
                    profile_id: result.profile_id,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
                    time_limit: result.time_limit,
                    time_spent: result.time_spent,
                    test_type: result.test_type,
                    UUID: result.UUID
                }
                mockTests.push(mockTest);
            });

            return mockTests;

        } catch (error) {
            throw error;
        }
    }

    searchMockTestById = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const mockTest = await client.mockTest.findUnique({
                where: {
                    id: id
                }
            });
            return mockTest;
        } catch (error) {
            throw error;
        }
    }

    searchMockTestByProfileId = async (profile_id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const mockTest = await client.mockTest.findMany({
                where: {
                    profile_id: profile_id
                }
            });
            return mockTest;
        } catch (error) {
            throw error;
        }
    }
    
    searchMockTestByUUID = async (uuid: string) => {
        try {
            const client = await connectionDAO.getConnection();
            const mockTest = await client.mockTest.findUnique({
                where: {
                    UUID: uuid
                }
            });
            return mockTest;
        } catch (error) {
            throw error;
        }
    }

    listMockTestsByCreationDateDecrescent = async () => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.mockTest.findMany({
                orderBy: {
                    creation_date_tz: 'desc'
                }
            });

            const mockTests: MockTestDTO[] = [];

            result.forEach((result: any) => {
                const mockTest: MockTestDTO = {
                    id: result.id,
                    title: result.title,
                    creation_date_tz: result.creation_date_tz,
                    profile_id: result.profile_id,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
                    time_limit: result.time_limit,
                    time_spent: result.time_spent,
                    test_type: result.test_type,
                    UUID: result.UUID
                }
                mockTests.push(mockTest);
            });

            return mockTests;

        } catch (error) {
            throw error;
        }
    }

    listMockTestsByCreationDateAscendentAndProfileId = async (creationDay: Date, profile_id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            const result = await client.mockTest.findMany({
                where: {
                    AND: [
                        {
                            creation_date_tz: {
                                gte: creationDay,
                                lt: new Date(creationDay.getTime() + 24 * 60 * 60 * 1000)
                            }
                        },
                        {
                            profile_id: profile_id
                        }
                    ]
                },
                orderBy: {
                    creation_date_tz: 'asc'
                }
            });

            const mockTests: MockTestDTO[] = [];

            result.forEach((result: any) => {
                const mockTest: MockTestDTO = {
                    id: result.id,
                    title: result.title,
                    creation_date_tz: result.creation_date_tz,
                    profile_id: result.profile_id,
                    total_answers: result.total_answers,
                    total_correct_answers: result.total_correct_answers,
                    time_limit: result.time_limit,
                    time_spent: result.time_spent,
                    test_type: result.test_type,
                    UUID: result.UUID
                }
                mockTests.push(mockTest);
            });

            return mockTests;

        } catch (error) {
            throw error;
        }
    }

    deleteMockTest = async (id: number) => {
        try {
            const client = await connectionDAO.getConnection();
            await client.mockTest.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    
}