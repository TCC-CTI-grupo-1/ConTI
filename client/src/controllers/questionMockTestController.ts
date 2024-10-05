import { question_MockTestInterface} from './interfaces';

export async function handleGetQuestion_MockTestsByMockTestId(mockTestId: number): Promise<question_MockTestInterface[]> {//questionmockTestController.ts
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/question_MockTests/' + mockTestId, {
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

export async function handlePutQuestion_MockTestById(question_mockTest: question_MockTestInterface): Promise<string> {
    try {
        console.log("PUT QUESTION_MOCKTEST");
        console.log(question_mockTest);
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/question_MockTest/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question_mockTest)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.message;
        }

    } catch (err: any) {
        console.log(err.message);
        return err.message;
        
    }
}