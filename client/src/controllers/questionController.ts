import { questionInterface, respostaInterface} from './interfaces';
import { questionFilters } from './interfaces';
import { showAlert } from '../App';
export async function handleGetQuestion(questionID: number): Promise<questionInterface | null> { //questionController
    try{
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/' + questionID, {
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
            return responseData.question;
        }
    } catch{
        return null;
    }

}

export async function handleGetQuestionsByIds(questions_ids: number[]): Promise<questionInterface[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/ids/' + JSON.stringify(questions_ids), {
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
            return responseData.questions;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetQuestions(): Promise<questionInterface[]> { //questionController
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/', {
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
            return responseData.questions;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetFilteredQuestions(filters: questionFilters): Promise<questionInterface[]> { // -> //questionController
    try {
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions/filter/' + JSON.stringify(filters), {
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
            return responseData.questions;
        }

    } catch (err: any) {
        throw new Error(err.message);
    }
}


export async function handlePutQuestion(question: questionInterface, answers: respostaInterface[]): Promise<boolean> { //questionController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response1 = await fetch(import.meta.env.VITE_ADDRESS + '/questions/'+question.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        const response2 = await fetch(import.meta.env.VITE_ADDRESS + '/answers/question/'+question.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        });

        const responseData1 = await response1.json();
        const responseData2 = await response2.json();

        if (!response1.ok && !response2.ok) {
            console.log(responseData1.message);
            throw new Error(responseData1.message + ' ' + responseData2.message); 
        } else {
            return true;
        }

    } catch (err: any) {
        return false;
    }
}

export async function handlePostQuestion(question: questionInterface): Promise<boolean> { //questionController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questions', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }

    } catch (err: any) {
        showAlert(err.message);
        return false;
    }
}

export async function handleDeleteQuestion(id: number): Promise<boolean> { //questionController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(import.meta.env.VITE_ADDRESS + '/questionsById/'+id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }

    } catch (err: any) {
        showAlert(err.message);
        return false;
    }
}
