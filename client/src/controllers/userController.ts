
//import { json } from 'react-router-dom';
import { Profile } from '../../../server/src/types/express-session';
import { questionInterface, simuladoInterface, areaInterface, area_ProfileInterface, question_MockTestInterface, respostaInterface } from './interfaces';
import { questionFilters } from './interfaces';
import { showAlert } from '../App';

const validadeEmail = (email: string): string[] => { //Deveria mudar string[] para uma interface??
    let newIsEmailValid = ['@', '.', 't'];

    //Deve ter só 1 '@'
    if (email.split('@').length - 1 == 1) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '@');
    }

    if (email.includes('.')) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== '.');
    }

    if (email.indexOf('@') < email.lastIndexOf('.')) {
        newIsEmailValid = newIsEmailValid.filter((char) => char !== 't');
    }

    return newIsEmailValid;
}

const validadePassword = (password: string): number[] => {

    /*Password regras:
    1. Pelo menos 8 caracteres
    2. Pelo menos uma letra maiúscula
    3. Pelo menos um número
    4. Pelo menos um caractere especial //não existe mais
    */

    let newIsPasswordValid = [1, 2, 3];
    if (password.length >= 8) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 1)
    }

    if (password.match(/[A-Z]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 2)
    }

    if (password.match(/[0-9]/)) {
        newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 3)

    }

    /*e.target.value.match(/[!@#$%^&*_]/) ?
    newIsPasswordValid = newIsPasswordValid.filter((rule) => rule !== 4)
    : !newIsPasswordValid.includes(4) && (newIsPasswordValid = [...newIsPasswordValid, 4]);*/

    return newIsPasswordValid;
}


//Funções assincronas

export async function handleSignup(name: string, email: string, password: string, remember: boolean): Promise<string | null> {

    //await new Promise(resolve => setTimeout(resolve, 3000));
    //return true;

    try {
        const data = {
            name: name,
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return null;
        }
    } catch (err: any) {
        return err.message;
    }
}

export async function handleLogin(email: string, password: string, remember: boolean): Promise<[boolean, string]> {
    try {
        const data = {
            email: email,
            password: password,
            remember: remember
        };

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            //window.location.href = 'https://projetoscti.com.br/projetoscti24/TCC_TEMP';
            //fernando sofre de disfunção erétil
            return [true, "Login bem sucedido"];
        }
    } catch (err: any) {
        return [false, err.message];

    }
}
 
export async function handleGetUser(): Promise<Profile | null> {
    try {
        const response = await fetch('http://localhost:3001/user', {
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
            return responseData.profile;
        }
    } catch (err: any) {
        return null;
    }
}

//que eu saiba isso n faz nd
/*export async function handleChange(name: string, email: string): Promise<boolean> {
    try {
        const data = {
            name: name,
            email: email
        };

        const response = await fetch('http://localhost:3001/user', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }
    } catch (err: any) {
        return false;
    }
}*/


export async function handleSaveChanges(Profile: Profile): Promise<string | true> {
    try {
        const response = await fetch('http://localhost:3001/user', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Profile)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }

    } catch (err: any) {
        return err.message;
    }
}

