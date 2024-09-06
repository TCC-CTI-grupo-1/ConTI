import { question_MockTestInterface} from './interfaces';

export async function handleGetQuestion_MockTestsByMockTestId(mockTestId: number): Promise<question_MockTestInterface[]> {//questionmockTestController.ts
    try {
        const response = await fetch('http://localhost:3001/question_MockTests/' + mockTestId, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.question_mockTests;
        }

    } catch (err: any) {
        return [];
    }
}