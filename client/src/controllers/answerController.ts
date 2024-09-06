import {respostaInterface} from './interfaces';

export async function handleGetAnswersByQuestionId(questionID: number): Promise<respostaInterface[]> { // answerController
    try{
        const response = await fetch('http://localhost:3001/answers/question/' + questionID, {
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
            return responseData.answers;
        }
    } catch{
        return [];
    }
}


export async function handleGetAnswersByQuestionsIds(questions_ids: number[]): Promise<respostaInterface[]> { // answerController
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/answers/questions/' + JSON.stringify(questions_ids), {
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
            return responseData.answers;
        }

    } catch (err: any) {
        return [];
    }
}