export async function handleLogout() {
    try {
        const response = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'http://localhost:5173/';
            // return [true, "Logout bem sucedido"];
        }
    } catch (err: any) {
        return [false, "Logout falhou"];
    }

}
export async function handleDeleteAccount() {
    try {
        const response = await fetch('http://localhost:3001/user', {
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
            window.location.href = 'http://localhost:5173/';
            // return [true, "Conta deletada com sucesso"];
        }

        const responseLogout = await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseDataLogout = await responseLogout.json();
        if (!responseLogout.ok) {
            throw new Error(responseDataLogout.message);
        } else {
            window.location.href = 'http://localhost:5173/';
            // return [true, "Logout bem sucedido"];
        }

    } catch (err: any) {
        return [false, "Erro ao deletar conta"];
    }
}



//GET QUESTIONS

export async function handleGetQuestion(questionID: number): Promise<questionInterface | null> {
    try{
        const response = await fetch('http://localhost:3001/questions/id/' + questionID, {
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
        const response = await fetch('http://localhost:3001/questionsByIds/' + JSON.stringify(questions_ids), {
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

export async function handleGetQuestions(): Promise<questionInterface[]> {
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

export async function handleGetFilteredQuestions(filters: questionFilters): Promise<questionInterface[]> {
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

export async function handleGetAnswersByQuestionId(questionIDs: number[]): Promise<respostaInterface[]> {
    try{
        const response = await fetch('http://localhost:3001/answers/question/' + questionIDs, {
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


export async function handleGetAnswersByQuestionsIds(questions_ids: number[]): Promise<respostaInterface[]> {
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

export async function handleGetMockTestsByDateAndProfile(date: Date): Promise<simuladoInterface[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await fetch('http://localhost:3001/mockTests/date/' + date, {
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
            return responseData.mockTests;
        }

    } catch (err: any) {
        return [];
    }

}

//ID e Alternativa (O index é o número da questão na prova.)
type questionMapResultInterface = [number, (string | null)][];  


export async function handleGetQuestion_MockTestsByMockTestId(mockTestId: number): Promise<question_MockTestInterface[]> {
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

//Retorna o simulado que foi adicionado (NN FEITO)
export async function handlePostSimulado(questionsList: questionMapResultInterface): Promise<simuladoInterface | null> {
    //Código PLACEHOLDER.
    try {
        
        await new Promise(resolve => setTimeout(resolve, 1000 * questionsList.length));
        return null;
    } catch (err: any) {
        return null;
    }
}

//NN FEITO
export async function handleGetSimulado(id: number): Promise<simuladoInterface | null> {
    //Atenção, no backend checar se foi o usuario quem fez o simulado, se não foi retornar nulo.
    try {
        await new Promise(resolve => setTimeout(resolve, 1000 * id/100));
        return null;
    } catch (err: any) {
        return null;
    }
}

//Atenção, a magica acontece aqui:

//Essa função parece muito errada

// não é 'generate', tá mais pra 'get'
export async function generateNewSimulado(amount: number): Promise<string>{
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await fetch('http://localhost:3001/questions/newMockTest/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        console.log("questions: ", responseData.questions);
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.questions;
        }
    }
    catch (err: any) {
        return err.message;
    }
}

export async function handleGetAreas(): Promise<areaInterface[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas', {
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
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetTopParentAreasByIds(ids: number[]): Promise<areaInterface[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas/top' + JSON.stringify(ids), {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

export async function handleGetAreasByQuestionsIds(questions_ids: number[]): Promise<number[]> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas/questions', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions_ids),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return responseData.areas;
        }

    } catch (err: any) {
        return [];
    }
}

//Função que executa handleGetAreas e transforma em um hashMap [id] => area

export async function handleGetAreasMap(): Promise<{[id: number]: areaInterface}> {
    try{
        const areas = await handleGetAreas();
        if(areas.length === 0){
            throw new Error('Erro ao pegar areas');
        }
        let areasMap: {[id: number]: areaInterface} = {};
        areas.forEach((area) => {
            areasMap[area.id] = area;
        });
        return areasMap;
    }
    catch(err: any){
        return {};
    }
}

export async function handlePostArea(nomeArea: string, areaPai: string | null): Promise<boolean>{
    try {        
        await new Promise(resolve => setTimeout(resolve, 3000));
        const data = {
            name: nomeArea,
            parent: areaPai
        };

        const response = await fetch('http://localhost:3001/areas', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        } else {
            return true;
        }

    } catch (err: any) {
        return false;
    }
}

export async function handleGetArea_Profile(): Promise<area_ProfileInterface[] | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areaProfile', {
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
            return responseData.areas_profile;
        }

    } catch (err: any) {
        return null;
    }
}

export async function handleGetAreaById(id: number): Promise<areaInterface | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/area/'+id, {
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
            return {
                id: responseData.area.id,
                name: responseData.area.name,
                parent_id: responseData.area.parent_id
            };
        }

    } catch (err: any) {
        return {
            id: 0,
            name: 'SOUGAY',
            parent_id: null
        };
    }
}

export async function handleGetAreaIdByQuestionId(question_id: number): Promise<number | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/area/question/' + question_id, {
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
            return responseData.area_id;
        }

    } catch (err: any) {
        return null;
    }
}

export async function handleGetTopParentAreaById(id: number): Promise<areaInterface | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('http://localhost:3001/areas/top/'+id, {
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
            return {
                id: responseData.area.id,
                name: responseData.area.name,
                parent_id: responseData.area.parent_id
            };
        }

    } catch (err: any) {
        return null;
    }
}

export async function handlePutQuestion(question: questionInterface): Promise<boolean> {
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

export async function handlePostQuestion(question: questionInterface): Promise<boolean> {
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

export async function handleDeleteQuestion(id: number): Promise<boolean> {
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


export { validadeEmail, validadePassword }