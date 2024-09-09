import { questionInterface, respostaInterface} from './interfaces';
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
            let question: questionInterface = {"id":904,"question_text":"Em um estudo sobre solo, foi utilizada uma coluna de vidro, com uma torneira adaptada em sua extremidade, conforme ilustração. Em seguida, 100 mL de areia seca foram coloca- dos dentro da coluna. Então, lentamente, foi acrescentado água, até que o nível da água, após preencher os espaços entre os grãos, atingisse a marca de 100 mL. Após medir a quantidade de água colocada na coluna (1), a torneira foi aberta e foi medido o tempo em segundos (2), no qual toda a água presente na coluna demorou para escoar pela torneira. As propriedades do solo que foram medidas em 1 e 2 foram, respectivamente,","question_year":2020,"total_answers":0,"total_correct_answers":0,"difficulty":"facil","additional_info":"","area_id":3,"question_creator":"VUNESP","official_test_name":"CTI","question_number":31,"has_image":false,"has_latex":false};
            return [
                question
            ];
        }

    } catch (err: any) {
        let question: questionInterface = {"id":904,"question_text":"Em um estudo sobre solo, foi utilizada uma coluna de vidro, com uma torneira adaptada em sua extremidade, conforme ilustração. Em seguida, 100 mL de areia seca foram coloca- dos dentro da coluna. Então, lentamente, foi acrescentado água, até que o nível da água, após preencher os espaços entre os grãos, atingisse a marca de 100 mL. Após medir a quantidade de água colocada na coluna (1), a torneira foi aberta e foi medido o tempo em segundos (2), no qual toda a água presente na coluna demorou para escoar pela torneira. As propriedades do solo que foram medidas em 1 e 2 foram, respectivamente,","question_year":2020,"total_answers":0,"total_correct_answers":0,"difficulty":"facil","additional_info":"","area_id":3,"question_creator":"VUNESP","official_test_name":"CTI","question_number":31,"has_image":false,"has_latex":false};
        return [
            question
        ];
    }
}


export async function handlePutQuestion(question: questionInterface, answers: respostaInterface[]): Promise<boolean> { //questionController.ts
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
