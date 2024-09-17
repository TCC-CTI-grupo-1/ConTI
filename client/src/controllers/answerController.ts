import {respostaInterface} from './interfaces';


function getSortedQuestions(responseData:any):any[]
{
    let ans:respostaInterface[] = responseData.answers;
    ans.sort((a: respostaInterface, b: respostaInterface) => {
        return a.question_letter.localeCompare(b.question_letter);
      });
    return ans;
}

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
        getSortedQuestions(responseData)
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return getSortedQuestions(responseData);
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
            return getSortedQuestions(responseData);
        }

    } catch (err: any) {
        return [];
    }
}