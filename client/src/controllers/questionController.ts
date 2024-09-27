import { questionInterface, respostaInterface} from './interfaces';
import { questionFilters } from './interfaces';
import { showAlert } from '../App';

async function handleAddImage(image:FormData, editing:boolean)
{
    image.append("editing",editing.toString())
    const response = await fetch('client\\addImage.php', {
        method:'POST',
        body:image
    })
    const result = await response.json();
    if(response.ok)
    {
        console.log("Upload feito com sucesso: ",result.filePath)
    }
    else {
        showAlert("Erro ao enviar imagem: " + result.message,"error");
    }
}
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
        responseData.questions.forEach((question: questionInterface) => {
            question.difficulty = question.difficulty.replace("facil", "Fácil")
                                  .replace("medio", "Médio")
                                  .replace("dificil", "Difícil");
        });
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.questions;
        }

    } catch (err: any) {
        throw new Error(err.message);
    }
}


export async function handlePutQuestion(question: questionInterface, answers: respostaInterface[], image: File | null): Promise<boolean> { //questionController.ts
    try {

        console.log("PUT QUESTION");        
        const response1 = await fetch(import.meta.env.VITE_ADDRESS + '/questions/' + question.id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        const response2 = await fetch(import.meta.env.VITE_ADDRESS + '/answers', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        });

        let response3: any;
        console.log("JORGE");
        if(image !== null){
            console.log("Com imagem");

            const formData = new FormData();
            formData.append('image', image);
            formData.append('questionID', question.id.toString());
            response3 = await fetch(import.meta.env.VITE_ADDRESS + '/image', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
        }
        else{
            console.log("Sem imagem");
            response3 = {"ok":true};
        }


        const responseData1 = await response1.json();
        const responseData2 = await response2.json();
        const responseData3 = await response3.json();

        if (!response1.ok || !response2.ok || !response3.ok) {
            console.log(responseData1.message, responseData2.message, responseData3.message);
            throw new Error(responseData1.message + ' ' + responseData2.message + ' ' + responseData3.message); 
        } else {
            return true;
        }

    } catch (err: any) {
        return false;
    }
}

export async function handlePutQuestion_withImage(question:questionInterface,answers:respostaInterface[], image:FormData)
{
    try{
        handleAddImage(image,true);
        return handlePutQuestion(question,answers, image.get('image') as File); //ultimo pedaço antes não existia, remover caso necessario
    }catch(err:any)
    {
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

export async function handlePostQuestion_withImage(question:questionInterface, image:FormData)
{
    try{
        handleAddImage(image,false);
        return handlePostQuestion(question);
    } catch(err:any)
    {
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
