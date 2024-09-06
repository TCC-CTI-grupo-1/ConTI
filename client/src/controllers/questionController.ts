import { questionInterface} from './interfaces';
import { questionFilters } from './interfaces';
import { showAlert } from '../App';
export async function handleGetQuestion(questionID: number): Promise<questionInterface | null> { //questionController
    try{
        const response = await fetch('http://localhost:3001/questions/' + questionID, {
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
        const response = await fetch('http://localhost:3001/questions/ids/' + JSON.stringify(questions_ids), {
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
        const response = await fetch('http://localhost:3001/questions/', {
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
        const response = await fetch('http://localhost:3001/questions/filter/' + JSON.stringify(filters), {
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


export async function handlePutQuestion(question: questionInterface): Promise<boolean> { //questionController.ts
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response1 = await fetch('http://localhost:3001/questions/'+question.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        const response2 = await fetch('http://localhost:3001/answers/question/'+question.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question.answers)
        });

        const responseData1 = await response1.json();
        const responseData2 = await response2.json();

        if (!response1.ok && !response2.ok) {
            //console.log(responseData.message);
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
        const response = await fetch('http://localhost:3001/questions', {
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
        const response = await fetch('http://localhost:3001/questionsById/'+id, {
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
